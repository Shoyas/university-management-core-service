import { z } from 'zod';

const createCourseValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    code: z.string({
      required_error: 'Code is required',
    }),
    credits: z.number({
      required_error: 'Credits is required',
    }),
  }),
});
const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
  }),
});

const assignOrRemoveFaculties = z.object({
  body: z.object({
    faculties: z.array(z.string(), {
      required_error: 'Faculties are required',
    }),
  }),
});

export const CourseValidation = {
  createCourseValidation,
  updateCourseValidation,
  assignOrRemoveFaculties,
};
