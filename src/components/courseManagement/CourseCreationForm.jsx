import { Box, Typography } from "@mui/material";
import React from "react";
import { Button, Form, Input, Row } from "antd";

const CourseCreationForm = () => {
  const [form] = Form.useForm();

  const HandleOnSubmit = (values) => {
    console.log(values);
    form.resetFields();
  };

  return (
    <Box
      sx={{
        width: 600,
        border: 1,
        paddingBottom: 3,
        paddingTop:1, 
        paddingX: 2,
        display: "block",
      }}
    >
      <Typography
        textAlign='center'
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
          name="courseId"
          label="Course Id"
          rules={[{ required: true, message: "Please enter Course Id" }]}
        >
          <Input placeholder="Couse Id" />
        </Form.Item>

        <Form.Item
          name="curseName"
          label="Course name"
          rules={[{ required: true, message: "Please enter Course name" }]}
        >
          <Input placeholder="Couse name" />
        </Form.Item>

        <Form.Item
          name="lecturerName"
          label="Lecturer Name"
          rules={[{ required: true, message: "Please enter lecturer name" }]}
        >
          <Input placeholder="Couse name" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            ADD
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};

export default CourseCreationForm;
