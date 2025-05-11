import db from '../database'
import { Course } from './course'

export default class CourseRepository {
    async getAll() {
        return db.select('*').from('courses_tbl');
    }
    async getOne(id: number){
        
        const course = await db('courses_tbl').where({ id }).first();
        if (!course) return undefined;
    
        const students = await db('students_tbl')
          .select('students_tbl.id', 'students_tbl.name', 'students_tbl.birthdate')
          .innerJoin('students_courses_tbl', 'students_tbl.id', 'students_courses_tbl.student_id')
          .where('students_courses_tbl.course_id', id);
    
        return { ...course, students };
      }

    async create(course: Course) {
        const [created] = await db('courses_tbl').insert(course).returning('*');
        return created;
    }

    async update(id: number, course: Course) {
        const [updated] = await db('courses_tbl')
            .where({ id })
            .update(course)
            .returning('*');
        return updated
    }

    async patchUpdate(id: number, partial: Partial<Course>) {
        const [patched] = await db('courses_tbl')
            .where({ id })
            .update(partial)
            .returning('*');
        return patched;
    }

    async destroy(id: number) {
        await db('courses_tbl').where({ id }).del();
    }

    async createEnrollments(
        enrollments: { student_id: number; course_id: number }[]
    ) {
        return db('students_courses_tbl')
            .insert(enrollments)
            .returning(['student_id', 'course_id']);
    }
}
