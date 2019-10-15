const HistoryModel = require('../models/history_model');
const ExerciseModel = require('../models/exercises_model');
const UnitModel = require('../models/unit_model');
class Progress {

    constructor(user_id) {
        this.user = user_id;
        this.history = new HistoryModel(2);
        this.exercise = new ExerciseModel(2);
        this.unit = new UnitModel(2);
    }

    percent(a, b) {
        return Math.round(a / b * 100);
    }

    extractData(arr) {
        return arr.reduce((obj, item) => {
            if (obj[item.exe_id]) {
                obj[item.exe_id].count++;
                obj[item.exe_id].completed = obj[item.exe_id].completed == 1 ? obj[item.exe_id].completed : item.result
                obj[item.exe_id].logs.push({ answer: item.answer, date: item.created_at });
            } else {
                obj[item.exe_id] = { count: 1, completed: item.result, logs: [{ answer: item.answer, date: item.created_at }] };
            }
            return obj;
        }, {});
    }

    extractDataFillBlank(arr) {
        const getCompletedRate = data => Math.round(data.filter(item => item == 1).length / data.length * 100);
        return arr.reduce((obj, item) => {
            if (obj[item.exe_id]) {
                obj[item.exe_id].count++;
                obj[item.exe_id].completed = obj[item.exe_id].completed < getCompletedRate(JSON.parse(item.result))
                    ? getCompletedRate(JSON.parse(item.result)) : obj[item.exe_id].completed;
                obj[item.exe_id].logs.push({ answer: item.answer, date: item.created_at });
            } else {
                obj[item.exe_id] = { count: 1, completed: getCompletedRate(JSON.parse(item.result)), logs: [{ result: item.result, answer: item.answer, date: item.created_at }] };
            }
            return obj;
        }, {});
    }

    extractDataQuiz(arr) {
        return arr.reduce((obj, item) => {
            if (obj[item.quiz_id]) {
                obj[item.quiz_id].count++;
                obj[item.quiz_id].completed = obj[item.quiz_id].completed == 1 ? 1 : item.result
                obj[item.quiz_id].logs.push({ answer: item.answer, date: item.created_at });
            } else {
                obj[item.quiz_id] = {
                    count: 1,
                    completed: item.result,
                    exe_id: item.exe_id,
                    logs: [{ answer: item.answer, date: item.created_at }]
                };
            }
            return obj;
        }, {});
    }

    async getResultData(unit, type, group) {
        try {
            const arr = await this.history.getBy({ unit_id: unit, user_id: this.user, type_id: type, group_id: group });
            if (arr.length == 0) return {};
            if (type == 2 || type == 3) return this.extractData(arr);
            else if (type == 5) return this.extractDataFillBlank(arr);
            else if (type == 7) return this.extractDataQuiz(arr);
            else return {}    
        } catch (error) {
            console.log('[getResultData] ', error);
        }
        
    }

    /**
     * 1. Pronunciation   -->   2
     * 2. Dictation  --->   3
     * 3. Listen and fill in the gaps ----> 5
     * 4. Listen and answer the question ----->   7
     */
    async getResult(unit, type, group) {
        const data = await this.getResultData(unit, type, group);
        if (type == 2 || type == 3) {
            // count correct answer 
            let corrects = 0;
            if (Object.keys(data).length > 0)
                Object.keys(data).forEach(item => {
                    if (data[item].completed == 1) corrects++;
                })
            else 
                return 0;
            // all question in unit ..
            const count = await this.exercise.countBy({ unit_id: unit, type_id: type, group_id: group });
            // console.log(`rs = {correct: ${corrects}, total: ${count}, percent: ${this.percent(corrects, count)}}`)
            return this.percent(corrects, count);
        } else if (type == 5) {
            let corrects = 0;
            if (Object.keys(data).length > 0) {
                Object.keys(data).forEach(item => corrects += data[item].completed);
                return Math.round(corrects / Object.keys(data).length);
            } else {
                return 0;
            }
        } else if (type == 7) {
            // count correct answer 
            let corrects = 0;
            if (Object.keys(data).length > 0)
                Object.keys(data).forEach(item => {
                    if (data[item].completed == 1) corrects++;
                })
            else 
                return 0;
            // all question in unit ..
            const rows = await this.exercise.getBy({ unit_id: unit, type_id: type, group_id: group });
            return this.percent(corrects, JSON.parse(rows[0]['quizs']).length);
        }
    }

    async getSummaryResult(unit, group) {
        return new Promise(async (resolve, reject) => {
            try {
                const type1 = await this.getResult(unit, 2, group);
                const type2 = await this.getResult(unit, 3, group);
                const type3 = await this.getResult(unit, 5, group);
                const type4 = await this.getResult(unit, 7, group);
                resolve([
                    { 'type': 2, 'completed': type1 },
                    { 'type': 3, 'completed': type2 },
                    { 'type': 5, 'completed': type3 },
                    { 'type': 7, 'completed': type4 },
                ]);
            } catch (error) {
                console.log('[getSummaryResult]', error);
                reject(error);
            }
        });
    }

    async getUnitCompRate(unit) {
        return new Promise(async (resolve, reject) => {
            try {
                const unitObj = await this.unit.get(unit);
                const group = JSON.parse(unitObj.group);
                let sum = 0;
                for (let i = 0; i < group.length; i++) {
                    const data = await this.getSummaryResult(unit, group[i]);
                    data.forEach(item => sum+=item.completed);
                }
                resolve(Math.round(sum / 8));
            } catch (error) {
                console.log('[getUnitCompRate]', error);
                reject(error);
            }
        });
    }
}

// //TEST
// (async () => {
//     const p = new Progress(5);
//     const a = await p.getUnitCompRate(1);
//     console.log(a);
// })()

module.exports = Progress;