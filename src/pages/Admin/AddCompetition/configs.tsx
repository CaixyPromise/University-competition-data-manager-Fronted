import {ProColumns} from "@ant-design/pro-components";
import {InputNumber, message, UploadProps} from "antd";
import {PoundCircleOutlined} from "@ant-design/icons";
import React from "react";

export const matchStatusOptions = [
    { value: 0, label: '未开始' },
    { value: 1, label: "报名中" },
    { value: 2, label: '进行中' },
    { value: 3, label: '已结束' },
];
export const matchTypeOptions = [
    { value: 'A类', label: 'A类' },
    { value: 'B类', label: 'B类' },
    { value: 'C类', label: 'C类' },
    { value: 'D类', label: 'D类' },
    { value: 'E类', label: 'E类' },
    { value: '未评级', label: '未评级' },
];
export const matchLevelOptions = [
    { value: '世界级', label: '世界级' },
    { value: '国家级', label: '国家级' },
    { value: '省级', label: '省级' },
    { value: '校级', label: '校级' },
    { value: '学院级', label: '学院级' },
];
export const matchPermissionRuleOptions = [
    {
        value: 0, label: "全部学院"
    },
    {
        value: 1, label: "限制学院",
    }
]


export const rewardColumns: ProColumns[] = [
    {
        title: '奖励名称',
        dataIndex: 'rewardName',
        key: 'rewardName',
        formItemProps: {
            rules: [ { required: true, message: '奖励名称不能为空' } ],
        },
    },
    {
        title: '奖励内容',
        dataIndex: 'rewardContent',
        key: 'rewardContent',
        formItemProps: {
            rules: [ { required: true, message: '奖励内容不能为空' } ],
        },
    },
    {
        title: '奖励描述',
        key: 'rewardDesc',
        dataIndex: 'rewardDesc',
        formItemProps: {
            rules: [ { required: true, message: '奖励描述不能为空' } ],
        },
    },
    {
        title: "奖品数量",
        dataIndex: "rewardCount",
        key: "rewardCount",
        valueType: 'digit', // 指定值类型为数字
        formItemProps: {
            // 在表单项属性中配置InputNumber
            rules: [ { required: true, message: '请输入奖品数量' } ],
        },
        // 在编辑模式下，使用renderFormItem渲染InputNumber
        renderFormItem: (_, { defaultValue, onChange, ...rest }) => (
            <InputNumber
                min={1}
                max={1000000}
                addonBefore={<PoundCircleOutlined/>}
                addonAfter={'个'}
                defaultValue={defaultValue || 1}
                onChange={value => onChange?.(value)}
                {...rest}
            />
        ),
    },
    {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() =>
                {
                    console.log("onEditableClick")
                    console.log("text is", text, "record is", record, "action is", action, "_ is", _)
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a
                key="delete"
                onClick={() =>
                {
                    console.log("onDelete")
                    setRewardItem(rewardItemList.filter((item) => item.id !== record.id));
                }}
            >
                删除
            </a>,
        ],
    },
]

export const UploadFileProps: UploadProps = {
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange({ file, fileList })
    {
        if (file.status !== 'uploading')
        {
            console.log(file, fileList);
        }
    },
    defaultFileList: [
        {
            uid: '1',
            name: 'xxx.png',
            status: 'uploading',
            url: 'http://www.baidu.com/xxx.png',
            percent: 33,
        },
        {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
        },
        {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/zzz.png',
        },
    ],
    listType: 'picture',
    action: '/your-upload-api',
    beforeUpload: (file) =>
    {
        const isImage = file.type.startsWith('image/');
        if (!isImage)
        {
            message.error('只能上传图片文件！');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M)
        {
            message.error('图片大小不能超过1MB！');
        }
        return isImage && isLt1M;
    },

    // extra : "支持扩展名：.jpg .jpeg .png ...，图片大小不超过1MB"
};