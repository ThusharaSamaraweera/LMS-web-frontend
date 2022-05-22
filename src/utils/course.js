import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentEnrollCourseIds, setStudentEnrollCourses } from "../store/actions/studentAction";

export function useUpdateEnrollCourses(){
  const [courses, setCourses] = useState([])
  let tempCourses = []
  const dispatch = useDispatch()

  dispatch(getStudentEnrollCourseIds())

  // all courses in university
  const allCourses = useSelector((state) => state.courseReducer.courses);
  
  // courses those had been enrolled by the student logged in
  const studentCourse = useSelector(
    (state) => state.studentReducer.enrollCourseIds
  );

  const updateEnrollCourses = () => {
    const course_ids = studentCourse.map((course) =>
      course.enrolled_course_id.toLowerCase()
    );

    const getDetailsOfCourse = () => {
      allCourses.forEach((detailCourse) => {
        if (course_ids.includes(detailCourse.course_id.toLowerCase())) {
          tempCourses.push(detailCourse);
        }
      });
    };
    getDetailsOfCourse();
    console.log(tempCourses)
    dispatch(setStudentEnrollCourses(courses))
    setCourses(tempCourses)
  }

  return [courses, updateEnrollCourses]
}