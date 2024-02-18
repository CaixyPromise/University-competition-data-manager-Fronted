import {ProColumns} from "@ant-design/pro-components";
import {Space, Typography} from "antd";
import React from "react";


export const UserInfoColumns = (collegesAndMajors: { [key: string]: any }): ProColumns<API.User>[] => [
    {
        title: 'id',
        dataIndex: 'id',
        valueType: 'text',
        hideInForm: true,
    },
    {
        title: '账号',
        dataIndex: 'userAccount',
        valueType: 'text',
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        valueType: 'text',
    },
    {
        title: '头像',
        dataIndex: 'userAvatar',
        valueType: 'image',
        fieldProps: {
            width: 64,
        },
        hideInSearch: true,
    },
    {
        title: '学院',
        dataIndex: 'userDepartment',
        render: (_: any, record: { userDepartment: string | number; }) => {
            return collegesAndMajors[record.userDepartment]?.name || '未知学院';
        },
    },
    {
        title: '专业',
        dataIndex: 'userMajor',
        render: (_: any, record: { userDepartment: string | number; userMajor: string | number; }) => {
            const department = collegesAndMajors[record.userDepartment];
            return department?.majors[record.userMajor] || '未知专业';
        },
    },
    {
        title: '权限',
        dataIndex: 'userRole',
        valueEnum: {
            user: {
                text: '用户',
            },
            admin: {
                text: '管理员',
            },
        },
    },
    {
        title: '创建时间',
        sorter: true,
        dataIndex: 'createTime',
        valueType: 'dateTime',
        hideInSearch: true,
        hideInForm: true,
    },
    {
        title: '更新时间',
        sorter: true,
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        hideInSearch: true,
        hideInForm: true,
    },
    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
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