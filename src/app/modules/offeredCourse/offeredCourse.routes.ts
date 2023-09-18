import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);
router.get('/', OfferedCourseController.getAllOfferedCourse);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseValidation.createOfferedCourse),
  OfferedCourseController.createOfferedCourse
);
router.patch('/:id', OfferedCourseController.updateOfferedCourse);
router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
