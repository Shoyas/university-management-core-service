import { Prisma, Student, StudentEnrolledCourseStatus } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { StudentSearchAbleFields } from './student.constant';
import { IStudentFilterRequest } from './student.interface';
import { StudentUtils } from './student.utils';

const createStudent = async (studentData: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: studentData,
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });

  return result;
};

const getAllStudent = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: StudentSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.faculty.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });

  return result;
};

const updateSingleStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
    data: payload,
  });
  return result;
};

const deleteSingleStudent = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const myCourses = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }
  const result = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      ...filter,
    },
    include: {
      course: true,
    },
  });

  return result;
};

const getMyCourseSchedules = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }
  const studentEnrolledCourses = await myCourses(authUserId, filter);
  const studentEnrolledCourseIds = studentEnrolledCourses.map(
    item => item.courseId
  );
  const result = await prisma.studentSemesterRegistrationCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      semesterRegistration: {
        academicSemester: {
          id: filter.academicSemesterId,
        },
      },
      offeredCourse: {
        course: {
          id: {
            in: studentEnrolledCourseIds,
          },
        },
      },
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
      offeredCourseSection: {
        include: {
          offeredCourseClassSchedules: {
            include: {
              room: {
                include: {
                  building: true,
                },
              },
              faculty: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const myAcademicInfo = async (authUserId: string): Promise<any> => {
  const academicInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        studentId: authUserId,
      },
    },
  });
  const enrolledCourses = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
    include: {
      course: true,
      academicSemester: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const groupByAcademicSemesterData =
    StudentUtils.groupByAcademicSemester(enrolledCourses);

  return {
    academicInfo,
    courses: groupByAcademicSemesterData,
  };
};

export const StudentService = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,

  myCourses,
  getMyCourseSchedules,
  myAcademicInfo,
};
