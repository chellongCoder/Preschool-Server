const faker = require('faker');

const db = require('./modelsORM');
faker.locale = 'en';

const role = {
    SCHOOL: 10,
    TEACHER: 11,
    PARENT: 12
}

const config = {
    NUM_SCHOOL: 5,
    CLASS_IN_SCHOOL: 5,
    TEACHER_IN_SCHOOL: 5,
    STUDENT_IN_CLASS: 5,
    PARENT_STUDENT: 5,
    STUDY_RESULT: 5,
    TUTITION: 5,
    ACTIVITIES: 5,
    MOMENTS: 5,
    NOTIFICATIONS: 5,
    WEEK_PLAN: 5,
    IMAGE: 5,

    MEAL_TYPE: 10,
    
}
const createSchool = async (number) => {
    let schoolIDs = [];
    for (let i = 0; i < number; i++) {
        const randUserSchool = {
            username: faker.internet.userName(),
            password: '$2b$10$bVYPXUbI5N8yTtkJVcKPbelQZA7eRB.KI5fa.U1bM3ox7Ze8RuFAe',
            role: role.SCHOOL
        }
        const user = await db.user.create(randUserSchool);
        const randSchool = {
            school_name: faker.company.companyName(),
            school_year: Math.floor(Math.random() * 19) + 2000,
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber().trim(),
            address: faker.address.secondaryAddress(),
            website: faker.internet.domainName(),
            description: faker.lorem.sentence(),
            userID: user.id
        }
        const school = await db['school'].create(randSchool);
        schoolIDs.push(school.id);
    }
    return schoolIDs;
} 

const createClassForSchool = async (number, teacherIDs, schoolIDs) => {
    const abc = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    let classes = [];
    for (let i = 0; i < number; i++) {
        const classData = {
            class_name: abc[Math.round(Math.random() * (abc.length - 1))],
            grade: Math.round(Math.random() * 12) + 1,
            homeroom_teacher: teacherIDs[i],
            number_student: Math.round(Math.random() * 100),
            schoolId: schoolIDs[i],
        }
        console.log("classData", classData)
        const cr = await db['class'].create(classData);
        console.log(classData);
        classes.push(cr.id);
    }
    return classes;
}

const createTeacherForClass = async (number, schoolIDs) => {
    let teacherIDs = [];
    for (let index = 0; index < number; index++) {
        const randUserTeacher = {
            username: faker.internet.userName(),
            password: '$2b$10$bVYPXUbI5N8yTtkJVcKPbelQZA7eRB.KI5fa.U1bM3ox7Ze8RuFAe',
            role: role.TEACHER
        }
        const user = await db.user.create(randUserTeacher);
        const randTeacher = {
            last_name: faker.name.lastName(),
            first_name: faker.name.firstName(),
            address: faker.address.city(),
            phone: faker.phone.phoneNumber().trim(),
            email: faker.internet.email(),
            avatar: faker.image.imageUrl(),
            userID: user.id,
            schoolID: schoolIDs[index],
        }
        const teacher = await db['teacher'].create(randTeacher);
        teacherIDs.push(teacher.id);
    }
    return teacherIDs;
}

const createParentStudent = async (number) => {
    const randUserParent = {
        username: faker.internet.userName(),
        password: '$2b$10$bVYPXUbI5N8yTtkJVcKPbelQZA7eRB.KI5fa.U1bM3ox7Ze8RuFAe',
        role: role.PARENT
    }
    const user = await db.user.create(randUserParent);
    let relationships = ["Bố", "Mẹ", "Ông", "Bà", "Khác"];
    let parents = [];
    for (let i = 0; i < number; i++) {
        const randParent = {
            last_name: faker.name.lastName(),
            first_name: faker.name.firstName(),
            phone: faker.phone.phoneNumber().trim(),
            email: faker.internet.email(),
            avatar: faker.image.imageUrl(),
            relationship: relationships[Math.floor(Math.random()*relationships.length)],
            emergency_contact: "A.Hoàng - Khương Trung - 0868177610",
            userID: user.id,
        }
        const parent = await db['parent'].create(randParent);
        parents.push(parent.id);
    }
    return parents;
}

const createStudentForClass = async (number,schoolIDs, parentIDs, classIDs) => {
    let students = [];
    for (let i = 0; i < number; i++) {
        const randStudent = {
            last_name: faker.name.lastName(),
            first_name: faker.name.firstName(),
            gender: Math.floor(Math.random() * 3) + 0,
            birthday: faker.date.past(),
            address: faker.address.country(),
            parent_id: parentIDs[i],
            weight: (Math.random() * 100 + 1).toFixed(2),
            height: (Math.random() * 200 + 1).toFixed(2),
            avatar: faker.image.imageUrl(),
            school_id: schoolIDs[i],
            class_id: classIDs[i]

        }
        const student = await db['student'].create(randStudent);
        students.push(student.id);
    }
    return students;
}

const createStudyResult = async (number, studentIDs, classIDs) => {
    let studyResults = [];
    for (let i = 0; i < number; i++) {
        const randStudyResult = {
            stdID: studentIDs[i],
            classID: classIDs[i],
            rate: Math.floor(Math.random() * 5) + 1,
            semester: Math.floor(Math.random() * 2) + 1,      
            review: faker.lorem.paragraph(),
        }
        const studyResult = await db['study_result'].create(randStudyResult);
        studyResults.push(studyResult.id);
    }
    return studyResults;
}

const createTutition = async (number, studentIDs) => {
    let tuitions = [];
    for (let i = 0; i < number; i++) {
        const randTuition = {
            stdID: studentIDs[i],
            semester: Math.floor(Math.random() * 2) + 1,
            schFee: 5000000,   
            isPaid: Math.floor(Math.random() * 2) + 0
        }
        const tuition = await db['tuition'].create(randTuition);
        tuitions.push(tuition.id);
    }
    return tuitions;
}

const createMealType = async (number, studentIDs) => {
    let mealTypes = [];
    const times = 2;
    for (let i = 0; i < number; i++) {
        const randMealType = {
            breakfast: faker.lorem.words(times),
            breakfast_sub: faker.lorem.words(times),
            lunch: faker.lorem.words(times),
            lunch_sub: faker.lorem.words(times),
            date_meal: faker.date.future(),
        }
        const mealType = await db['meal_type'].create(randMealType);
        mealTypes.push(mealType.id);
    }
    return mealTypes;
}

const createAbsenseTicket = async (number, studentIDs) => {
    let absense_tickets = [];
    for (let i = 0; i < number; i++) {
        const randAbsenseTicket = {
            std_id: studentIDs[i],
            date: faker.date.future(2019),
            reason: faker.lorem.paragraph(),   
            status_accept: Math.floor(Math.random() * 2) + 0
        }
        const absense_ticket = await db['absense_tickets'].create(randAbsenseTicket);
        absense_tickets.push(absense_ticket.id);
    }
    return absense_tickets;
}

const createDataUser = async () => {
    const schoolIDs = await createSchool(config.NUM_SCHOOL);
    console.log("schoolIDs", schoolIDs);
    const teacherIDs = await createTeacherForClass(config.TEACHER_IN_SCHOOL, schoolIDs);
    console.log("teacherIDs", teacherIDs);
    const classIDs = await createClassForSchool(config.CLASS_IN_SCHOOL, teacherIDs, schoolIDs);
    console.log("classIDs", classIDs);
    const parentIDs = await createParentStudent(config.PARENT_STUDENT);
    console.log("parentIDs", parentIDs);
    const studentIDs = await createStudentForClass(config.STUDENT_IN_CLASS, schoolIDs, parentIDs, classIDs)
    console.log("studentIDs", studentIDs);
    const studyResultIDs = await createStudyResult(config.STUDY_RESULT, studentIDs, classIDs);
    console.log("studyResultIDs", studyResultIDs);
    const tutitionIDs = await createTutition(config.TUTITION, studentIDs);
    console.log("tutitionIDs", tutitionIDs);
    const absenseTicketIDs = await createAbsenseTicket(config.TUTITION, studentIDs);
    console.log("absenseTicketIDs", absenseTicketIDs);

}

const createActivity = async (number) => {
    let activities = [];
    for (let i = 0; i < number; i++) {
        const randActivity = {
            title: faker.lorem.sentence(),
            acti_time_from: faker.date.past(),
            acti_time_to: faker.date.future(),
            regis_time_from: faker.date.past(),
            regis_time_to: faker.date.future(),
            content: faker.lorem.paragraph(),
            regis_status: 0
        }
        console.log("randActivity", randActivity);
        const activity = await db['activity'].create(randActivity);
        activities.push(activity.id);
    }
    return activities;
}

const createMoment = async (number) => {
    let momemts = [];
    const teacherIDs = await selectUser(1, number, "teacher");
    for (let i = 0; i < number; i++) {
        const randMoment = {
            content: faker.lorem.sentence(),
            likes: Math.round(Math.random() * 100),
            author_id: teacherIDs[i].id,
            status_accept: 1,
        }
        console.log("randMoment", randMoment);
        const moment = await db['moment'].create(randMoment);
        momemts.push(moment.id);
    }
    return momemts;
}

const createNotification = async (number) => {
    let notifications = [];
    const teacherIDs = await selectUser(2, number, "teacher");
    for (let i = 0; i < number; i++) {
        const randNotify = {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            author: teacherIDs[i].id,
        }
        const notification = await db['notification'].create(randNotify);
        notifications.push(notification.id);
    }
    return notifications;
}

const createWeekPlan = async (number, imageIDs) => {
    let weekplans = [];
    for (let i = 0; i < number; i++) {
        const randWeekPlan = {
            date_plan: faker.date.recent(),
            imageID: imageIDs[i]
        }
        const weekPlan = await db['week_plan'].create(randWeekPlan);
        weekplans.push(weekPlan.id);
    }
    return weekplans;
}

const createImage = async (number, momentIDs, activityIDs, notificationIDs, weekPlanIDs) => {
    let images = [];
    for (let i = 0; i < number; i++) {
        const randImage = {
            path: faker.image.imageUrl(),
        }
        const image = await db['image'].create(randImage);
        const imageNoti = {
            imageID: image.id,
            notificationID: notificationIDs[i]
        }
        await db['image_notification'].create(imageNoti);
        const imageMoment = {
            imageID: image.id,
            momentID: momentIDs[i]
        }
        await db['image_moment'].create(imageMoment);
        const imageAcitivity = {
            imageID: image.id,
            activityID: activityIDs[i]
        }
        await db['image_activity'].create(imageAcitivity);
        images.push(image.id);
    }
    return images;
}

const selectUser = async (offset, limit, nameModel) => {
    let query = {
        offset: offset,
        limit: limit
    }
    const result = await db[nameModel].findAll(query);
    return result;
}

const createData = async () => {
    const activityIDs = await createActivity(config.ACTIVITIES);
    console.log("activityIDs", activityIDs);
    const momentIDs = await createMoment(config.MOMENTS);
    console.log("momentIDs", momentIDs);
    const notificationIDs = await createNotification(config.NOTIFICATIONS);
    console.log("notificationIDs", notificationIDs);
    const imageIDs = await createImage(config.IMAGE, momentIDs, activityIDs, notificationIDs);
    console.log("imageIDs", imageIDs)
    const weekPlanIDs = await createWeekPlan(config.WEEK_PLAN, imageIDs);
    console.log("weekPlanIDs", weekPlanIDs);
}

(async () => {
    // await createDataUser();
    // await createData();
    await createMealType(config.MEAL_TYPE, [1, 2, 3, 4, 5]);
})()
