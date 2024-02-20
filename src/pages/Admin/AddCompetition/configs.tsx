import {ProColumns} from "@ant-design/pro-components";
import {InputNumber, message, Upload, UploadProps} from "antd";
import {PoundCircleOutlined} from "@ant-design/icons";
import React from "react";
import {RcFile} from "antd/es/upload";

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


export const awardColumns: ProColumns[] = [
    {
        title: '奖励名称',
        dataIndex: 'awardName',
        key: 'awardName',
        formItemProps: {
            rules: [ { required: true, message: '奖励名称不能为空' },
                {
                    validator: (_, value) =>
                    {
                        if (value && value.length > 20)
                        {
                            return Promise.reject(new Error('奖励名称不能超过20字'));
                        }
                        return Promise.resolve();
                    }
                } ],
        },
    },
    {
        title: '奖励内容',
        dataIndex: 'awardContent',
        key: 'awardContent',
        formItemProps: {
            rules: [ { required: true, message: '奖励内容不能为空' },
                {
                    validator: (_, value) =>
                    {
                        if (value && value.length > 20)
                        {
                            return Promise.reject(new Error('奖励内容描述不能超过20字'));
                        }
                        return Promise.resolve();
                    }
                }
            ],
        },
    },
    {
        title: '奖励描述',
        key: 'awardDesc',
        dataIndex: 'awardDesc',
        formItemProps: {
            rules: [ { required: true, message: '奖励描述不能为空' },
                // 限制文字长度:
                {
                    validator: (_, value) =>
                    {
                        if (value && value.length > 200)
                        {
                            return Promise.reject(new Error('奖励描述不能超过200字'));
                        }
                        return Promise.resolve();
                    }
                } ],
        },
    },
    {
        title: "奖品数量",
        dataIndex: "awardCount",
        key: "awardCount",
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
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a
                key="delete"
                onClick={() =>
                {
                    setRewardItem(awardItemList.filter((item) => item.id !== record.id));
                }}
            >
                删除
            </a>,
        ],
    },
]

export const generateUploadLogoProps: UploadProps = (fileList, setFileList, handlePreview) =>
    ({
        name: 'file',
        listType: 'picture-card',
        showUploadList: true,
        onPreview: handlePreview,
        beforeUpload: (file) =>
        {
            const isImage = file.type.startsWith('image/');
            if (!isImage)
            {
                message.error('只能上传图片文件！');
                return Upload.LIST_IGNORE;
            }
            const isLt1M = file.size / 1024 / 1024 < 5;
            if (!isLt1M)
            {
                message.error('图片大小不能超过5MB！');
                return Upload.LIST_IGNORE;
            }
            console.log(file.size / 1024 / 1024)
            // 这里不需要设置文件列表，因为我们会在onChange中处理
            return false; // 阻止文件自动上传
        },
        onChange: ({ fileList: newFileList }) =>
        {
            console.log("newFileList is: ", newFileList)
            setFileList(newFileList); // 更新文件列表状态
        },
        fileList,
    })

export const generateUploadFileProps: UploadProps = (fileList: RcFile[], setFileList: React.Dispatch<React.SetStateAction<RcFile[]>>) =>
    ({
        listType: 'picture',
        maxCount: 20,
        beforeUpload: (newFile: RcFile) =>
        {
            const isExist = fileList.some(file => file.name === newFile.name && file.size === newFile.size);
            if (isExist)
            {
                message.error('文件已存在！');
                return Upload.LIST_IGNORE; // 阻止文件被添加到列表中
            }

            const isLt20M = newFile.size / 1024 / 1024 < 20;
            if (!isLt20M)
            {
                message.error('文件大小不能超过20MB！');
                return Upload.LIST_IGNORE; // 阻止文件被添加到列表中
            }

            setFileList(prevList => [ ...prevList, newFile ]);

            return false;
        },
    });

export const DefaultPermissionColleges = [
    {
        "label": "all",
        "value": "-999",
        "children": [
            {
                "label": "all",
                "value": "-999"
            }
        ]
    }
]


export const demoData = {
    "matchName": "1",
    "matchDesc": "2312312323123123231231232312312323123123231231232312312323123123231231232312312323123123231231232312312323123123231231232312312323123123231231232312312323123123",
    "matchStatus": 0,
    "matchLogo": [
        {
            "uid": "rc-upload-1708363903985-3",
            "lastModified": 1669297569619,
            "lastModifiedDate": "2022-11-24T13:46:09.619Z",
            "name": "5.jpg",
            "size": 1438426,
            "type": "image/jpeg",
            "percent": 0,
            "originFileObj": {
                "uid": "rc-upload-1708363903985-3"
            },
            "thumbUrl": "data:image/png;base64,iVBOFPLzx0HPclhwcRaPrFJr8uOOgZGOJFUedZEBWqIOWA4dq8akghqPKtiBQmFgDs7MHjeuvxpandhdr4N0mm1yr5SpOfpREQCLiA/xMPG5EEZpwSapPMRY8DsLUvUjuR8Blj6E58Xxciiaaq/C8hME498t3QKoIfeQ5Ef4XWd3zHkLbUuwAAAAASUVORK5CYII="
        }
    ],
    "matchType": "A类",
    "matchLevel": "国家级",
    "matchRule": "2312312323123123231231232312312323123123231231232312312323123123231231232312312323123123231231232312312323123123231231232312312323123123231231232312312323123123",
    "matchFileList": [
        {
            "uid": "rc-upload-1708363903985-5"
        }
    ],
    "matchPermissionRule": [
        [
            {
                "label": "计算机学院",
                "value": "1758426616761344002",
                "children": [
                    {
                        "label": "软件工程",
                        "value": "1758429386205749250"
                    }
                ]
            }
        ],
        [
            {
                "label": "信息管理与工程学院",
                "value": "1756016524447363073",
                "children": [
                    {
                        "label": "大数据管理与应用",
                        "value": "1756543795885174785"
                    }
                ]
            }
        ]
    ],
    "signupDate": [
        "2024-02-21T16:00:00.000Z",
        "2024-03-05T16:00:00.000Z"
    ],
    "matchDate": [
        "2024-03-21T16:00:00.000Z",
        "2024-03-30T16:00:00.000Z"
    ],
    "matchTags": [
        "test"
    ],
    "matchAward": [
        {
            "id": "466675",
            "awardName": "1",
            "awardContent": "1",
            "awardDesc": "1",
            "awardCount": 1,
            "index": 0
        }
    ],
    "maxTeamSize": 10,
    "minTeamSize": 1
}