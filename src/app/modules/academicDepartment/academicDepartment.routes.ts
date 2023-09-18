import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.get('/:id', AcademicDepartmentController.getByIdAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidation
  ),
  AcademicDepartmentController.createAcademicDepartment
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidation
  ),
  AcademicDepartmentController.updateAcademicDepartment
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.deleteAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
