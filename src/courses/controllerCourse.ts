import { Request, Response } from 'express'
import CourseService from './serviceCourse'

export default class CourseController {
    async listCourses(req: Request, res: Response) {
        try {
            const courses = await new CourseService().listCourses()
            res.status(200).json(courses)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    error: error.name,
                    message: error.message,
                })
            }
            res.status(400).json({ error: 'An unexpected error occurred!' })
        }
    }

    async viewCourse(req: Request, res: Response) {
        try {
          const course = await new CourseService().viewCourse(parseInt(req.params.id));
          res.status(200).json(course);
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

    async createCourse(req: Request, res: Response) {
        try {
            const course = await new CourseService().createCourse(req.body)
            res.status(201).json(course)
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'incompleteData':
                        res.status(400).json({ message: error.message })
                    default:
                        res.status(400).json({
                            error: 'An unexpected error occurred!',
                        })
                }
            }
            res.status(400).json({ error: 'An unexpected error occurred!' })
        }
    }

    async updateCourse(req: Request, res: Response) {
        try {
            await new CourseService().updateCourse(
                parseInt(req.params.id),
                req.body
            )
            res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'CourseNotFound':
                        res.status(400).json({ msg: error.message })
                    default:
                        res.status(400).json({
                            error: 'An error occurred with your request!',
                        })
                }
            }
            res.status(400).json({ error: 'An unexpected error occurred!' })
        }
    }

    async partialUpdateCourse(req: Request, res: Response) {
        try {
            await new CourseService().partialUpdateCourse(
                parseInt(req.params.id),
                req.body
            )
            res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'CourseNotFound':
                        res.status(400).json({ msg: error.message })
                    default:
                        res.status(400).json({
                            error: 'An error occurred with your request!',
                        })
                }
            }
            res.status(400).json({ error: 'An unexpected error occurred!' })
        }
    }

    async deleteCourse(req: Request, res: Response) {
        try {
            await new CourseService().deleteCourse(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    error: error.name,
                    message: error.message,
                })
            }
            res.status(400).json({ error: 'An unexpected error occurred!' })
        }
    }

    async enrollStudents(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.id)
            const { students } = req.body

            const enrollments = await new CourseService().enrollStudents(
                courseId,
                students
            )
            res.status(201).json(enrollments)
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'invalidStudentIds':
                    case 'courseNotFound':
                    case 'studentNotFound':
                    case 'alreadyEnrolled':
                        res.status(400).json({
                            error: error.name,
                            message: error.message,
                        })
                        break
                    default:
                        res.status(400).json({
                            error: 'An unexpected error occurred!',
                        })
                }
            }
        }
    }
}
