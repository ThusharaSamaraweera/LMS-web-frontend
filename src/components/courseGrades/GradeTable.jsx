import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getGPAByMarks, getGradeByMarks } from "../../utils/grade";
import { useSelector } from "react-redux";

// const grades = [
//   {
//     course_id: "11223",
//     course_name: "SE",
//     score: 80,
//     grade: "A",
//   },
// ];



// get GPA by passing score
// const getGPAFromScore = (mark) => {
//   if (mark >= 75) return 4.0;
//   else if (mark >= 50) return 2.0;
//   else if (mark > 0) return 1.0;
//   else return 0.0;
// };

const getAvgGPA = (courses) => {
  if (!courses) {
    return 0;
  }
  const gpas = courses.map(
    (course) => getGPAByMarks(course.score) * parseInt(course.course_id[4])
  );
  const avgGPA =
    gpas.reduce((preVal, curVal) => preVal + curVal, 0) /
    getTotalCredits(courses);
  return avgGPA;
};

const getTotalCredits = (courses) => {
  const course_credits = courses.map((course) => parseInt(course.course_id[7]));
  const totCredits = course_credits.reduce(
    (preValue, curValue) => preValue + curValue,
    0
  );
  return totCredits;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "" }, border: 2, borderBottom: 0 }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.level}
        </TableCell>
        <TableCell align="right">{row.totCredits}</TableCell>
        <TableCell align="right">{row.gpa}</TableCell>
      </TableRow>
      <TableRow sx={{ border: 1.5, borderTop: 0 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: 15 }}>
                      Course code
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 15 }}
                      align='center'
                    >
                      Course name
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 600, fontSize: 15 }}
                    >

                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 600, fontSize: 15 }}
                    >
                      Grade
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.courses.map((course) => (
                    <TableRow key={course.courseCode}>
                      <TableCell component="th" scope="row">
                        {course.courseCode}
                      </TableCell>
                      <TableCell  align="center">{course.courseName}</TableCell>
                      <TableCell align="center">{course.academicYear}</TableCell>
                      <TableCell align="center">{course.coureGPA}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const GradeTable = (props) => {
  const { grades } = props;
  const courses = useSelector((state) => state.courseReducer.courses)

  const getCourseNameById = (id) => {
    return courses.find(course => course.course_id.toLowerCase() === id.toLowerCase())?.course_name
  }

  const createData = (level, courses) => {
    const totCredits = getTotalCredits(courses);
    const calGpa = getAvgGPA(courses);
    const gpa = calGpa ? calGpa : 0;
  
    return {
      level,
      totCredits,
      gpa,
      courses: courses.map((course) => {
        return {
          courseCode: course.course_id,
          courseName: getCourseNameById(course.course_id),
          academicYear:"",
          coureGPA: getGradeByMarks(course.score),
        };
      }),
    };
  }

  // categorize courses by level
  const level1Courses = grades.filter((course) => course.course_id[4] === "1");
  const level2Courses = grades.filter((course) => course.course_id[4] === "2");
  const level3Courses = grades.filter((course) => course.course_id[4] === "3");
  const level4Courses = grades.filter((course) => course.course_id[4] === "4");

  const rows = [
    createData("Level 1", level1Courses),
    createData("Level 2", level2Courses),
    createData("Level 3", level3Courses),
    createData("Level 4", level4Courses),
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 3,
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ border: 2 }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 800, fontSize: 20 }}>Level</TableCell>
            <TableCell align="right" sx={{ fontWeight: 800, fontSize: 20 }}>
              Total credits
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 800, fontSize: 20 }}>
              GPA of year
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.level} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradeTable;
