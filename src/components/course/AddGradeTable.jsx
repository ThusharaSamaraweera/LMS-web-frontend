import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import lecturerServices from "../../services/lecturer.service";
import { Box } from "@mui/material";
import { getGradeByMarks } from "../../utils/grade";

const originData = [];

const students = [
  {
    name: "amal1@stu.kln.ac.lk",
    studentId: "SE/2018/001",
    finalExamScore: 50,
    finalGrade: "C"
  },
  {
    name: "amal2@stu.kln.ac.lk",
    studentId: "SE/2018/002",
    finalExamScore: 60,
    finalGrade: "B"
  },
  {
    name: "amal3@stu.kln.ac.lk",
    studentId: "SE/2018/003",
    finalExamScore: 70,
    finalGrade: "A"
  }
]

for (let i = 0; i < students.length; i++) {
  originData.push({
    key: i.toString(),
    name: students[i].name,
    studentId: students[i].studentId,
    finalExamScore: students[i].finalExamScore,
    finalGrade: getGradeByMarks(students[i].finalExamScore),
  });
}

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
              type: 'number',
              message: 'Please enter number'
            }
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
  const {courseId} = props;
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

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

      const editedRow = {...record, ...row}

      const editedGrade = {
        student_email: editedRow.name,
        course_id: courseId,
        score: editedRow.finalExamScore,
        grade: editedRow.finalGrade
      }

      await lecturerServices.addGradeForStudent(editedGrade)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

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
      title: "Student Id",
      dataIndex: "studentId",
      width: "15%",
      editable: false,
    },
    {
      title: "Final exam score",
      dataIndex: "finalExamScore",
      width: "20%",
      editable: true,
    },
    {
      title: "Final grade",
      dataIndex: "finalGrade",
      width: "20%",
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
