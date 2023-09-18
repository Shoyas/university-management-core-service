import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  FacultyFilterAbleFields,
  FacultySearchAbleFields,
} from './faculty.constant';
import { FacultyService } from './faculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.createFaculty(req.body);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FacultyFilterAbleFields);
  const options = pick(req.query, FacultySearchAbleFields);

  const result = await FacultyService.getAllFaculty(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data is fetched',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getSingleFaculty(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty is fetched',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await FacultyService.updateFaculty(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

const assignCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.assignCourses(id, req.body.courses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculties are assigned',
    data: result,
  });
});
const removeCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.removeCourses(id, req.body.courses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculties are deleted',
    data: result,
  });
});
const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['academicSemesterId', 'courseId']);
  const result = await FacultyService.myCourses(user, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My courses data fetched successfully',
    data: result,
  });
});

const getMyCourseStudents = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filters = pick(req.query, [
    'academicSemesterId',
    'courseId',
    'offeredCourseSectionId',
  ]);
  const options = pick(req.query, ['limit', 'page']);
  const result = await FacultyService.getMyCourseStudents(
    filters,
    options,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty course students fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  assignCourses,
  removeCourses,

  myCourses,
  getMyCourseStudents,
};
