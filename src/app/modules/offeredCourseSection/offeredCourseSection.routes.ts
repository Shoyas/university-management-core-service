import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';
import { OfferedCourseSectionValidation } from './offeredCourseSection.validation';

const router = express.Router();

router.get(
  '/:id',
  OfferedCourseSectionController.getSingleOfferedCourseSection
);
router.get('/', OfferedCourseSectionController.getAllOfferedCourseSection);
router.post(
  '/',
  validateRequest(
    OfferedCourseSectionValidation.createOfferedCourseSectionValidation
  ),
  OfferedCourseSectionController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(
    OfferedCourseSectionValidation.updateOfferedCourseSectionValidation
  ),
  OfferedCourseSectionController.updateOfferedCourseSection
);
router.delete(
  '/:id',
  OfferedCourseSectionController.deleteOfferedCourseSection
);

export const OfferedCourseSectionRoutes = router;
