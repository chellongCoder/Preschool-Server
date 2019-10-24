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
    PARENT_STUDENT: 5
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
            avatar: faker.image.imageUrl(),
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
            gender: Math.round(Math.random()),
            birthday: faker.date.past(),
            address: faker.address.country(),
            parent_id: parentIDs[i],
            email: faker.internet.email(),
            avatar: faker.image.imageUrl(),
            school_id: schoolIDs[i],
            class_id: classIDs[i]

        }
        const student = await db['student'].create(randStudent);
        students.push(student.id);
    }
    return students;
}

const createData = async () => {
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
}

(async () => {
    // await createSchool(config.NUM_SCHOOL);
    await createData();
    // await createTeacherForClass(config.TEACHER_IN_SCHOOL);
    // await createClassForSchool(config.CLASS_IN_SCHOOL);
    // await createParentStudent(config.PARENT_STUDENT);
    // await createStudentForClass(config.STUDENT_IN_CLASS)
})()