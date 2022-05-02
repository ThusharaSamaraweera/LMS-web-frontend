import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(level, courses) {
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
        courseName: course.course_name,
        academicYear: "",
        coureGPA: getGPAFromScore(course.score),
      };
    }),
  };
}

const grades = [
  {
    course_id: "11223",
    course_name: "SE",
    score: 80,
    grade: "A",
  },
  {
    course_id: "12223",
    course_name: "SE",
    score: 40,
    grade: "A",
  },
  {
    course_id: "21222",
    course_name: "SE",
    score: 80,
    grade: "A",
  },
  {
    course_id: "11222",
    course_name: "SE",
    score: 20,
    grade: "A",
  },
];

const getGPAFromScore = (mark) => {
  if (mark >= 75) return 4.0;
  else if (mark >= 50) return 2.0;
  else return 1.0;
};

const getAvgGPA = (courses) => {
  if (!courses) {
    return 0;
  }
  const gpas = courses.map(
    (course) => getGPAFromScore(course.score) * parseInt(course.course_id[4])
  );
  const avgGPA =
    gpas.reduce((preVal, curVal) => preVal + curVal, 0) /
    getTotalCredits(courses);
  return avgGPA;
};

const level1Courses = grades.filter((course) => course.course_id[0] === "1");
const level2Courses = grades.filter((course) => course.course_id[0] === "2");
const level3Courses = grades.filter((course) => course.course_id[0] === "3");
const level4Courses = grades.filter((course) => course.course_id[0] === "4");

const getTotalCredits = (courses) => {
  const course_credits = courses.map((course) => parseInt(course.course_id[4]));
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
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Course code</TableCell>
                    <TableCell>Course name</TableCell>
                    <TableCell align="right">Academic year</TableCell>
                    <TableCell align="right">GPA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.courses.map((course) => (
                    <TableRow key={course.courseCode}>
                      <TableCell component="th" scope="row">
                        {course.courseCode}
                      </TableCell>
                      <TableCell>{course.courseName}</TableCell>
                      <TableCell align="right">{course.academicYear}</TableCell>
                      <TableCell align="right">{course.coureGPA}</TableCell>
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         academicYear: PropTypes.number.isRequired,
//         courseName: PropTypes.string.isRequired,
//         courseCode: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     level: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData("Level 1", level1Courses),
  createData("Level 2", level2Courses),
  createData("Level 3", level3Courses),
  createData("Level 4", level4Courses),
];

const GradeTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Level</TableCell>
            <TableCell align="right">Total credits</TableCell>
            <TableCell align="right">GPA</TableCell>
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
