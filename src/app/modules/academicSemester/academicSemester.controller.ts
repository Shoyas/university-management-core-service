import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  AcademicSemesterFilterAbleField,
  AcademicSemesterSearchAbleFields,
} from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterFilterAbleField);
  const options = pick(req.query, AcademicSemesterSearchAbleFields);

  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data is fetched',
    meta: result.meta,
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The academic semester data is fetched',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    });
  }
);

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.deleteAcademicSemester(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester deleted successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateAcademicSemester,
  deleteAcademicSemester,
};
