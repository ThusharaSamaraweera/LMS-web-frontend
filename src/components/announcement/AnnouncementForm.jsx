import React from "react";
import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import { Box, Typography } from "@mui/material";

const cource = [
    "SENG11213",
    "SENG12213",
    "SENG12223",
    "SENG11212",
    "SENG12233",
    "PMAT12212",
    "SENG12242"
];

const AnnouncementForm = () => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const HandleOnSubmit = async (values) => {
        
    };

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
                New Announcement
            </Typography>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                onFinish={HandleOnSubmit}
            >
                <Row>

                    <Col xs={{ span: 24 }} lg={{ span: 11 }}>


                        <Form.Item
                            name="email"
                            label="Email"
                            hasFeedback
                            rules={[{ required: true, message: "Please enter email!" }]}
                        >
                            <Input placeholder="Enter Email" />
                        </Form.Item>

                        <Form.Item
                            name="academic_year"
                            label="Academic Year"
                            hasFeedback
                            rules={[{ required: true, message: "Please enter academic year!" }]}
                        >
                            <Input placeholder="Enter Academic Year" />
                        </Form.Item>

                        <Form.Item
                            name="course"
                            label="Course"
                            hasFeedback
                            rules={[{ required: true, message: "Please select course!" }]}
                        >
                            <Select placeholder="Select cource" showSearch>
                               
                            </Select>
                        </Form.Item>


                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 11, offset: 1 }}>

                        <Form.Item 
                            name="date" 
                            label="Date" 
                            rules={[{ required: true, message: "Please select date!" }]}
                            >
                            <DatePicker />
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
                            <Input.TextArea allowClear showCount maxLength={10000} />
                        </Form.Item>


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