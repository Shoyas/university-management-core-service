import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterAbleFields } from './semesterRegistration.constant';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration created',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterAbleFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await SemesterRegistrationService.getAllSemesterRegistration(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All semester registration fetched',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSemesterRegistrationById = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getSemesterRegistrationById(
        req.params.id
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single semester registration fetched',
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await SemesterRegistrationService.updateSemesterRegistration(
      id,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration updated',
      data: result,
    });
  }
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.deleteSemesterRegistration(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration deleted',
      data: result,
    });
  }
);

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.startMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Semester registration started successfully',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.enrollIntoCourse(
    user?.userId,
    req.body
  );
  // console.log(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Semester Registration course enrolled successfully',
    data: result,
  });
});
const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.withdrawFromCourse(
    user?.userId,
    req.body
  );
  // console.log(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student withdraw from successfully',
    data: result,
  });
});

const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.confirmMyRegistration(
      user?.userId
    );
    // console.log(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Confirm your registration',
      data: result,
    });
  }
);
const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.getMyRegistration(
    user?.userId
  );
  // console.log(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration data fetched',
    data: result,
  });
});
const startNewSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.startNewSemester(id);
  // console.log(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester started successfully',
    data: result,
  });
});

const getMySemesterRegistrationCourses = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result =
      await SemesterRegistrationService.getMySemesterRegistrationCourses(
        user?.userId
      );
    // console.log(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My registration courses data fetched',
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  insertIntoDB,
  getAllSemesterRegistration,
  getSemesterRegistrationById,
  updateSemesterRegistration,
  deleteSemesterRegistration,

  startMyRegistration,

  enrollIntoCourse,
  withdrawFromCourse,
  confirmMyRegistration,
  getMyRegistration,
  startNewSemester,
  getMySemesterRegistrationCourses,
};
