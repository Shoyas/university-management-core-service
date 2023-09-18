import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterAbleFields } from './room.constant';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is created successfully',
    data: result,
  });
  return result;
});

const getAllRoom = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.query);
  const filters = pick(req.query, roomFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await RoomService.getAllRoom(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All rooms are fetched',
    meta: result.meta,
    data: result.data,
  });
});

const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getRoomById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The room is fetched',
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await RoomService.updateRoom(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The room is updated',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.deleteRoom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The room is deleted',
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
  getAllRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
};
