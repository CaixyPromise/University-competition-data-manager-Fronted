import {DownOutlined,} from '@ant-design/icons';
import {GridContent, PageContainer, ProForm, ProFormInstance, RouteContext, ProFormText} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import {
    Button,
    Card,
    Descriptions,
    Dropdown, Empty,
    message, Modal,
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
import {getTeamByIdUsingGet} from "@/services/teamService/teamController";
import PrettyTag from "@/components/PrettyTag";
import {userInfoColumn} from "@/pages/team/profile/data.d";

const ButtonGroup = Button.Group;


type AdvancedState = {
    operationKey: 'tab1' | 'tab2' | 'tab3';
    tabActiveKey: string;
};
const Advanced: FC = () =>
{
    const { styles } = useStyles();
    const { id } = useParams();
    const [ data, setData ] = useState<API.TeamInfoVO>({});
    const [ loading, setLoading ] = useState<boolean>(true)
    const { Title, Paragraph } = Typography
    const [passwordModal, setPasswordModal] = useState<boolean>(false);
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
        if (passwordModal)
        {
            setPasswordModal(false);
        }
    }

    const action = (
        <RouteContext.Consumer>
            {({ isMobile }) =>
            {
                if (isMobile)
                {
                    return (
                        <Dropdown.Button
                            type="primary"
                            icon={<DownOutlined/>}
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: '联系队长',
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >
                            申请入队
                        </Dropdown.Button>
                    );
                }
                return (
                    <Space>
                        <ButtonGroup>
                            <Button>联系队长</Button>
                        </ButtonGroup>
                        <Button type="primary" onClick={async () =>
                        {
                            if (data.needPassword)
                            {
                                setPasswordModal(true)
                            }
                            else
                            {
                                await tryApply();
                            }
                        }}>申请入队</Button>
                    </Space>
                );
            }}
        </RouteContext.Consumer>
    );

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
            const { data, code } = await getTeamByIdUsingGet({
                teamId: id
            })
            if (code === 0 && data)
            {
                setData(data)
            }
        }
        catch (e: any)
        {
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


    return (
        loading ? <Spin size={"large"}/> :
            <PageContainer
                title={`队伍信息: ${data.teamName}-团队信息`}
                extra={action}
                className={styles.pageHeader}
                content={description}
                extraContent={extra}
                tabActiveKey={tabStatus.tabActiveKey}
            >
                <div className={styles.main}>
                    <GridContent>

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
                                        columns={userInfoColumn}
                                        dataSource={data.userList}/>
                                    : <Empty description={"暂无成员信息"} />
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
                                        columns={userInfoColumn}
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
