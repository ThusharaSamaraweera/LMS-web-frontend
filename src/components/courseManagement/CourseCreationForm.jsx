import { Box, Typography } from "@mui/material";
import React from "react";
import { Button, Form, Input, Select } from "antd";
import { addNewCourse } from "../../servers/course.service";
import Alert from "../utilsComponents/Alert";

const department = ["Software Engineering", "Physical Science"];

const faculty = [
  "Commerce and Management Studies",
  "Humanities",
  "Medicine",
  "Science",
  "Social Science",
  "Computing and Technology",
];

const CourseCreationForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const HandleOnSubmit = async (values) => {
    try {
      await addNewCourse(values)
      Alert({ message: "New course creation successful", type: "success"})
      // form.resetFields();
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
        width: 600,
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
          <Input placeholder="Enter academic year" />
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            ADD
          </Button>

          <Button
            type="default"
            htmlType="submit"
            style={{ marginLeft: "10px" }}
            onClick={(e) => handleOnResetClick(e)}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};

export default CourseCreationForm;
