import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AnnouncementForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const courses = useSelector((state) => state.lecturerReducer.courses).map(
    (course) => course.course_id
  );

  useEffect(() => {
    form.setFieldsValue({
      email: userEmail,
    });
  }, []);

  const userEmail = useSelector((state) => state.authReducer.authUser.username);

  const HandleOnSubmit = async (values) => {
    console.log(values)
  };

  const handleOnResetClick = (e) => {
    e.preventDefault();
    form.resetFields();
  };

  const courseOptions = courses.map((course) => {
    return (
      <Option value={course} key={course}>
        {course}
      </Option>
    );
  });

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
        New Announcement
      </Typography>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        form={form}
        onFinish={HandleOnSubmit}
      >
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[{ required: true, message: "Please enter email!" }]}
            >
              <Input placeholder="Enter Email" disabled />
            </Form.Item>

            <Form.Item
              name="academic_year"
              label="Academic Year"
              hasFeedback
              rules={[
                { required: true, message: "Please enter academic year!" },
              ]}
            >
              <Select placeholder="Select Academic Year">
                <Option value="1">2018/2019</Option>
                <Option value="2">2019/2020</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 11, offset: 1 }}>
            <Form.Item
              name="course"
              label="Course"
              hasFeedback
              rules={[{ required: true, message: "Please select course!" }]}
            >
              <Select placeholder="Select cource" showSearch>
                {courseOptions}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }}>
            <Form.Item
              name="title"
              label="Title"
              hasFeedback
              rules={[{ required: true, message: "Please enter title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              label="Body"
              name="body"
              hasFeedback
              className="body-label"
              rules={[{ required: true, message: "Please enter message!" }]}
            >
              <Input.TextArea allowClear showCount maxLength={1000} rows={10} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }}>
            <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
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
          </Col>
        </Row>
      </Form>
    </Box>
  );
};
export default AnnouncementForm;
