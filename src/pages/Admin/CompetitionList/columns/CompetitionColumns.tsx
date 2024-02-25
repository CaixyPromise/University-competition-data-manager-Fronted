import {ProColumns} from "@ant-design/pro-components";
import {Space, Tag, Tooltip, Typography} from "antd";
import React from "react";

export const CompetitionColumns: ProColumns[] = [
    {
        title: '比赛ID',
        dataIndex: 'id',
        valueType: 'text',
        hideInForm: true,
    },
    {
        title: '比赛名称',
        dataIndex: 'matchName',
        valueType: 'text',
        width: 1000,
    },
    // {
    //     title: '比赛描述',
    //     dataIndex: 'matchDesc',
    //     valueType: 'textarea',
    //     hideInSearch: true,
    //     width: 1500,
    //     render: (_, record) => (
    //         <>{record.matchDesc?.substring(0, 50)}{record.matchDesc?.length > 50 ? '...' : ''}</>
    //         // 显示前100个字符，如果超过100字符则显示省略号
    //     ),
    // },
    {
        title: '比赛状态',
        dataIndex: 'matchStatus',
        valueType: 'text',
        render: (_, record) =>
        {
            const statusColorMap: {
                [key: string]: string
            } = {
                0: 'yellow', // 未开始
                1: 'green',  // 正在进行
                2: 'red',    // 已结束
            };
            const statusTextMap: {
                [key: string]: string
            } = {
                0: '未开始',
                1: '正在进行',
                2: '已结束',
            };
            return <Tag color={statusColorMap[record.matchStatus]}>{statusTextMap[record.matchStatus]}</Tag>;
        },
    },
    {
        title: '比赛宣传图片',
        dataIndex: 'matchPic',
        valueType: 'image',
        hideInSearch: true,
        fieldProps: {
            width: 128,
        },
    },
    {
        title: '比赛类型',
        dataIndex: 'matchType',
        valueType: 'text',
    },
    {
        title: '比赛等级',
        dataIndex: 'matchLevel',
        valueType: 'text',
    },
    {
        title: '允许分组',
        dataIndex: 'matchPermissionRule',
        valueType: 'textarea',
        hideInSearch: true,
    },
    {
        title: '比赛标签',
        dataIndex: 'matchTags',
        valueType: 'text',
        hideInSearch: true,
        render: (_, record) =>
        {
            if (record.matchTags === undefined || record.matchTags === null || record.matchTags.length === 0)
            {
                return <Tag color="red">无</Tag>;
            }
            const tag = record.matchTags;
            return <>
                {Object.entries(tag).map(([ tag, description ]) => (
                    <Tooltip title={description} key={tag}>
                        <Tag color="blue">{tag}</Tag>
                    </Tooltip>
                ))}
            </>
        }
    },
    // {
    //     title: '比赛奖品',
    //     dataIndex: 'matchAward',
    //     valueType: 'textarea',
    //     hideInSearch: true,
    //     render: (_, record) =>
    //     {
    //         if (record.matchAward === undefined || record.matchAward === null || record.matchAward.length === 0)
    //         {
    //             return <Tag color="red">无</Tag>;
    //         }
    //         const matchAward = record.matchAward;
    //         return <>
    //             <div>
    //                 {Object.entries(matchAward).map(([ tag, description ]) => (
    //                     <Tooltip title={description} key={tag}>
    //                         <Tag color="blue">{tag}</Tag>
    //                     </Tooltip>
    //                 ))}
    //             </div>
    //         </>
    //     }
    // },
    {
        title: '比赛创建人id',
        dataIndex: 'createdUser',
        valueType: 'text',
    },
    {
        title: '团队大小',
        dataIndex: 'teamSize',
        valueType: 'text',
    },
    {
        title: '比赛开始时间',
        dataIndex: 'startTime',
        valueType: 'dateTime',
        hideInSearch: true,
    },
    {
        title: '比赛结束时间',
        dataIndex: 'endTime',
        valueType: 'dateTime',
        hideInSearch: true,
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
                        // todo: Add logic to set current row and open modal for update
                    }}
                >
                    修改
                </Typography.Link>
                <Typography.Link type="danger" onClick={() =>
                {
                    // todo: Add logic for delete operation
                }}>
                    删除
                </Typography.Link>
            </Space>
        ),
    },
];

export const CompetitionModalColumn = (): ProColumns[] => [
    {
        title: '比赛名称',
        dataIndex: 'matchName',
        valueType: 'text',
        rules: [
            {
                required: true,
                message: '请输入比赛名称',
            },
        ],
    },
    {
        title: '比赛描述',
        dataIndex: 'matchDesc',
        valueType: 'textarea',
        rules: [
            {
                required: true,
                message: '请输入比赛描述',
            },
        ],
    },
    {
        title: '比赛规则',
        dataIndex: "matchRule",
        valueType: 'textarea',
    },
    {
        title: "比赛状态",
        dataIndex: "matchStatus",
        valueType: "select",
        valueEnum: {
            0: { text: '未开始', status: 'Default' },
            1: { text: '进行中', status: 'Processing' },
            2: { text: '已结束', status: 'Success' }
        }
    }
]
