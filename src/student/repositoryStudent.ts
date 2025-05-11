import db from '../database';
import { Student } from './student';

export default class StudentRepository {
    async getAll() {
        return db.select('*').from('students_tbl');
    }
    async getOne(id: number) {
        return db('students_tbl').where({ id }).first();
    }

    async create(student: Student) {
        const [created] = await db('students_tbl')
            .insert(student)
            .returning('*');
        return created;
    }

    async update(id: number, student: Student) {
        const [updated] = await db('students_tbl')
            .where({ id })
            .update(student)
            .returning('*');
        return updated;
    }

    async patchUpdate(id: number, partial: Partial<Student>) {
        const [patched] = await db('students_tbl')
            .where({ id })
            .update(partial)
            .returning('*');
        return patched;
    }

    async destroy(id: number) {
        await db('students_tbl').where({ id }).del();
    }
}
