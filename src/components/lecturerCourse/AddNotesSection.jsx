import React from 'react'
import { Box, Typography } from '@mui/material'
import { Form, Input, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddNotesSection = () => {
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

        <Dragger {...props} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag a file to this area to upload</p>
        </Dragger>
      </Form>
    </Box>
  )
}

export default AddNotesSection