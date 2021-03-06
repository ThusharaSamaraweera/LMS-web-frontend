import { Box, Typography } from "@mui/material";
import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import lecturerServices from "../../services/lecturer.service";
import Alert from "../utilsComponents/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getAllLecturerCourses } from '../../store/actions/lecturerAction'

const CourseCreationForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch()
  const allDepartments = useSelector(state => state.courseReducer.department)
  const faculty = useSelector((state) => state.courseReducer.faculties)

  const department = allDepartments.map((item) => item.department)

  const HandleOnSubmit = async (values) => {
    try {
      await lecturerServices.addNewCourse(values)
      Alert({ message: "New course creation successful", type: "success"})
      dispatch(getAllLecturerCourses());
      form.resetFields();
    } catch (error) {
      Alert({ message: error.message, type: "error"})
    }
  };

  const departmentOptions = department.map((department) => {
    return (
      <Option value={department} key={department}>
        {department}
      </Option>
    );
  });

  const facultyOptions = faculty.map((faculty) => {
    return (
      <Option value={faculty} key={faculty}>
        {faculty}
      </Option>
    );
  });

  const handleOnResetClick = (e) => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <Box
      sx={{
        width: 1200,
        border: 1,
        paddingBottom: 3,
        paddingTop: 1,
        paddingX: 2,
        display: "block",
      }}
    >
      <Typography
        textAlign="center"
        variant="h5"
        sx={{
          marginY: 1.5,
        }}
      >
        Course creation
      </Typography>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={HandleOnSubmit}
      >
        <Row>

          <Col xs={{span: 24}} lg={{span: 11}}>


            <Form.Item
              name="course_id"
              label="Course Id"
              hasFeedback
              rules={[{ required: true, message: "Please enter Course Id" }]}
            >
              <Input placeholder="Enter Course Id" />
            </Form.Item>

            <Form.Item
              name="course_name"
              label="Course name"
              hasFeedback
              rules={[{ required: true, message: "Please enter Course name" }]}
            >
              <Input placeholder="Enter Couse name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="course_description"
              hasFeedback
              className="description-label"
            >
              <Input.TextArea allowClear showCount maxLength={255} />
            </Form.Item>

            <Form.Item
              name="academic_year"
              label="Academic year"
              hasFeedback
              rules={[{ required: true, message: "Please enter lecturer email" }]}
            >
              <Select placeholder="Select academic year">
                <Option value="2019-2020">2019-2020</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="semester"
              label="Semester"
              hasFeedback
              rules={[{ required: true, message: "Please select semester!" }]}
            >
              <Select placeholder="Select semester">
                <Option value="1">Semester 1</Option>
                <Option value="2">Semester 2</Option>
              </Select>
            </Form.Item>

          </Col>

          <Col xs={{span: 24}} lg={{span: 11, offset: 1}}>

            <Form.Item
              name="level"
              label="Level"
              hasFeedback
              rules={[{ required: true, message: "Please select level!" }]}
            >
              <Select placeholder="Select level">
                <Option value="1">Level 1</Option>
                <Option value="2">Level 2</Option>
                <Option value="3">Level 3</Option>
                <Option value="4">Level 4</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="department_name"
              label="Department"
              hasFeedback
              rules={[{ required: true, message: "Please select department!" }]}
            >
              <Select placeholder="Select department" showSearch>
                {departmentOptions}
              </Select>
            </Form.Item>

            <Form.Item
              name="faculty_name"
              label="Faculty"
              hasFeedback
              rules={[{ required: true, message: "Please select faculty!" }]}
            >
              <Select placeholder="Select faculty" showSearch>
                {facultyOptions}
              </Select>
            </Form.Item>


            <Form.Item wrapperCol={{ offset:11, span: 13 }}>
              <Button type="primary" htmlType="submit" className="course-creation-add-btn">
                ADD
              </Button>

              <Button
                type="default"
                htmlType="submit"
                style={{ marginLeft: "10px" }}
                onClick={(e) => handleOnResetClick(e)}
                className='course-creation-reset-btn'
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>



      </Form>
    </Box>
  );
};

export default CourseCreationForm;
