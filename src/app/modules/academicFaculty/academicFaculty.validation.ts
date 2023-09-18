import { z } from 'zod';

const createFacultyValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
const updateFacultyValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyValidation,
  updateFacultyValidation,
};
