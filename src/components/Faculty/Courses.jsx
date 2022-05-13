import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const allCourses = [
  "GNCT 13212 - Personal Progress and Development I (2019/2020)",
  "SENG 11232 - Engineering Foundation (2019/2020)",
  "SENG 11223 - Programming Concepts (2019/2020)",
];

const renderCourses = allCourses.map((course) => {
  return (
    <Grid
      container
      sx={{
        marginY: 1,
      }}
      key={course}
    >
      <Grid item xs={12} sm={9}>
        <Typography>{course}</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="outlined"
          size="small"
        >
          Enroll me
        </Button>
      </Grid>
    </Grid>
  );
});


const Courses = () => (
  <Collapse>
    <Panel header="Level 1" key="1">
      <Collapse>
        <Panel header="Semester 1" key="1">
          <Box>
            <Stack>{renderCourses}</Stack>
          </Box>
        </Panel>
        <Panel header="Semester 1" key="2">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </Panel>
    <Panel header="Level 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="Level 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
);

export default Courses