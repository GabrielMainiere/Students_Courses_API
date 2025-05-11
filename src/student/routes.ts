import { Router } from 'express';
import StudentController from './controllerStudent';

const studentsRoutes = Router();

studentsRoutes.get('/students', new StudentController().listStudents);
studentsRoutes.get('/student/:id', new StudentController().viewStudent);
studentsRoutes.post('/student', new StudentController().createStudent);
studentsRoutes.put('/student/:id', new StudentController().updateStudent);
studentsRoutes.patch(
    '/student/:id',
    new StudentController().partialUpdateStudent
);
studentsRoutes.delete('/student/:id', new StudentController().deleteStudent);

export default studentsRoutes;
