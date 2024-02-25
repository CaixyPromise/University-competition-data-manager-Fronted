import {ProColumns} from "@ant-design/pro-components";
import {InputNumber} from "antd";
import {PoundCircleOutlined} from "@ant-design/icons";
import React from "react";

export const awardDetailsColumns: ProColumns[] = [
    {
        title: '奖励名称',
        dataIndex: 'awardName',
        key: 'awardName',
    },
    {
        title: '奖励内容',
        dataIndex: 'awardContent',
        key: 'awardContent',

    },
    {
        title: '奖励描述',
        key: 'awardDesc',
        dataIndex: 'awardDesc',
    },
    {
        title: '奖品数量',
        dataIndex: 'awardCount',
        key: 'awardCount',
        valueType: 'digit', // 指定值类型为数字
    },

];