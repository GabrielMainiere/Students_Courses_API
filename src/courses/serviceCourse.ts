import CourseRepository from './repositoryCourse';
import { Course } from './course';
import db from '../database';

export default class CourseService {
    async listCourses() {
        const courses = await new CourseRepository().getAll();

        if (courses.length === 0) {
            const error = new Error('The database is empty!');
            error.name = 'emptyArray';
            throw error;
        }
        return courses;
    }

    async viewCourse(id: number){
        const course = await new CourseRepository().getOne(id);

        if (!course) {
          const error = new Error('Course not found in the database');
          error.name = 'courseNotFound';
          throw error;
        }
        return course;
      }

    async createCourse(course: Course) {
        const { name, description, duration } = course

        if (!name || !description || !duration) {
            const error = new Error(
                'Incomplete data, please provide all course details and try again.'
            );
            error.name = 'incompleteData';
            throw error;
        }
        const createdCourse = await new CourseRepository().create(course);
    }

    async updateCourse(id: number, courseInfo: Course) {
        const course = await new CourseRepository().getOne(id);

        if (!course) {
            const error = new Error('Course not found in the database');
            error.name = 'CourseNotFound';
            throw error;
        }
        const updatedCourse = await new CourseRepository().update(
            id,
            courseInfo
        )
        return updatedCourse;
    }

    async partialUpdateCourse(id: number, courseInfo: Partial<Course>) {
        const course = await new CourseRepository().getOne(id);

        if (!course) {
            const error = new Error('Course not found in the database');
            error.name = 'courseNotFound';
            throw error;
        }
        const partialUpdateCourse = await new CourseRepository().patchUpdate(
            id,
            courseInfo
        )
        return partialUpdateCourse;
    }

    async deleteCourse(id: number) {
        const course = await new CourseRepository().getOne(id);

        if (!course) {
            const error = new Error('Course not found in the database');
            error.name = 'CourseNotFound';
            throw error;
        }
        await new CourseRepository().destroy(id)
        return { message: 'Course deleted successfully.' }
    }

    async enrollStudents(courseId: number, studentIds: number[]) {
        if (!Array.isArray(studentIds) || studentIds.length === 0) {
            const error = new Error(
                'A non-empty array of student IDs is required'
            );
            error.name = 'invalidStudentIds';
            throw error;
        }
        const course = await new CourseRepository().getOne(courseId)
        if (!course) {
            const error = new Error('Course not found in the database');
            error.name = 'courseNotFound';
            throw error;
        }
        const students = await db('students_tbl').whereIn('id', studentIds)
        if (students.length !== studentIds.length) {
            const foundIds = students.map((s: any) => s.id)
            const missingIds = studentIds.filter((id) => !foundIds.includes(id))
            const error = new Error(
                `Some student does not exist in the database`
            );
            error.name = 'studentNotFound';
            throw error;
        }
        const existingEnrollments = await db('students_courses_tbl')
            .where({ course_id: courseId })
            .whereIn('student_id', studentIds)
        if (existingEnrollments.length > 0) {
            const alreadyEnrolledIds = existingEnrollments.map(
                (e: any) => e.student_id
            )
            const error = new Error(
                `Students or student are/is already enrolled in this course`
            )
            error.name = 'alreadyEnrolled';
            throw error;
        }
        const enrollments = studentIds.map((studentId) => ({
            student_id: studentId,
            course_id: courseId,
        }))
        const insertedEnrollments =
            await new CourseRepository().createEnrollments(enrollments);

        return insertedEnrollments;
    }
}
