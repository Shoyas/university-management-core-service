import { z } from 'zod';

const createStudentValidation = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student ID is required',
    }),
    firstName: z.string({
      required_error: 'First Name is required',
    }),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .optional(),
    middleName: z
      .string({
        required_error: 'Middle name is required',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'Profile Image is required',
      })
      .optional(),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    bloodGroup: z.string({
      required_error: 'Blood group is required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic Semester is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'Academic Department is required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});

const updateStudentValidation = z.object({
  body: z.object({
    studentId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicSemesterId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const StudentValidation = {
  createStudentValidation,
  updateStudentValidation,
};
