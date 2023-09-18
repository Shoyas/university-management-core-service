export const offeredCourseClassScheduleSearchAbleFields = ['dayOfWeek'];

export const offeredCourseClassScheduleRelationalFields = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'facultyId',
  'roomId',
];

export const offeredCourseClassScheduleRelationalFieldsMapper: {
  [key: string]: string;
} = {
  offeredCourseSectionId: 'offeredCourseSection',
  facultyId: 'faculty',
  roomId: 'room',
  semesterRegistrationId: 'semesterRegistration',
};

export const offeredCourseClassScheduleFilterableFields = [
  'searchTerm',
  'dayOfWeek',
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];

export const daysInWeek = [
  'SATURDAY',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
];
