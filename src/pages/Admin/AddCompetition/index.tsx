import React, {useState} from 'react';
import {
    EditableProTable,
    PageContainer,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea, ProFormUploadButton
} from "@ant-design/pro-components";
import useStyles from './style.style';
import {Button, Card, Cascader, InputNumber, message, Modal, Upload} from "antd";
import {
    matchLevelOptions,
    matchPermissionRuleOptions,
    matchStatusOptions,
    matchTypeOptions, rewardColumns, UploadFileProps,
} from "@/pages/Admin/AddCompetition/configs";
import {AddMatchTypes} from "@/pages/Admin/AddCompetition/typings";
import {useModel} from "@@/exports";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import TagComponent from "@/pages/Admin/AddCompetition/components/TagComponent";

const getBase64 = (file) =>
    new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const MatchForm: React.FC = () =>
{
    const { styles } = useStyles();

    const [ editableKeys, setEditableRowKeys ] = useState<React.Key[]>([]);
    const [ ruleTableVisible, setRuleTableVisible ] = useState<boolean>(false);
    const [ selectPermissionColleges, setSelectPermissionColleges ] = useState<AddMatchTypes.option[][]>([]);
    const [ rewardItemList, setRewardItem ] = useState<readonly AddMatchTypes.RewardItemType[]>([]);
    const [ tags, setTags ] = useState([ 'Tag 1', 'Tag 2', 'Tag 3' ]);
    const { collegesAndMajors } = useModel('collegesAndMajors');
    const [ previewVisible, setPreviewVisible ] = useState(false);
    const [ previewImage, setPreviewImage ] = useState('');

    const handlePreview = async (file) =>
    {
        if (!file.url && !file.preview)
        {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };
    const transformToCascaderOptions = (colleges: AddMatchTypes.Colleges): AddMatchTypes.CascaderOption[] =>
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

    const options: AddMatchTypes.option[] = transformToCascaderOptions(collegesAndMajors)


    return (
        <PageContainer>
            <ProForm
                title={'添加比赛信息'}
                // open={visible}
                // onCancel={onCancle}
                // onOpenChange={onOpenChange}
                // initialValues={defaultValues}
                onFinish={async (values) =>
                {
                    console.log(values)
                    // 这里处理表单提交逻辑，比如调用API添加或更新数据
                }}
            >
                {/* 基本信息 */}
                <Card title="基本信息" bordered={false} className={styles.card}>
                    <ProFormText name="matchName" label="比赛名称" rules={[ { required: true } ]}/>
                    <ProFormTextArea name="matchDesc" label="比赛描述" rules={[ { required: true } ]}/>
                    <ProFormSelect name="matchStatus" label="比赛状态" options={matchStatusOptions}
                                   rules={[ { required: true } ]}/>
                    <>
                        <ProFormUploadButton
                            name="matchPic"
                            label="比赛宣传图片(logo)"
                            max={1}
                            fieldProps={{
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
                                    return false; // 不自动上传
                                },
                            }}
                            icon={<PlusOutlined/>}
                            accept={'image/jpeg,image/png'}
                            extra="支持扩展名：.jpg .jpeg .png ...，图片大小不超过5MB"
                        />
                        <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage}/>
                        </Modal>
                    </>
                </Card>



                {/* 比赛类型与等级 */}
                <Card title="比赛类型与等级" bordered={false} className={styles.card}>
                    <ProFormSelect name="matchType" label="比赛类型" options={matchTypeOptions}
                                   rules={[ { required: true } ]}/>
                    <ProFormSelect name="matchLevel" label="比赛等级" options={matchLevelOptions}
                                   rules={[ { required: true } ]}/>
                </Card>

                {/* 比赛规则与分组 */}
                <Card title="比赛规则与分组" bordered={false} className={styles.card}>
                    <ProFormTextArea name="matchRule" label="比赛规则"  rules={[ { required: true } ]}/>
                    <ProFormSelect name="matchPermissionRule" label="比赛所允许的分组(学院/部门)"
                                   options={matchPermissionRuleOptions}
                    fieldProps={{
                        onChange: (value: number) =>
                        {
                            return value === 1 ? setRuleTableVisible(true) : setRuleTableVisible(false);
                        }
                    }}/>
                    {
                        ruleTableVisible &&
                        <p>
                            <Cascader
                                style={{ width: '100%' }}
                                options={options}
                                // @ts-ignore
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

                    <Upload {...UploadFileProps}>
                        <Button icon={<UploadOutlined/>}>上传附件</Button>
                    </Upload>


                </Card>

                {/* 奖品设置 */}
                <Card title="奖品设置" bordered={false} className={styles.card}>
                    <EditableProTable<AddMatchTypes.RewardItemType>
                        name="matchAward"
                        rowKey="id"
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
                                rewardCount: 1,
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
                </Card>

                {/* 其他信息 */}
                <Card title="其他信息" bordered={false} className={styles.card}>
                    <ProForm.Item label="比赛标签">
                        <TagComponent tags={tags} setTags={setTags}/>
                    </ProForm.Item>
                    <ProForm.Item name="teamSize" label="设置比赛每个团队人数" tooltip="设置比赛每个团队人数">
                        <InputNumber min={1} max={10} defaultValue={3}/>
                    </ProForm.Item>
                    <ProFormDateRangePicker name="date" label="比赛起止日期"
                                            placeholder={[ '比赛开始日期', '比赛结束日期' ]}/>
                </Card>
            </ProForm>
        </PageContainer>
    );
};

export default MatchForm;
