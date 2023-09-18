export type ICreateOfferedCourse = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: string[];
};

export type IOfferedCourseFilterRequest = {
  searchTerm?: string;
};
