import {ProColumns} from "@ant-design/pro-components";
import React from "react";
import {Button, Space, Typography} from "antd";



export const DepartmentColumns = ({
    setCurrentRow,
    setUpdateModalVisible,
    handleDelete
}: ColumnsFunctionProps): ProColumns[] => [
    {
        title: '学院id',
        width: 120,
        dataIndex: 'departmentId',
        render: (_) => <a>{_}</a>,
    },
    {
        title: '学院名称',
        width: 120,
        dataIndex: 'departmentName',
    },
    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        width: 100,
        render: (_, record) => (
            <Space size="middle">
                <Typography.Link
                    onClick={() =>
                    {
                        setCurrentRow(record);
                        setUpdateModalVisible(true);
                    }}
                >
                    修改
                </Typography.Link>
                <Typography.Link type="danger" onClick={() => handleDelete(record)}>
                    删除
                </Typography.Link>
            </Space>
        ),
    }
];

export const subMajorColumns = ({
    setCurrentRow,
    setUpdateModalVisible,
    handleDelete
}: ColumnsFunctionProps): ProColumns[] => [
    {
        title: "专业id",
        dataIndex: "majorId",
        width: 120,
    },
    {
        title: "专业名称",
        dataIndex: "majorName",
        width: 120,
    },

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        width: 200,
        render: (_, record) => (
            <Space size="middle">
                <Typography.Link
                    onClick={() =>
                    {
                        setCurrentRow(record);
                        setUpdateModalVisible(true);
                    }}
                >
                    修改
                </Typography.Link>
                <Typography.Link type="danger" onClick={() => handleDelete(record)}>
                    删除
                </Typography.Link>
            </Space>
        ),
    },
]