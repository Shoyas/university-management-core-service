export type IFacultyFilterRequest = {
  searchTerm?: string;
};

export type IFacultyMyCourseStudentsRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
  offeredCourseSectionId?: string | undefined;
};
