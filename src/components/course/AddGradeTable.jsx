import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import lecturerServices from "../../services/lecturer.service";
import { Box } from "@mui/material";
import { getGradeByMarks } from "../../utils/grade";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
            {
              type: "number",
              message: "Please enter number",
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AddGradeTable = (props) => {
  let originData = [];
  const { courseId, grades, fetchCourseGrades } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;
  console.log(grades)
  const createRows = () => {
    for (let i = 0; i < grades.length; i++) {
      originData.push({
        key: i.toString(),
        email: grades[i].studentEmail,
        name: `${grades[i].first_name} ${grades[i].last_name}`,
        studentId: grades[i].student_id,
        finalExamScore: grades[i].score,
        finalGrade: getGradeByMarks(grades[i].score),
      });
    }
    console.log(originData)
  }

  createRows()

  const edit = (record) => {
    form.setFieldsValue({
      studentId: "",
      finalGrade: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key, record) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      const editedRow = { ...record, ...row };
      const editedGrade = {
        student_email: editedRow.email,
        course_id: courseId,
        score: editedRow.finalExamScore,
        grade: getGradeByMarks(editedRow.finalExamScore),
      };

      await lecturerServices
        .addGradeForStudent(editedGrade)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      await fetchCourseGrades();
      originData = []
      // createRows()
      // console.log(originData)
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      editable: false,
    },
    {
      title: "Student Id",
      dataIndex: "studentId",
      width: "15%",
      editable: false,
      // todo sorter: (a, b) => a.studentId - b.studentId,
    },
    {
      title: "Final exam score",
      dataIndex: "finalExamScore",
      width: "15%",
      editable: true,
    },
    {
      title: "Final grade",
      dataIndex: "finalGrade",
      width: "10%",
      editable: false,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key, record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Box
      sx={{
        marginY: 5,
        border: 2,
        padding: 2,
      }}
    >
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Box>
  );
};

export default AddGradeTable;
