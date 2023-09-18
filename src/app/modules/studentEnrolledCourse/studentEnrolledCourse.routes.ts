import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { studentEnrolledCourseController } from './studentEnrolledCourse.controller';
import { studentEnrolledCourseValidation } from './studentEnrolledCourse.validation';

const router = express.Router();

router.get('/', studentEnrolledCourseController.getAllFromDB);

router.get('/:id', studentEnrolledCourseController.getByIdFromDB);

router.post(
  '/',
  validateRequest(studentEnrolledCourseValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  studentEnrolledCourseController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(studentEnrolledCourseValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  studentEnrolledCourseController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  studentEnrolledCourseController.deleteByIdFromDB
);

export const studentEnrolledCourseRoutes = router;
