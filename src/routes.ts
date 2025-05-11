import { Router } from 'express';
import studentsRoutes from './student/routes';
import courseRoutes from './courses/routes';

const router = Router();
router.use(studentsRoutes);
router.use(courseRoutes);

export default router;
