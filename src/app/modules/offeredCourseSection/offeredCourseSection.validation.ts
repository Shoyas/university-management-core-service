import { z } from 'zod';

const createOfferedCourseSectionValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    maxCapacity: z.number({
      required_error: 'Maximum capacity of student is required',
    }),
    offeredCourseId: z.string({
      required_error: 'Offered Course Id is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semester Registration Id is required',
    }),
  }),
});
const updateOfferedCourseSectionValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    maxCapacity: z.number().optional(),
    offeredCourseId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
  }),
});

export const OfferedCourseSectionValidation = {
  createOfferedCourseSectionValidation,
  updateOfferedCourseSectionValidation,
};
