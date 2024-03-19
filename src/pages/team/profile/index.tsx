import {DownOutlined,} from '@ant-design/icons';
import {
    GridContent,
    PageContainer,
    ProForm,
    ProFormInstance,
    ProFormText,
    RouteContext
} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import {
    Button,
    Card,
    Descriptions,
    Dropdown,
    Empty,
    message,
    Modal,
    Space,
    Spin,
    Statistic,
    Table,
    Typography,
} from 'antd';
import type {FC} from 'react';
import React, {useEffect, useRef, useState} from 'react';
import useStyles from './style.style';
import {useParams} from "@@/exports";
import dayjs from "dayjs";
import {
    getTeamByIdUsingGET, handleRejectJoinTeamUsingPOST,
    handleResolveJoinTeamUsingPOST,
    joinTeamUsingPOST
} from "@/services/teamService/teamController";
import PrettyTag from "@/components/PrettyTag";
import {teacherInfoColumn, userApplyColumn, userInfoColumn} from "@/pages/team/profile/data.d";
import {UNIMPLEMENTED} from "@/utils/functional";
import {record} from "@umijs/utils/compiled/zod";
import {signUpRaceUsingPOST} from "@/services/matchService/registrationController";

const ButtonGroup = Button.Group;


type AdvancedState = {
    operationKey: 'tab1' | 'tab2' | 'tab3';
    tabActiveKey: string;
};

const getUserActions = (isLeader, isMember, isApply, data, id) =>
{
    if (isLeader)
    {
        return (
            <RouteContext.Consumer>
                {({ isMobile }) =>
                {
                    const items = [
                        { key: 'dissolve', label: '解散团队', onClick: UNIMPLEMENTED },
                        { key: 'share', label: '分享队伍链接', onClick: UNIMPLEMENTED },
                    ];
                    if (isMobile)
                    {
                        return (
                            <Dropdown.Button
                                type="primary"
                                icon={<DownOutlined/>}
                                overlay={<Menu items={UNIMPLEMENTED}/>}
                                placement="bottomRight"
                            >
                                报名比赛
                            </Dropdown.Button>
                        );
                    }
                    return (
                        <Space>
                            <ButtonGroup>
                                <Button onClick={UNIMPLEMENTED}>解散团队</Button>
                                <Button onClick={UNIMPLEMENTED}>分享队伍链接</Button>
                            </ButtonGroup>
                            <Button type="primary" onClick={async () =>
                            {
                                const response = await signUpRaceUsingPOST({
                                    raceId: data.raceId,
                                    teamId: id
                                })
                                if (response.code === 0 && response.data)
                                {
                                    message.success("报名成功");
                                    return;
                                }
                                else
                                {
                                    message.error(`报名失败: ${response.message}`);
                                }
                            }}>团队报名</Button>
                        </Space>
                    );
                }}
            </RouteContext.Consumer>
        );
    }
    else if (isMember)
    {
        return (
            <RouteContext.Consumer>
                {({ isMobile }) =>
                {
                    const items = [
                        { key: 'leave', label: '退出队伍', onClick: UNIMPLEMENTED },
                    ];
                    if (isMobile)
                    {
                        return (
                            <Dropdown.Button
                                type="primary"
                                icon={<DownOutlined/>}
                                overlay={<Menu items={items}/>}
                                placement="bottomRight"
                            >
                                分享队伍链接
                            </Dropdown.Button>
                        );
                    }
                    return (
                        <Space>
                            <Button onClick={UNIMPLEMENTED}>退出队伍</Button>
                            <Button type="primary" onClick={UNIMPLEMENTED}>分享队伍链接</Button>
                        </Space>
                    );
                }}
            </RouteContext.Consumer>
        );
    }
    else if (isApply)
    {
        return <Button type="primary" onClick={UNIMPLEMENTED}>分享队伍链接</Button>;
    }
    return null; // 当不是队长、成员或申请状态时，不显示按钮
};
const Advanced: FC = () =>
{
    const { styles } = useStyles();
    const { id } = useParams();
    const [ data, setData ] = useState<API.TeamInfoVO>({});
    const [ loading, setLoading ] = useState<boolean>(true)
    const { Title, Paragraph } = Typography
    const [ passwordModal, setPasswordModal ] = useState<boolean>(false);
    const formRef = useRef<
        ProFormInstance<{
            userPassword: string;
        }>
    >();

    const tryApply = async () =>
    {
        const password = formRef?.current?.getFieldValue('userPassword');
        if (data.needPassword && password.length === 0)
        {
            message.error('请输入密码');
            return;
        }
        message.success("申请成功")
        const response = await joinTeamUsingPOST({
            password: password,
            raceId: data.raceId,
            teamId: id
        })
        if (response.code === 0 && response.data === true)
        {
            message.success("申请成功，请耐心等待审核结果吧~");
        }
        else
        {
            message.error(`申请失败，失败原因: ${response.message}`)
        }

        if (passwordModal)
        {
            setPasswordModal(false);
        }
    }

    const action = (isLeader: string, isMember: string, isApply: string, data: API.TeamInfoVO, id: string) =>
    {
        return getUserActions(isLeader, isMember, isApply, data, id);
    };

    const fetchData = async () =>
    {
        console.log("id is: ", id)
        if (!id)
        {
            history.push("/");
            message.error("错误的操作!!");
            return;
        }
        try
        {
            setLoading(true)
            const { data, code } = await getTeamByIdUsingGET({
                teamId: id
            })
            if (code === 0 && data)
            {
                setData(data)
            }
        }
        catch (e: any)
        {
            history.push("/");
            message.error("请求失败!! 请检查网络或操作是否合法")
        }
        finally
        {
            setLoading(false)
        }
    }


    useEffect(() =>
    {
        fetchData()
    }, [ id ])


    const extra = data && (
        <div className={styles.moreInfo}>
            <Statistic title="比赛评级" value={data.matchType}/>
            <Statistic title="比赛级别" value={data.matchLevel}/>
        </div>
    );


    const description = data && (
        <RouteContext.Consumer>
            {({ isMobile }) => (
                <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
                    <Descriptions.Item label="队长姓名">{data.leaderInfo?.userName}</Descriptions.Item>
                    <Descriptions.Item label="队长邮箱">{data.leaderInfo?.userEmail}</Descriptions.Item>

                    <Descriptions.Item label="队长所在学院">{data.leaderInfo?.userDepartment}</Descriptions.Item>

                    <Descriptions.Item label="队长所在专业">{data.leaderInfo?.userMajor}</Descriptions.Item>

                    <Descriptions.Item label="比赛报名结束时间">{dayjs(data.signUpEndTime).format(
                        'YYYY-MM-DD')}</Descriptions.Item>
                    <Descriptions.Item label="比赛名称"><a
                        href={`/competition/profile/${data.raceId}`}>{data.raceName}</a></Descriptions.Item>


                    <Descriptions.Item label="团队设定最大人数">{data.teamMaxNum} 人</Descriptions.Item>
                    <Descriptions.Item label="比赛当前人数">{
                        data.userList?.length ?
                            data.userList.length + 1 : 1
                    } 人</Descriptions.Item>

                    <Descriptions.Item label="比赛要求最大人数">{data.raceMaxNum} 人</Descriptions.Item>
                    <Descriptions.Item label="团队要求报名最少人数">{
                        data.raceMinNum
                    } 人</Descriptions.Item>

                    <Descriptions.Item
                        label="比赛团队指导老师人数">{data.teacherList?.length ?? 0} 人</Descriptions.Item>
                    <Descriptions.Item label="团队是否需要密码">{
                        data.needPassword
                            ? <span style={{ color: 'red' }}>是</span>
                            : <span style={{ color: 'green' }}>否</span>
                    }</Descriptions.Item>

                    <Descriptions.Item label="团队报名大项名称">{data.categoryName}</Descriptions.Item>
                    <Descriptions.Item label="团队报名小项名称">{data.eventName}</Descriptions.Item>

                    {data.teamTags && <Descriptions.Item label="团队标签">
                        {data.teamTags.map((item, index) => (
                            <PrettyTag key={`${item}-${index}`} content={item}/>
                        ))}
                    </Descriptions.Item>}
                </Descriptions>
            )}
        </RouteContext.Consumer>
    );


    const [ tabStatus, seTabStatus ] = useState<AdvancedState>({
        operationKey: 'tab1',
        tabActiveKey: 'detail',
    });

    const submitUserRequest = async (event: number, record: any) => {
        try {
            let response;
            // 通过
            if (event === 1) {
                response = await handleResolveJoinTeamUsingPOST({
                    raceId: data.raceId,
                    teamId: data.teamId,
                    userAccount: record.userAccount
                });
            } else {
                response = await handleRejectJoinTeamUsingPOST({
                    raceId: data.raceId,
                    teamId: data.teamId,
                    userAccount: record.userAccount
                });
            }
            if (response.code === 0 && response.data) {
                message.success(`操作成功`);
                // 考虑更新状态或使用路由导航而不是重新加载
            } else {
                message.error(`操作失败: ${response.msg}`);
            }
        } catch (e) {
            message.error("操作失败: " + e.message);
        }
    };


    const handleResolve = async (record) =>
    {
        await submitUserRequest(1, record);
    }

    const handleReject = async (record) =>
    {
        await submitUserRequest(0, record);

    }


    return (
        loading ? <Spin size={"large"}/> :
            <PageContainer
                title={`队伍信息: ${data.teamName}-团队信息`}
                extra={action(data.isLeader, data.isMember, data.isApply, data, id)}
                className={styles.pageHeader}
                content={description}
                extraContent={extra}
                tabActiveKey={tabStatus.tabActiveKey}
            >
                <div className={styles.main}>
                    <GridContent>
                        {
                            data.isLeader &&
                            <Card title="申请审核"
                                  style={{
                                      marginBottom: 24,
                                  }}
                                  bordered={false}>
                                {
                                    data.applyList && data.applyList.length > 0 ?
                                        <Table<API.UserTeamWorkVO>
                                            columns={userApplyColumn(handleResolve, handleReject)}
                                            dataSource={data.applyList}
                                        />
                                        : <Empty description={"暂无申请信息，快去邀请其他小伙伴加入团队吧！！"}/>
                                }
                            </Card>
                        }
                        <Card
                            title="团队介绍说明"
                            style={{
                                marginBottom: 24,
                            }}
                            bordered={false}
                        >
                            <Typography>
                                <Title>队伍描述介绍</Title>
                                <Paragraph>{data.teamDesc}</Paragraph>
                            </Typography>
                        </Card>
                        <Card
                            title="团队成员信息"
                            style={{ marginBottom: 24 }}
                            bordered={false}
                        >
                            {
                                data.userList && data.userList?.length > 0 ?
                                    <Table<API.UserTeamWorkVO>
                                        columns={userInfoColumn(UNIMPLEMENTED, UNIMPLEMENTED)}
                                        dataSource={data.userList}/>
                                    : <Empty description={"暂无成员信息"}/>
                            }
                        </Card>
                        <Card
                            title="指导老师成员信息"
                            style={{ marginBottom: 24 }}
                            bordered={false}
                        >
                            {
                                data.teacherList && data.teacherList?.length > 0 ?
                                    <Table<API.UserTeamWorkVO>
                                        columns={teacherInfoColumn(UNIMPLEMENTED, UNIMPLEMENTED)}
                                        dataSource={data.teacherList}/>
                                    :
                                    <Empty description="暂无指导老师"/>
                            }
                        </Card>


                    </GridContent>
                </div>
                <Modal
                    title={`申请入队-${data.teamName}`}
                    open={passwordModal}
                    onOk={tryApply}
                    onCancel={() => setPasswordModal(false)}
                >
                    <ProForm<{
                        userPassword: string;
                    }>
                        formRef={formRef}
                        formKey="check-user-password-form"
                        autoFocusFirstInput
                        submitter={{
                            resetButtonProps: {
                                style: {
                                    display: 'none',
                                },
                            },
                            submitButtonProps: {
                                style: {
                                    display: 'none',
                                },
                            },
                        }}
                    >
                        <ProFormText.Password name="userPassword" placeholder="请输入入队密码"/>
                    </ProForm>
                </Modal>
            </PageContainer>
    );
};
export default Advanced;
