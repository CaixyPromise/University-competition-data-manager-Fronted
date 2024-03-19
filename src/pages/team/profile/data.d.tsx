import {ProColumns} from "@ant-design/pro-components";

import {Space, Typography} from "antd";
import React from "react";

export type AdvancedOperation1 = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export type AdvancedOperation2 = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export type AdvancedOperation3 = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export interface AdvancedProfileData
{
    advancedOperation1?: AdvancedOperation1[];
    advancedOperation2?: AdvancedOperation2[];
    advancedOperation3?: AdvancedOperation3[];
}


export const userInfoColumn: ProColumns<API.UserTeamWorkVO>[] = (handleAdjust, handleRemove) => ([
    {
        title: "学号",
        dataIndex: "userAccount",
        key: "userAccount"
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "专业",
        dataIndex: "userMajor",
        key: "userMajor"
    },
    {
        title: "学院",
        dataIndex: "userDepartment",
        key: "userDepartment"
    },
    {
        title: "邮箱",
        dataIndex: "userEmail",
        key: "userEmail"
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
                        handleAdjust(record)
                    }}
                >
                    设为队长
                </Typography.Link>
                <Typography.Link type="danger" onClick={() => handleRemove(record)}>
                    移除成员
                </Typography.Link>
            </Space>
        ),
    },
])



export const teacherInfoColumn: ProColumns<API.UserTeamWorkVO>[] = (handleAdjust, handleRemove) => ([
    {
        title: "工号",
        dataIndex: "userAccount",
        key: "userAccount"
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "专业",
        dataIndex: "userMajor",
        key: "userMajor"
    },
    {
        title: "学院",
        dataIndex: "userDepartment",
        key: "userDepartment"
    },
    {
        title: "邮箱",
        dataIndex: "userEmail",
        key: "userEmail"
    },
    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        width: 200,
        render: (_, record) => (
            <Space size="middle">
                <Typography.Link type="danger" onClick={() => handleRemove(record)}>
                    移除成员
                </Typography.Link>
            </Space>
        ),
    },
])

export const userApplyColumn: ProColumns<API.TakerProfileVO>[] = (handleResove, handleReject) => ([
    {
        title: "学号",
        dataIndex: "userAccount",
        key: "userAccount"
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "专业",
        dataIndex: "userMajor",
        key: "userMajor"
    },
    {
        title: "学院",
        dataIndex: "userDepartment",
        key: "userDepartment"
    },
    {
        title: "邮箱",
        dataIndex: "userEmail",
        key: "userEmail"
    },
    {
        title: "申请时间",
        dataIndex: "takeTime",
        key: "takeTime"
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
                        handleResove(record)
                    }}
                >
                    同意
                </Typography.Link>
                <Typography.Link type="danger" onClick={() => handleReject(record)}>
                    拒绝
                </Typography.Link>
            </Space>
        ),
    },
])

