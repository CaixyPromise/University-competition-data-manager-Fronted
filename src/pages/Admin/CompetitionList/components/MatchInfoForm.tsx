import React, {useEffect, useRef, useState} from 'react';
import {TweenOneGroup} from 'rc-tween-one';
import {
    EditableProTable,
    ModalForm,
    ProColumns,
    ProForm,
    ProFormDateTimePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton
} from "@ant-design/pro-components";
import {Cascader, Input, InputNumber, InputRef, message, Tag, theme} from "antd";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";

type option = {
    label: string,
    value: string,
    children?: option[] | any;
}

interface Major
{
    [key: string]: string;
}

interface College
{
    name: string;
    majors: Major;
}

interface Colleges
{
    [key: string]: College;
}

interface CascaderOption
{
    label: string;
    value: string;
    children?: CascaderOption[];
}

// 定义表格行类型
type TableRecordType = {
    id: React.Key;
    collegeId?: string;
    majorId?: string;
    children?: TableRecordType[];
};

type RewardItemType = {
    id: React.Key;
    rewardName: string;
    rewardContent: string;
    rewardDesc: string;
}

const TagComponent = ({tags, setTags}) =>
{
    const { token } = theme.useToken();
    const [ inputVisible, setInputVisible ] = useState(false);
    const [ inputValue, setInputValue ] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() =>
    {
        if (inputVisible)
        {
            inputRef.current?.focus();
        }
    }, [ inputVisible ]);

    const handleClose = (removedTag: string) =>
    {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const showInput = () =>
    {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () =>
    {
        if (inputValue && tags.indexOf(inputValue) === -1)
        {
            setTags([ ...tags, inputValue ]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: string) =>
    {
        const tagElem = (
            <Tag
                closable
                onClose={(e) =>
                {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
        );
    };

    const tagChild = tags.map(forMap);

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    return <>
        <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
                enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                }}
                onEnd={(e) =>
                {
                    if (e.type === 'appear' || e.type === 'enter')
                    {
                        (e.target as any).style = 'display: inline-block';
                    }
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
            >
                {tagChild}
            </TweenOneGroup>
        </div>
        {inputVisible ? (
            <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />
        ) : (
            <Tag onClick={showInput} style={tagPlusStyle}>
                <PlusOutlined/> New Tag
            </Tag>
        )}
    </>
}


const MatchInfoForm = ({ defaultValues, visible, onFinish, collegesAndMajors, onOpenChange }) =>
{
    const [ editableKeys, setEditableRowKeys ] = useState<React.Key[]>([]);
    const [ ruleTableVisible, setRuleTableVisible ] = useState<boolean>(false);
    const [ selectPermissionColleges, setSelectPermissionColleges ] = useState<option[][]>([]);
    const [ rewardItemList, setRewardItem ] = useState<readonly RewardItemType[]>([]);
    const [ tags, setTags ] = useState([ 'Tag 1', 'Tag 2', 'Tag 3' ]);

    const transformToCascaderOptions = (colleges: Colleges): CascaderOption[] =>
    {
        return Object.entries(colleges).map(([ collegeId, { name, majors } ]) => ({
            label: name,
            value: collegeId,
            children: Object.entries(majors).map(([ majorId, majorName ]) => ({
                label: majorName,
                value: majorId,
            })),
        }));
    };

    const options: option[] = transformToCascaderOptions(collegesAndMajors)

    const rewardColumns: ProColumns[] = [
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


    const matchStatusOptions = [
        { value: 0, label: '未开始' },
        { value: 1, label: "报名中" },
        { value: 2, label: '进行中' },
        { value: 3, label: '已结束' },
    ];
    const matchTypeOptions = [
        { value: 'A类', label: 'A类' },
        { value: 'B类', label: 'B类' },
        { value: 'C类', label: 'C类' },
        { value: 'D类', label: 'D类' },
        { value: 'E类', label: 'E类' },
        { value: '未评级', label: '未评级' },
    ];
    const matchLevelOptions = [
        { value: '世界级', label: '世界级' },
        { value: '国家级', label: '国家级' },
        { value: '省级', label: '省级' },
        { value: '校级', label: '校级' },
        { value: '学院级', label: '学院级' },
    ];
    const matchPermissionRuleOptions = [
        {
            value: 0, label: "全部学院"
        },
        {
            value: 1, label: "限制学院",
        }
    ]
    return (
        <ModalForm
            title={defaultValues ? '更新比赛信息' : '添加比赛信息'}
            open={visible}
            // onCancel={onCancle}
            onOpenChange={onOpenChange}
            initialValues={defaultValues}
            onFinish={async (values) =>
            {
                // 这里处理表单提交逻辑，比如调用API添加或更新数据
                if (onFinish)
                {
                    onFinish(values);
                }
            }}
        >
            <ProFormText
                width="md"
                name="matchName"
                label="比赛名称"
                rules={[ { required: true, message: '请输入比赛名称' } ]}
            />

            <ProFormTextArea
                name="matchDesc"
                label="比赛描述"
                rules={[ { required: true, message: '请输入比赛描述' } ]}
            />

            <ProFormSelect
                name="matchStatus"
                label="比赛状态"
                options={matchStatusOptions}
                rules={[ { required: true, message: '请选择比赛状态' } ]}
            />

            <ProFormUploadButton
                expandable={{
                    // 使用 request 请求数据时无效
                    defaultExpandAllRows: true,
                }}
                name="matchPic"
                label="比赛宣传图片(logo)"
                max={1}
                fieldProps={{
                    name: 'file',
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
                }}
                rules={[ { required: true, message: '请上传比赛宣传图片' } ]}
                extra="支持扩展名：.jpg .jpeg .png ...，图片大小不超过1MB"
            />

            <ProForm.Group>
                <ProFormSelect
                    name="matchType"
                    label="比赛类型"
                    options={matchTypeOptions}
                    rules={[ { required: true, message: '请选择比赛类型' } ]}
                />

                <ProFormSelect
                    name="matchLevel"
                    label="比赛等级"
                    options={matchLevelOptions}
                    rules={[ { required: true, message: '请选择比赛等级' } ]}
                />
            </ProForm.Group>

            <ProForm.Item label={"比赛规则"}>
                <ProFormTextArea
                    name="matchRule"
                    label="比赛规则"
                    rules={[ { required: true, message: '请输入比赛规则' } ]}
                />
                <ProFormUploadButton
                    expandable={{
                        // 使用 request 请求数据时无效
                        defaultExpandAllRows: true,
                    }}
                    name="matchPic"
                    label="比赛附件(logo)"
                    max={1}
                    fieldProps={{
                        name: 'file',
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
                    }}
                    rules={[ { required: true, message: '请上传比赛宣传图片' } ]}
                    extra="支持扩展名：.jpg .jpeg .png ...，图片大小不超过1MB"
                />
            </ProForm.Item>

            <ProFormSelect name="matchPermissionRule"
                           label="比赛所允许的分组(学院/部门)"
                           options={matchPermissionRuleOptions}
                           fieldProps={{
                               onChange: () =>
                               {
                                   setRuleTableVisible(!ruleTableVisible)
                               }
                           }}
            />

            {
                ruleTableVisible &&
                <p>
                    <Cascader
                        style={{ width: '100%' }}
                        options={options}
                        onChange={(_: string[][], selectOptions) =>
                        {
                            setSelectPermissionColleges(selectOptions)
                        }}
                        placeholder="请选择需要限制的学院"
                        multiple
                        maxTagCount="responsive"
                    />
                </p>
            }

            <ProForm.Item label={"比赛标签"}>
                <TagComponent tags={tags} setTags={setTags}/>
            </ProForm.Item>


            <EditableProTable<RewardItemType>
                name="matchAward"
                rowKey="id"
                headerTitle="奖品项设置"
                columns={rewardColumns}
                value={rewardItemList}
                onChange={setRewardItem}
                recordCreatorProps={{
                    newRecordType: 'dataSource', // 或者使用 'data' 根据需要
                    position: 'bottom',
                    record: () => ({
                        id: (Math.random() * 1000000).toFixed(0),
                        rewardName: '',
                        rewardContent: '',
                        rewardDesc: '',
                    }),
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) =>
                    {
                        console.log("onSave")
                        console.log(rowKey, data, row);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            <ProForm.Item name="teamSize">
                <InputNumber
                    min={1}
                    max={10}
                    defaultValue={3}
                    // onChange={onChange}
                    addonBefore={<UserOutlined/>} prefix="队伍人数："
                    addonAfter="人"
                    changeOnWheel/>
            </ProForm.Item>

            <ProForm.Group>
                <ProFormDateTimePicker name="startTime" label="比赛开始时间"/>

                <ProFormDateTimePicker name="endTime" label="比赛结束时间"/>
            </ProForm.Group>
        </ModalForm>
    );
};

export default MatchInfoForm;
