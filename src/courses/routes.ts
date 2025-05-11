import { Router } from 'express';
import CourseController from './controllerCourse';

const courseRoutes = Router();

courseRoutes.get('/courses', new CourseController().listCourses);
courseRoutes.get('/course/:id', new CourseController().viewCourse);
courseRoutes.post('/course', new CourseController().createCourse);
courseRoutes.put('/course/:id', new CourseController().updateCourse);
courseRoutes.patch('/course/:id', new CourseController().partialUpdateCourse);
courseRoutes.delete('/course/:id', new CourseController().deleteCourse);
courseRoutes.post(
    '/course/:id/enrollment',
    new CourseController().enrollStudents
);

export default courseRoutes
