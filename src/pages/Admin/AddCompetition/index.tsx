import React, {useEffect, useState} from 'react';
import {
    EditableProTable,
    PageContainer,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    ProFormUploadButton
} from "@ant-design/pro-components";
import useStyles from './style.style';
import {Card, Cascader, InputNumber, message, Modal} from "antd";
import {
    DefaultPermissionColleges, demoData,
    generateUploadFileProps,
    generateUploadLogoProps,
    matchLevelOptions,
    matchPermissionRuleOptions,
    matchStatusOptions,
    matchTypeOptions,
    awardColumns
} from "@/pages/Admin/AddCompetition/configs";
import {AddMatchTypes} from "@/pages/Admin/AddCompetition/typings";
import {useModel} from "@@/exports";
import {InboxOutlined, PlusOutlined} from "@ant-design/icons";
import TagComponent from "@/pages/Admin/AddCompetition/components/TagComponent";
import dayjs, {Dayjs} from "dayjs";
import Dragger from 'antd/es/upload/Dragger';
import {RcFile} from "antd/es/upload";
// import 'react-quill/dist/quill.snow.css';
import BraftEditor, {EditorState} from 'braft-editor';
import 'braft-editor/dist/index.css';
import {addMatchInfoUsingPOST} from "@/services/matchService/competitionInfoController";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


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
    const [ selectPermissionColleges, setSelectPermissionColleges ] = useState<AddMatchTypes.option[][]>(
        [ DefaultPermissionColleges ]);
    const [ awardItemList, setRewardItem ] = useState<readonly AddMatchTypes.AwardItemType[]>([]);
    const [ matchTags, setMatchTags ] = useState<string[]>([]);
    const { collegesAndMajors } = useModel('collegesAndMajors');
    const [ previewVisible, setPreviewVisible ] = useState<boolean>(false);
    const [ previewImage, setPreviewImage ] = useState<string>('');
    const [ minTeamSize, setMinTeamSize ] = useState<number>(1);
    const [ maxTeamSize, setMaxTeamSize ] = useState<number>(10);
    // 分别管理报名日期和比赛日期
    const [ signupDateRange, setSignupDateRange ] = useState<[ Dayjs, Dayjs ] | undefined>(undefined);
    const [ matchDateRange, setMatchDateRange ] = useState<[ Dayjs, Dayjs ] | undefined>(undefined);
    // 管理比赛文件附件状态信息
    const [ fileList, setFileList ] = useState<RcFile[]>([])
    const [ logoFileList, setLogoFileList ] = useState<RcFile[]>([]);
    const [ submitting, setSubmitting ] = useState(false); // 提交状态
    const [ matchDescText, setMatchDescText ] = useState<EditorState>(BraftEditor.createEditorState(null));
    const [ matchRuleText, setMatchRuleText ] = useState<EditorState>(BraftEditor.createEditorState(null));
    // 表单配置
    const [ form ] = ProForm.useForm()


    useEffect(() =>
    {
        const defaultData = demoData
        // 加载默认数据到状态和表单
        const loadData = () =>
        {
            // 转换和设置默认值
            setSelectPermissionColleges(defaultData.matchPermissionRule);
            setRewardItem(defaultData.matchAward);
            setMatchTags(defaultData.matchTags);
            setSignupDateRange([ dayjs(defaultData.signupDate[0]), dayjs(defaultData.signupDate[1]) ]);
            setMatchDateRange([ dayjs(defaultData.matchDate[0]), dayjs(defaultData.matchDate[1]) ]);
            setMatchDescText(BraftEditor.createEditorState(defaultData.matchDesc));
            setMatchRuleText(BraftEditor.createEditorState(defaultData.matchRule));
            setLogoFileList(defaultData.matchLogo);
            setMinTeamSize(defaultData.minTeamSize);
            setMaxTeamSize(defaultData.maxTeamSize);

            // 设置表单字段的默认值
            form.setFieldsValue({
                matchName: defaultData.matchName,
                matchStatus: defaultData.matchStatus,
                matchType: defaultData.matchType,
                matchLevel: defaultData.matchLevel,
                matchDesc: BraftEditor.createEditorState(defaultData.matchDesc), // 注意这里的转换
                matchRule: BraftEditor.createEditorState(defaultData.matchRule), // 注意这里的转换
                matchTags: defaultData.matchTags,
                signupDate: [ dayjs(defaultData.signupDate[0]), dayjs(defaultData.signupDate[1]) ],
                matchDate: [ dayjs(defaultData.matchDate[0]), dayjs(defaultData.matchDate[1]) ],
                minTeamSize: defaultData.minTeamSize,
                maxTeamSize: defaultData.maxTeamSize,
                // 注意，文件列表和富文本字段可能需要特殊处理
            });
        };

        loadData();
    }, [ form ]);


    // 抽离的校验逻辑
    const validateDates = (signupDateRange: [ Dayjs, Dayjs ] | undefined, matchDateRange: [ Dayjs, Dayjs ] | undefined) =>
    {
        // 检查两个日期都不为空
        if (!signupDateRange || !matchDateRange)
        {
            message.error('报名日期和比赛日期都不能为空');
            return false;
        }

        const [ signupStart, signupEnd ] = signupDateRange;
        const [ matchStart, matchEnd ] = matchDateRange;

        // 检查报名日期是否早于或等于比赛日期
        if (signupEnd.isAfter(matchStart))
        {
            message.error('报名日期必须早于或等于比赛日期');
            return false;
        }

        // 所有校验通过
        return true;
    };

    const handleMinTeamSizeChange = (value) =>
    {
        setMinTeamSize(value);
        if (value >= maxTeamSize)
        {
            setMaxTeamSize(value + 1);
        }
    };

    const handleMaxTeamSizeChange = (value) =>
    {
        setMaxTeamSize(value);
    };
    const handlePreview = async (file) =>
    {
        if (!file.url && !file.preview)
        {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };
    const transformToCascadesOptions = (colleges: AddMatchTypes.Colleges): AddMatchTypes.CascaderOption[] =>
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

    const options: AddMatchTypes.option[] = transformToCascadesOptions(collegesAndMajors)

    const onFinish = async (values: Record<string, any>) =>
    {
        if (!validateDates(signupDateRange, matchDateRange))
        {
            return;
        }
        if (awardItemList.length === 0)
        {
            message.error('奖项设置不能为空')
            return
        }
        if (!(logoFileList.length > 0))
        {
            message.error('请上传logo')
            return
        }


        awardItemList.forEach((item) =>
        {
            if (item.awardDesc === '' || item.awardName === '' || item.awardContent === '')
            {
                message.info('请填写完整奖项设置或保存奖项设置')
                return
            }
        })
        const matchLogo = logoFileList[0]?.thumbUrl || null
        const finalValues: Record<string, any> = {
            ...values,
            matchLogo: logoFileList[0]?.thumbUrl || null,
            hasFileList: fileList.length > 0,
            matchTags: matchTags,
            matchAward: awardItemList,
            matchPermissionRule: selectPermissionColleges,
            signupDate: signupDateRange,
            matchDate: matchDateRange,
            maxTeamSize: maxTeamSize,
            minTeamSize: minTeamSize,
        }

        setSubmitting(true); // 开始提交状态
        // 提交表单
        message.loading({ content: '提交中...', key: 'submitting' });
        try
        {
            const { data, code } = await addMatchInfoUsingPOST({
                ...finalValues
            })
            if (code === 0 && data)
            {
                message.success({ content: '添加成功', key: 'submitting' });
            }
            else
            {
                message.error({ content: '添加失败', key: 'submitting' });
            }
        }
        catch (e)
        {
            console.error('提交错误', error);
            message.error({ content: '提交异常', key: 'submitting' });
        }
        finally
        {
            setSubmitting(false); // 提交完成
        }
    }
    return (
        <PageContainer>
            <ProForm
                form={form}
                title={'添加比赛信息'}
                onFinish={onFinish}
                submitter={{
                    submitButtonProps: {
                        loading: submitting, // 控制提交按钮的加载状态
                    },
                }}
            >
                {/* 基本信息 */}
                <Card title="基本信息" bordered={false} className={styles.card}>
                    <ProFormText name="matchName" label="比赛名称" rules={[ { required: true } ]}/>
                    <ProForm.Item
                        label={"比赛描述"}
                        name={"matchDesc"}
                        getValueFromEvent={(editorState) =>
                        {
                            return editorState.toText();
                        }}
                        rules={[ {
                            validator: (_, value) =>
                            {
                                if (!value || value.length < 20)
                                {
                                    return Promise.reject(new Error('比赛描述不能少于20个字'));
                                }
                                return Promise.resolve();
                            },
                        } ]}
                        required
                    >
                        <BraftEditor
                            className={styles.editor}
                            value={matchDescText}
                            onChange={(newEditorState) => (setMatchDescText(newEditorState))}
                        />
                    </ProForm.Item>
                    <ProFormSelect name="matchStatus" label="比赛状态" options={matchStatusOptions}
                                   rules={[ { required: true } ]}/>
                    <>
                        <ProFormUploadButton
                            required={true}
                            name="matchLogo"
                            label="比赛宣传海报/logo"
                            max={1}
                            tooltip={"建议尺寸：120*120, 将用于首页宣传"}
                            fieldProps={generateUploadLogoProps(logoFileList, setLogoFileList, handlePreview)}
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
                    <ProForm.Item
                        required
                        label="比赛规则"
                        name={"matchRule"}
                        getValueFromEvent={(editorState) =>
                        {
                            return editorState.toText();
                        }}
                        rules={[ {
                            validator: (_, value) =>
                            {
                                if (!value || value.length < 20)
                                {
                                    return Promise.reject(new Error('比赛规则描述不能少于20个字'));
                                }
                                return Promise.resolve();
                            },
                        } ]}
                    >
                        <BraftEditor
                            className={styles.editor}
                            value={matchRuleText}
                            onChange={(newEditorState) => (setMatchRuleText(newEditorState))}
                        />
                    </ProForm.Item>

                    <ProForm.Item
                        name={"matchFileList"}
                        label={"比赛相关附件"}
                        getValueFromEvent={() => (fileList)}>
                        <Dragger {...generateUploadFileProps(fileList, setFileList)}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">上传比赛附件</p>
                            <p className="ant-upload-hint">
                                用于比赛规则、比赛流程、比赛奖项、比赛介绍等内容的附件。<br/>
                                支持单个或批量上传附件，拖拽上传。上传单个文件大小不超过20M，最多上传20个文件。
                            </p>
                        </Dragger>
                    </ProForm.Item>

                    <ProFormSelect required name="matchPermissionRule" label="允许参加的(学院/专业)"
                                   options={matchPermissionRuleOptions}
                                   tooltip={"设置'限制学院'以后，被限制的学院/专业不允许参加比赛"}
                                   fieldProps={{
                                       onChange: (value: number) =>
                                       {
                                           // 限制学院
                                           if (value === 1)
                                           {
                                               setRuleTableVisible(true);
                                           }
                                           else
                                           {
                                               // 切换到全部学院都可以参加
                                               // 需要清空学院的选择
                                               setSelectPermissionColleges([])
                                               setSelectPermissionColleges([ DefaultPermissionColleges ])
                                               setRuleTableVisible(false);
                                           }
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

                </Card>

                {/* 奖品设置 */}
                <Card title="奖品设置" bordered={false} className={styles.card}>
                    <EditableProTable<AddMatchTypes.AwardItemType>
                        rowKey="id"
                        columns={awardColumns}
                        value={awardItemList}
                        onChange={setRewardItem}
                        recordCreatorProps={{
                            newRecordType: 'dataSource',
                            position: 'bottom',
                            record: () => ({
                                id: (Math.random() * 1000000).toFixed(0),
                                awardName: '',
                                awardContent: '',
                                awardDesc: '',
                                awardCount: 1,
                            }),

                        }}
                        editable={{
                            type: 'multiple',
                            editableKeys,
                            onSave: async (rowKey, data, row) =>
                            {
                                console.log("onSave")
                                console.log(rowKey, data, row);
                                console.log(editableKeys)
                            },
                            onChange: setEditableRowKeys,
                        }}
                    />
                </Card>

                {/* 其他信息 */}
                <Card title="其他信息" bordered={false} className={styles.card}>
                    <ProForm.Item
                        label="比赛标签"
                        name={'matchTags'}
                        shouldUpdate={(prevValues, currentValues) => prevValues.matchTags !== currentValues.matchTags}

                    >
                        <TagComponent tags={matchTags} setTags={setMatchTags}/>
                    </ProForm.Item>
                    <ProForm.Item label="团队人数范围" tooltip="设置比赛每个团队的人数范围">
                        <ProForm.Group>
                            <ProForm.Item name="minTeamSize" noStyle>
                                <InputNumber
                                    min={1}
                                    max={maxTeamSize - 1}
                                    value={minTeamSize}
                                    onChange={handleMinTeamSizeChange}
                                    addonBefore="最少"
                                    addonAfter="人"
                                />
                            </ProForm.Item>
                            <ProForm.Item name="maxTeamSize" noStyle>
                                <InputNumber
                                    min={minTeamSize + 1}
                                    max={10}
                                    value={maxTeamSize}
                                    onChange={handleMaxTeamSizeChange}
                                    addonBefore="最多"
                                    addonAfter="人"
                                />
                            </ProForm.Item>
                        </ProForm.Group>
                    </ProForm.Item>
                    {/* 报名日期 */}
                    <ProFormDateRangePicker
                        name="signupDate"
                        label="报名起止日期"
                        tooltip={"比赛正式报名开始时间与结束时间，如果已经结束报名了，则以实际开始结束时间为准"}
                        rules={[ { required: true, message: '请选择报名起止日期' } ]}
                        fieldProps={{
                            onChange: (dates: Dayjs[], dateString: string) =>
                            {
                                if (!dates)
                                {
                                    setSignupDateRange(undefined);
                                    return;
                                }

                                const [ start, end ] = dates.map(date => dayjs(date));
                                // 校验报名日期是否在比赛日期之前
                                if (matchDateRange && (start.isAfter(matchDateRange[0]) || end.isAfter(
                                    matchDateRange[0])))
                                {
                                    message.error('报名日期必须早于或等于比赛日期');
                                }
                                else
                                {
                                    setSignupDateRange([ start, end ]);
                                }
                            },

                        }}
                    />

                    {/* 比赛日期 */}
                    <ProFormDateRangePicker
                        name="matchDate"
                        tooltip={"比赛正式开始时间与结束时间，如果已经结束了，则以实际开始结束时间为准"}
                        label="比赛起止日期"
                        rules={[ { required: true, message: '请选择比赛起止日期' } ]}
                        fieldProps={{
                            onChange: (dates: Dayjs[], dateString: string) =>
                            {
                                if (!dates)
                                {
                                    setMatchDateRange(undefined);
                                    return;
                                }

                                const [ start, end ] = dates.map(date => dayjs(date));
                                // 校验比赛日期是否早于报名日期
                                if (signupDateRange && (start.isBefore(signupDateRange[0]) || start.isBefore(
                                    signupDateRange[1])))
                                {
                                    message.error('比赛日期必须晚于或等于报名日期');
                                }
                                else
                                {
                                    setMatchDateRange([ start, end ]);
                                }
                            },
                        }}
                    />
                </Card>
            </ProForm>
        </PageContainer>
    );
};

export default MatchForm;
