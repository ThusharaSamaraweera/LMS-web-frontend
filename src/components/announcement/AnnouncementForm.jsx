import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LecturerService from "../../services/lecturer.service";
import Alert from "../utilsComponents/Alert";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";

const AnnouncementForm = (props) => {
  const { courseId, academicYear, fetchAnnouncements } = props;
  const [form] = Form.useForm();
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    form.setFieldsValue({
      email: userEmail,
    });
  }, []);

  const userEmail = useSelector((state) => state.authReducer.authUser.username);

  const HandleOnSubmit = (values) => {
    setConfirmationDialogOpen(true);
    setFormValues(values);
  };

  const handleOnResetClick = (e) => {
    e.preventDefault();
    form.resetFields(["body", "title", "category", "academic_year"]);
  };

  const handleOnAccept = async () => {
    setConfirmationDialogOpen(false);

    const newAnnouncement = {
      title: formValues.title,
      body: formValues.body,
      category: courseId,
      academic_year: academicYear,
    };

    try {
      await LecturerService.addNewAnnouncement(newAnnouncement);

      Alert({
        message: "New announcement is sent successfully",
        type: "success",
      });

      // fetch announcemnts
      fetchAnnouncements({
        category: courseId,
        academicYear: academicYear,
      });
    } catch (error) {
      Alert({ message: error.message, type: "error" });
    }
  };

  const handleOnCancel = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          title={`Do you want to sent the announcement to student 
          those have been enrolled ${courseId} course for ${academicYear} academic year ?`}
          handleOnAccept={handleOnAccept}
          handleOnCancel={handleOnCancel}
        />
      )}
      <Box
        sx={{
          border: 1,
          paddingBottom: 3,
          paddingTop: 1,
          paddingX: 2,
          display: "block",
          marginX: 2,
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
            <Col xs={{ span: 24 }}>
              <Form.Item
                name="email"
                label="Email"
                hasFeedback
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input placeholder="Enter Email" disabled />
              </Form.Item>

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
                <Input.TextArea
                  allowClear
                  showCount
                  maxLength={1000}
                  rows={10}
                />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }}>
              <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                <Button type="primary" htmlType="submit">
                  Send
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
    </>
  );
};
export default AnnouncementForm;
