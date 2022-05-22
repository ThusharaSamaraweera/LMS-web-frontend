import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import lecturerServices from "../../services/lecturer.service";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddNotesSection = () => {
  const [file, setFile] = useState([]);

  const handleOnFileChange = ({ fileList }) => {
    console.log(fileList[0].originFileObj);
    setFile(fileList);
  };

  const handleOnUpload = async () => {
    let formData = new FormData()
    formData.append("subjectName", "se");
    formData.append("description", "descrip")
    formData.append("academinc_year", "2018")
    formData.append("file", file[0].originFileObj)
    // for(var pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    await lecturerServices.uploadFile(formData)
  }

  const handleUpload = () => {

  }

  return (
    <Box
      sx={{
        marginY: 5,
        border: 2,
        padding: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Notes
      </Typography>
      <Form {...layout} name="basic">
        <Form.Item
          label="Description"
          name="description"
          hasFeedback
          className="body-label"
        >
          <Input.TextArea allowClear showCount maxLength={100} rows={5} />
        </Form.Item>

        <Dragger
          {...props}
          maxCount={1}
          // beforeUpload={() => false}
          onChange={handleOnFileChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag a file to this area to upload
          </p>
        </Dragger>

        <Button
          sx={{
            marginY: 1,
          }}
          fullWidth
          variant="contained"
          onClick={handleOnUpload}
        >
          upload
        </Button>
      </Form>
    </Box>
  );
};

export default AddNotesSection;
