import StudentRepository from './repositoryStudent';
import { Student } from './student';

export default class StudentService {
    async listStudents() {
        const students = await new StudentRepository().getAll();

        if (students.length === 0) {
            const error = new Error('The database is empty!');
            error.name = 'emptyArray';
            throw error;
        }

        return students;
    }

    async viewStudent(id: number) {
        const student = await new StudentRepository().getOne(id);

        if (!student) {
            const error = new Error('Student not found in the database');
            error.name = 'studentNotFound';
            throw error;
        }

        return student;
    }

    async createStudent(student: Student) {
        const { name, birthdate } = student;

        if (!name || !birthdate) {
            const error = new Error(
                'Incomplete data, please provide all student details and try again.'
            );
            error.name = 'incompleteData';
            throw error;
        }
        const createdStudent = await new StudentRepository().create(student)
        return createdStudent
    }

    async updateStudent(id: number, studentInfo: Student) {
        const student = await new StudentRepository().getOne(id);

        if (!student) {
            const error = new Error('Student not found in the database');
            error.name = 'studentNotFound';
            throw error;
        };
        const updatedStudent = await new StudentRepository().update(
            id,
            studentInfo
        );
        return updatedStudent;
    }

    async partialUpdateStudent(id: number, studentInfo: Partial<Student>) {
        const student = await new StudentRepository().getOne(id);

        if (!student) {
            const error = new Error('Student not found in the database');
            error.name = 'studentNotFound';
            throw error;
        }

        const partialUpdateStudent = await new StudentRepository().patchUpdate(
            id,
            studentInfo
        );
        return partialUpdateStudent;
    }

    async deleteStudent(id: number) {
        const student = await new StudentRepository().getOne(id);

        if (!student) {
            const error = new Error('Student not found in the database');
            error.name = 'studentNotFound';
            throw error;
        }
        await new StudentRepository().destroy(id);
        return { message: 'Student deleted successfully.' };
    }
}
