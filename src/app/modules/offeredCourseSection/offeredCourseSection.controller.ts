import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  OfferedCourseSectionFilterAbleFields,
  OfferedCourseSectionSearchAbleFields,
} from './offeredCourseSection.constant';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Section created',
    data: result,
  });
});

const getAllOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, OfferedCourseSectionFilterAbleFields);
    const options = pick(req.query, OfferedCourseSectionSearchAbleFields);

    const result = await OfferedCourseSectionService.getAllOfferedCourseSection(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All offered course section fetched',
      data: result,
    });
  }
);

const getSingleOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OfferedCourseSectionService.getSingleOfferedCourseSection(
        req.params.id
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single offered course section fetched',
      data: result,
    });
  }
);

const updateOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await OfferedCourseSectionService.updateOfferedCourseSection(
      id,
      payload
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section updated',
      data: result,
    });
  }
);

const deleteOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseSectionService.deleteOfferedCourseSection(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section deleted',
      data: result,
    });
  }
);

export const OfferedCourseSectionController = {
  insertIntoDB,
  getAllOfferedCourseSection,
  getSingleOfferedCourseSection,
  updateOfferedCourseSection,
  deleteOfferedCourseSection,
};
