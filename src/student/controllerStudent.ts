import { Request, Response } from 'express';
import StudentService from './serviceStudent';

export default class StudentController {
    async listStudents(req: Request, res: Response) {
        try {
            const students = await new StudentService().listStudents();
            res.status(200).json(students);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    error: error.name,
                    message: error.message,
                })
            }
            res.status(400).json({ error: 'An unexpected error occurred!' });
        }
    }

    async viewStudent(req: Request, res: Response) {
        try {
            const student = await new StudentService().viewStudent(
                parseInt(req.params.id)
            );
            res.status(200).json(student);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    error: error.name,
                    message: error.message,
                });
            }
            res.status(400).json({ error: 'An unexpected error occurred!' });
        }
    }

    async createStudent(req: Request, res: Response) {
        try {
            const student = await new StudentService().createStudent(req.body);
            res.status(201).json(student);
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'incompleteData':
                        res.status(400).json({ message: error.message });
                    case 'idError':
                        res.status(400).json({ message: error.message });
                    default:
                        res.status(400).json({
                            error: 'An unexpected error occurred!',
                        });
                }
            }
            res.status(400).json({ error: 'An unexpected error occurred!' });
        }
    }

    async updateStudent(req: Request, res: Response) {
        try {
            await new StudentService().updateStudent(
                parseInt(req.params.id),
                req.body
            );
            res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'studentNotFound':
                        res.status(400).json({ msg: error.message })
                    default:
                        res.status(400).json({
                            error: 'An error occurred with your request!',
                        });
                }
            }
            res.status(400).json({ error: 'An unexpected error occurred!' });
        }
    }

    async partialUpdateStudent(req: Request, res: Response) {
        try {
            await new StudentService().partialUpdateStudent(
                parseInt(req.params.id),
                req.body
            );
            res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'studentNotFound':
                        res.status(400).json({ msg: error.message })
                    default:
                        res.status(400).json({
                            error: 'An error occurred with your request!',
                        });
                }
            }
            res.status(400).json({ error: 'An unexpected error occurred!' });
        }
    }

    async deleteStudent(req: Request, res: Response) {
        try {
            await new StudentService().deleteStudent(parseInt(req.params.id))
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    error: error.name,
                    message: error.message,
                });
            }
            res.status(400).json({ error: 'An unexpected error occurred!' });
        }
    }
}
