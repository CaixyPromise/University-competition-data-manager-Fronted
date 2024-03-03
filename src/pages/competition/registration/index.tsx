import {
    PageContainer,
    ProForm,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
} from '@ant-design/pro-components';
import type {FormInstance} from 'antd';
import {Button, Card, Descriptions, Divider, message, Result, Space, Switch, Tooltip} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import type {StepDataType, StepDataTypeTwo} from './data.d';
import {StepDataTypeOne} from "./data.d";
import useStyles from './style.style';
import {useNavigate, useParams} from "@@/exports";
import {getRegistrationInfoUsingPOST} from "@/services/matchService/competitionInfoController";
import {UserOutlined} from "@ant-design/icons";
import {SearchUserInput, UserValue} from "@/components/SearchUserInput";
import {searchUserByUserNameAndAccountUsingPOST} from "@/services/userService/userController";
import {addTeamUsingPOST} from "@/services/teamService/teamController";

const StepDescriptions: React.FC<{
    stepData: StepDataType;
    bordered?: boolean;
    column?: number
}> = ({ stepData, bordered, column }) =>
{
    if (!stepData || Object.keys(stepData).length === 0)
    {
        return <></>
    }
    return (
        <div
            style={{
                marginLeft: "100px"
            }}
        >
            <Descriptions column={column} bordered={bordered}>
                <Descriptions.Item label="比赛ID"> {stepData.matchId}</Descriptions.Item>
                <Descriptions.Item label="比赛名称"> {stepData.matchName}</Descriptions.Item>
                <Descriptions.Item label="报名大项"> {stepData.matchGroupName}</Descriptions.Item>
                <Descriptions.Item label="报名子项">{stepData.matchSportName}</Descriptions.Item>
                <Descriptions.Item label="团队人数">{stepData.matchTeamSize}</Descriptions.Item>
                <Descriptions.Item label="团队是否公开"><Tooltip
                    title="公开团队将在队伍中心里公开招募队员">{stepData.teamIsPublic ? "是" :
                    "否"}</Tooltip></Descriptions.Item>
                {stepData.teamIsPublic && stepData.teamPassword &&
                    <Descriptions.Item label="团队密码">{stepData.teamPassword}</Descriptions.Item>
                }
                {
                    stepData.teammates?.length !== 0 &&
                    <Descriptions.Item label="团队成员信息">{stepData.teammates?.map(
                        item => item.label)}</Descriptions.Item>
                }
                {
                    stepData.teachers?.length !== 0 &&
                    <Descriptions.Item label="团队指导老师信息">{stepData.teachers?.map(
                        item => item.label)}</Descriptions.Item>
                }
            </Descriptions>
        </div>
    );
};
const StepResult: React.FC<{
    onFinish: () => Promise<void>;
    children?: React.ReactNode;
}> = (props) =>
{
    const { styles } = useStyles();
    return (
        <Result
            status="success"
            title="操作成功"
            subTitle="预计两小时内到账"
            extra={
                <>
                    <Button type="primary" onClick={props.onFinish}>
                        查看我的队伍
                    </Button>
                    <Button>去团队中心看看</Button>
                </>
            }
            className={styles.result}
        >
            {props.children}
        </Result>
    );
};

interface MatchData
{
    id: string;
    index: number;
    parentGroupName: string;
    permission: any[];
    maxTeamNum: number;
    decs: string;
    children?: MatchData[];
}

interface TreeData
{
    title: string;
    value: string;
    children?: TreeData[];
}

const StepForm: React.FC<Record<string, any>> = () =>
{
    const { styles } = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();

    const [ stepRuleData, setStepRuleData ] = useState<API.MatchRegistrationVO>({});
    const [ selectGroupType, setSelectGroupType ] = useState<{
        label?: string,
        value?: string
    }>({});
    const [ sportSelectAble, setSportSelectAble ] = useState<boolean>(true)
    const [ selectSportType, setSelectSportType ] = useState({});
    const [ stepData, setStepData ] = useState<StepDataType>({
        teamIsPublic: false
    });
    const [ current, setCurrent ] = useState(0);
    const formRef = useRef<FormInstance>();
    const [ searchStudentUserValue, setSearchStudentUserValue ] = useState<UserValue[]>([]);
    const [ searchTeacherUserValue, setSearchTeacherUserValue ] = useState<UserValue[]>([]);
    const [ permissionIds, setPermissionIds ] = useState<string[]>([]);
    const [ inputPasswordVisible, setInputPasswordVisible ] = useState<boolean>(false);
    const [ needPassword, setNeedPassword ] = useState<boolean>(true);
    const [ statusCode, setStatusCode ] = useState<number>(0);
    const loadData = async () =>
    {
        if (!id)
        {
            message.error("参数错误");
            navigate('/');
            return;
        }
        const { data, code, status } = await getRegistrationInfoUsingPOST(id);
        if (code === 0 && data)
        {
            setStepRuleData(data);
        }
        if (status !== undefined && status !== 200)
        {
            message.error("获取数据失败, 请检查网络设置");
            navigate("/");
            return;
        }
    };

    useEffect(() =>
    {
        loadData();
    }, [ id ]);

    useEffect(() =>
    {
        // 定义一个函数来根据当前状态计算状态码
        const calculateStatusCode = () =>
        {
            if (stepData.teamIsPublic)
            {
                return needPassword ? 2 : 0;
            }
            return 1;
        };

        // 调用calculateStatusCode函数来更新状态码
        setStatusCode(calculateStatusCode());
    }, [ stepData.teamIsPublic, needPassword ]);

    const findGroupAndEventNames = (groupData, values) =>
    {
        let groupName = "";
        let sportName = "";

        const group = groupData.find(g => g.id === values.groupId);
        if (group)
        {
            groupName = group.parentGroupName;
            const event = group.children?.find(e => e.id === values.eventId);
            if (event)
            {
                sportName = event.parentGroupName;
            }
        }

        return { groupName, sportName };
    }
    const extractPermissionIds = (groupData, value): string[] =>
    {
        let permissionIds: string[] = [];

        // Find the specified group and event
        const group = groupData.find(group => group.id === value.groupId);
        const event = group?.children?.find(event => event.id === value.eventId);

        // Extract permission IDs from the group
        group?.permission.flat().forEach(permissionGroup =>
        {
            permissionGroup.children?.forEach(child =>
            {
                permissionIds.push(child.value); // Assuming you want the children's values
            });
        });

        // Extract permission IDs from the event
        event?.permission.flat().forEach(permissionGroup =>
        {
            permissionGroup.children?.forEach(child =>
            {
                permissionIds.push(child.value); // Assuming you want the children's values
            });
        });

        // Remove duplicates
        return [ ...new Set(permissionIds) ];
    }

    async function fetchUserList(username: string, role: "student" | "teacher" | "admin"): Promise<UserValue[]>
    {
        if (username === undefined || username.length === 0)
        {
            return [];
        }
        try
        {
            const { data, code } = await searchUserByUserNameAndAccountUsingPOST({
                userRole: role,
                useKeyword: username,
                userPermissionIds: permissionIds
                // userMajorIds
            })
            if (data && code === 0)
            {
                const result: UserValue[] = []
                data.forEach((item) =>
                {
                    result.push({
                        label: `${item.userName}/${item.userAccount}/${item.userDepartment}/${item.userMajor}`,
                        value: item.userId
                    })
                })
                return result;
            }
            return []
        }
        catch (error)
        {
            return []
        }

        // return fetch('https://randomuser.me/api/?results=5')
        //     .then((response) => response.json())
        //     .then((body) =>
        //         body.results.map(
        //             (user: { name: { first: string; last: string }; login: { username: string } }) => ({
        //                 label: `${user.name.first} ${user.name.last}`,
        //                 value: user.login.username,
        //             }),
        //         ),
        //     );
    }

    const getStatusCode = () =>
    {
        if (stepData.teamIsPublic)
        {
            if (needPassword)
            {
                return 2;
            }
            return 0;
        }
        return 1;
    }
    return (
        <PageContainer content="正在创建比赛队伍中...">
            <Card bordered={false}>
                <StepsForm
                    current={current}
                    onCurrentChange={setCurrent}
                    submitter={{
                        render: (props, dom) =>
                        {
                            // 如果是第三步，函数返回 null，意味着在第三步不渲染任何提交按钮。
                            // 对于前两步，函数返回 dom，即默认的提交按钮
                            if (props.step === 3)
                            {
                                return null;
                            }
                            return dom;
                        },
                    }}
                >
                    <StepsForm.StepForm<StepDataTypeOne>
                        formRef={formRef}
                        title="填写队伍信息"
                        initialValues={stepData}
                        onFinish={async (values) =>
                        {
                            console.log(values)
                            console.log(stepRuleData.groupData)
                            const resultIds = extractPermissionIds(stepRuleData.groupData, values);
                            const { groupName, sportName } = findGroupAndEventNames(stepRuleData.groupData, values)
                            setPermissionIds(resultIds)
                            console.log("values.teamName: ", values.teamName)
                            setStepData(prevState =>
                            {
                                return {
                                    ...prevState,
                                    matchId: stepRuleData.id,
                                    matchName: stepRuleData.matchName,
                                    matchEventId: values.eventId,
                                    matchCategoryId: values.groupId,
                                    matchGroupName: groupName,
                                    matchSportName: sportName,
                                    teamName: values.teamName,
                                    teamDescription: values.teamDescription
                                }
                            });
                            return true;
                        }}
                    >
                        <ProFormText disabled={true} label={"比赛id"} name={"matchId"}
                                     fieldProps={{
                                         value: id,
                                     }}
                        />
                        <ProFormText disabled={true} label={"比赛名称"}
                                     fieldProps={{
                                         value: stepRuleData.matchName
                                     }}
                        />
                        <ProFormText label={"队伍名称"}
                                     name={"teamName"}
                                     placeholder="请输入队伍名称，不超过20个字符"
                                     rules={[ { required: true, message: '请输入队伍名称' },
                                         { max: 20, message: '队伍名称不超过20个字符' },
                                         {
                                             validator: async (_, value) =>
                                             {
                                                 if (!value)
                                                 {
                                                     return Promise.reject(new Error('请输入队伍名称'))
                                                 }
                                                 if (value.length === 0)
                                                 {
                                                     return Promise.reject(new Error('请输入队伍名称'))
                                                 }
                                                 else if (value.length > 20)
                                                 {
                                                     return Promise.reject(new Error('队伍名称不超过20个字符'))
                                                 }
                                             }
                                         } ]}
                        />
                        <ProFormTextArea label={"队伍介绍"}
                                         name={"teamDescription"}
                                         placeholder={"请输入队伍介绍，不超过100个字符"}
                                         rules={[ { max: 100, message: '队伍介绍不超过100个字符' },
                                             {
                                                 validator: async (_, value) =>
                                                 {
                                                     if (!value)
                                                     {
                                                         return Promise.resolve()
                                                     }
                                                     if (value.length > 100)
                                                     {
                                                         return Promise.reject(new Error('队伍介绍不超过100个字符'))
                                                     }
                                                 }
                                             } ]}
                        />
                        <ProFormSelect
                            label={"报名的大项"}
                            name={"groupId"}
                            rules={[ { required: true, message: '请选择报名的大项' } ]}

                            onChange={(_, value) =>
                            {
                                setSelectGroupType({
                                    label: value.label,
                                    value: value.value
                                })
                                setSportSelectAble(false);
                                formRef.current?.setFieldsValue({ eventId: undefined });
                            }}
                            options={stepRuleData.groupData?.map(item => ({
                                label: item.parentGroupName, // 显示在下拉菜单中的选项文本
                                value: item.id, // 选项的实际值
                            }))}
                        />
                        <ProFormSelect
                            label={"报名的小项"}
                            name={"eventId"}
                            disabled={sportSelectAble}
                            rules={[ { required: true, message: '请选择报名的小项' } ]}
                            options={
                                stepRuleData.groupData?.find(item => item.id === selectGroupType.value)?.children?.map(
                                    subItem => ({
                                        label: subItem.parentGroupName, // 这里假设小项也有parentGroupName属性
                                        value: subItem.id, // 小项的ID
                                    })) || []
                            }
                        />
                    </StepsForm.StepForm>


                    <StepsForm.StepForm
                        title="填写队伍信息"
                        onFinish={async (values: StepDataTypeTwo) =>
                        {
                            setStepData(prevState =>
                            {
                                return {
                                    ...prevState,
                                    teamIsPublic: values.isPublic,
                                    matchTeamSize: values.teamSize,
                                    teammates: searchStudentUserValue.map(
                                        item => ({ label: item.label, value: item.value })),
                                    teachers: searchTeacherUserValue.map(
                                        item => ({ label: item.label, value: item.value })),
                                    teamPassword: values.password,
                                }
                            })
                            console.log(values)
                            setStatusCode(getStatusCode());

                            return true;
                        }}>
                        <ProFormDigit
                            label={`设置队伍人数`}
                            name="teamSize"
                            tooltip={`最多为${stepRuleData.maxTeamSize}, 最少为${stepRuleData.minTeamSize}`}
                            min={stepRuleData.minTeamSize}
                            max={stepRuleData.maxTeamSize}
                            required={true}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入队伍人数',
                                },
                                {
                                    validator: async (_, value) =>
                                    {
                                        if (value < stepRuleData.minTeamSize)
                                        {
                                            return Promise.reject(
                                                new Error(`队伍人数不能少于${stepRuleData.minTeamSize}`));
                                        }
                                        if (value > stepRuleData.maxTeamSize)
                                        {
                                            return Promise.reject(
                                                new Error(`队伍人数不能多于${stepRuleData.maxTeamSize}`));
                                        }
                                    },
                                },
                            ]}
                            fieldProps={{
                                addonBefore: <UserOutlined/>,
                                addonAfter: "人",
                                prefix: "团队人数",
                            }}
                        />
                        <ProFormSelect
                            label={"队伍是否公开"}
                            name={"isPublic"}
                            required={true}
                            onChange={(value) =>
                            {
                                if (value === 1)
                                {
                                    setInputPasswordVisible(true)
                                }
                                else
                                {
                                    setInputPasswordVisible(false)

                                }
                            }}
                            options={[ { label: "公开", value: 1 }, { label: "不公开", value: 0 } ]}
                        />
                        {
                            inputPasswordVisible &&
                            <Space direction="horizontal">
                                <ProFormText.Password
                                    width={"md"}
                                    name={"password"}
                                    label={"密码"}
                                    required={needPassword}
                                    rules={[ {
                                        validator: (_, value) =>
                                        {
                                            if (inputPasswordVisible && needPassword && !value)
                                            {
                                                return Promise.reject(new Error('请输入密码'));
                                            }
                                            return Promise.resolve();
                                        }
                                    } ]}
                                    disabled={!needPassword}
                                />
                                <Switch defaultChecked={needPassword}
                                        onChange={setNeedPassword}
                                        checkedChildren={"需要密码"}
                                        unCheckedChildren={"不需要密码"}
                                />
                            </Space>
                        }
                        <ProForm.Item label={"请输入队员信息"}
                                      tooltip={`请输入队员信息，默认创建人为队长, 队员人数最多为: ${stepRuleData.maxTeamSize}`}>
                            <SearchUserInput
                                placeholder={"请输入要查找的用户信息: 学号/姓名"}
                                fetchOptions={(text) => fetchUserList(text, "student")}
                                value={searchStudentUserValue}
                                setValue={setSearchStudentUserValue}
                                maxCount={stepRuleData.maxTeamSize as number}
                            />
                        </ProForm.Item>
                        <ProForm.Item label={"请输入队员信息"}
                                      tooltip={`请输入队伍指导老师信息，默认第一位为第一指导老师, 指导老师人数最多为: ${stepRuleData.maxTeacherSize}`}>
                            <SearchUserInput
                                placeholder={"请输入要查找的指导老师信息: 工号/姓名"}
                                fetchOptions={(text) => fetchUserList(text, "admin")}
                                value={searchTeacherUserValue}
                                setValue={setSearchTeacherUserValue}
                                maxCount={stepRuleData.maxTeacherSize as number}
                            />
                        </ProForm.Item>
                    </StepsForm.StepForm>

                    <StepsForm.StepForm title="确认信息"
                                        onFinish={async () =>
                                        {
                                            console.log(stepData)
                                            console.log(statusCode);
                                            try
                                            {
                                                const { data, code } = await addTeamUsingPOST({
                                                    matchCategoryId: stepData.matchCategoryId,
                                                    matchEventId: stepData.matchEventId,
                                                    matchId: stepRuleData.id,
                                                    teammates: stepData.teammates?.map(item => item.value),
                                                    teamDescription: stepData.teamDescription,
                                                    teamPassword: stepData.teamPassword,
                                                    teamStatus: statusCode,
                                                    teamName: stepData.teamName,
                                                    teachers: stepData.teachers?.map(item => item.value),
                                                    teamMaxSize: stepRuleData.maxTeamSize,
                                                })
                                                if (code === 0 && data)
                                                {
                                                    message.success('创建成功')
                                                    return true;
                                                }
                                            }
                                            catch (e: any)
                                            {
                                                message.error("创建失败" + e.message)
                                                return false
                                            }
                                        }}
                    >
                        <ProForm.Item>
                            <StepDescriptions stepData={stepData}/>
                        </ProForm.Item>
                    </StepsForm.StepForm>

                    <StepsForm.StepForm title="完成">
                        <StepResult
                            onFinish={async () =>
                            {
                                setCurrent(0);
                                formRef.current?.resetFields();
                            }}
                        >
                            <div>
                                <h3 style={{ marginLeft: "120px" }}>队伍创建成功，信息如下: </h3>
                            </div>
                            <StepDescriptions stepData={stepData} column={1}/>
                        </StepResult>
                    </StepsForm.StepForm>
                </StepsForm>

                <Divider
                    style={{
                        margin: '40px 0 24px',
                    }}
                />
                <div>
                    <h2>说明</h2>
                    <h3>关于团队人数说明</h3>
                    <ul>

                        <li>1. 团队队员(包括队长)最大人数为<span
                            style={{ color: "red" }}>{stepRuleData.maxTeamSize}</span>人,
                            最少为<span style={{ color: "red" }}>{stepRuleData.minTeamSize}</span>人<br/></li>
                        <li>2. 团队指导老师最大人数为<span style={{ color: "red" }}>{stepRuleData.maxTeacherSize}</span>人,
                            最少为<span style={{ color: "red" }}>{stepRuleData.minTeacherSize}</span>人,
                        </li>
                        <li>3. 如果人数不足时将无法报名成功，队伍会进入
                            <span style={{ color: "red" }}>待定</span>状态。
                            比赛报名结束时，如果团队仍为<span style={{ color: "red" }}>待定</span>状态，视为弃权。<br/>
                        </li>
                        <li>4. 当队伍公开且人数不足时，队伍将进入团队中心招募队员 的状态，直到人数满足为止。</li>
                        <li>5. 当队伍不公开时，只有队长邀请或分享链接才能 加入队伍</li>
                        <li>6. 一个比赛，一个队长有且只能创建一只队伍</li>
                    </ul>
                    <h3>团队人数不足？</h3>
                    <p>
                        团队人数不足无法报名时，您可以使用团队匹配功能招募队友; <br/>
                        或是在团队中心中找到<span style={{ color: "red" }}>待定</span>状态的队伍，分享并邀请
                        其他同学加入您的队伍。
                    </p>
                </div>
            </Card>

        </PageContainer>
    );
};
export default StepForm;
