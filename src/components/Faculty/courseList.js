const courses = [
  {
    course_id: "SENG11124",
    course_name: "SENG 11122",
    lecturer: "nalin",
  },
  {
    course_id: "SENG12124",
    course_name: "SENG 11122",
    lecturer: "nalin",
  },
  {
    course_id: "SENG12124",
    course_name: "SENG 11122",
    lecturer: "nalin",
  },
  {
    course_id: "SENG21124",
    course_name: "SENG 11122",
    lecturer: "nalin",
  },
];

const categorizeCourses = (level, semester) => {
  return courses.filter(
    (course) =>
      parseInt(course.course_id[4]) === level &&
      parseInt(course.course_id[5]) === semester
  );
};

console.log(categorizeCourses(1, 2));
