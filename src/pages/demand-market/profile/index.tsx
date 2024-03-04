import {DownOutlined,} from '@ant-design/icons';
import {GridContent, PageContainer, ProFormInstance, RouteContext} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import {
    Button,
    Card,
    Descriptions,
    Dropdown,
    Empty,
    Menu,
    message,
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
import {userApplyColumn} from "@/pages/team/profile/data.d";
import {UNIMPLEMENTED} from "@/utils/functional";
import {
    acceptDemandTakeUsingPOST,
    applyForDemandUsingPOST,
    deleteDemandsByIdUsingPOST,
    getDemandVoByIdUsingGET,
    rejectDemandTakeUsingPOST
} from "@/services/marketService/marketController";

const ButtonGroup = Button.Group;


type AdvancedState = {
    operationKey: 'tab1' | 'tab2' | 'tab3';
    tabActiveKey: string;
};

const getUserActions = (isOwner: boolean, isApplied: boolean, data: API.DemandProfileVO, id: string) =>
{
    if (isOwner)
    {
        return (
            <RouteContext.Consumer>
                {({ isMobile }) =>
                {
                    if (isMobile)
                    {
                        return (
                            <Dropdown.Button
                                type="primary"
                                icon={<DownOutlined/>}
                                overlay={<Menu items={UNIMPLEMENTED}/>}
                                placement="bottomRight"
                            >
                                分享链接
                            </Dropdown.Button>
                        );
                    }
                    return (
                        <Space>
                            <ButtonGroup>
                                <Button onClick={async () =>
                                {
                                    const response = await deleteDemandsByIdUsingPOST({ id })
                                    if (response.code === 0 && response.data)
                                    {
                                        message.success("删除成功");
                                    }
                                    else
                                    {
                                        message.error(`删除失败，原因: ${response.message}`);
                                    }
                                }}>删除需求</Button>
                            </ButtonGroup>
                            <Button type="primary" onClick={async () =>
                            {
                                // const response = await ({
                                //     raceId: data.raceId,
                                //     teamId: id
                                // })
                                // if (response.code === 0 && response.data)
                                // {
                                //     message.success("报名成功");
                                //     return;
                                // }
                                // else
                                // {
                                //     message.error(`报名失败: ${response.message}`);
                                // }
                            }}>分享链接</Button>
                        </Space>
                    );
                }}
            </RouteContext.Consumer>
        );
    }
    else if (isApplied)
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
                                分享链接
                            </Dropdown.Button>
                        );
                    }
                    return (
                        <Space>
                            <Button onClick={UNIMPLEMENTED}>分享链接</Button>
                            <Button type="primary" onClick={UNIMPLEMENTED}>取消申请</Button>
                        </Space>
                    );
                }}
            </RouteContext.Consumer>
        );
    }
    else
    {
        return (
            <RouteContext.Consumer>
                {({ isMobile }) =>
                {
                    const items = [
                        { key: 'leave', label: '申请承接', onClick: UNIMPLEMENTED },
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
                                分享链接
                            </Dropdown.Button>
                        );
                    }
                    return (
                        <Space>
                            <Button onClick={UNIMPLEMENTED}>分享链接</Button>
                            <Button type="primary" onClick={async () =>
                            {
                                const response = await applyForDemandUsingPOST({
                                    id: id
                                })
                                if (response.code === 0 && response.data)
                                {
                                    message.success("申请成功，请等待审核")
                                }
                                else
                                {
                                    message.error(`申请失败，原因: ${response.message}`)
                                }
                            }}>申请承接</Button>
                        </Space>
                    );
                }}
            </RouteContext.Consumer>)
    }
};
const Advanced: FC = () =>
{
    const { styles } = useStyles();
    const { id } = useParams();
    const [ data, setData ] = useState<API.DemandProfileVO>({});
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
        message.success("申请成功")
        const response = await applyForDemandUsingPOST({
            id: id
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

    const action = (isOwner: boolean, isApplied: boolean, data: API.DemandProfileVO, id: string) =>
    {
        return getUserActions(isOwner, isApplied, data, id);
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
            const { data, code } = await getDemandVoByIdUsingGET({
                id: id
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
            <Statistic title="需求报价" value={`${data.reward} 元`}/>
            <Statistic title="上次更新时间" value={dayjs(data.updateTime).format("YYYY-MM-DD")}/>
        </div>
    );


    const description = data && (
        <RouteContext.Consumer>
            {({ isMobile }) => (
                <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
                    <Descriptions.Item label="创建人姓名">{data.creator?.userName}</Descriptions.Item>
                    <Descriptions.Item label="创建人邮箱">{data.creator?.userEmail}</Descriptions.Item>
                    <Descriptions.Item label="创建人所在学院">{data.creator?.userDepartment}</Descriptions.Item>

                    <Descriptions.Item label="创建人所在专业">{data.creator?.userMajor}</Descriptions.Item>

                    <Descriptions.Item label="需求最短期限">{dayjs(data.deadline).format(
                        'YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="需求创建时间">{dayjs(data.createTime).format(
                        'YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>


                    {/*<Descriptions.Item label="团队设定最大人数">{data.teamMaxNum} 人</Descriptions.Item>*/}
                    {/*<Descriptions.Item label="比赛当前人数">{*/}
                    {/*    data.userList?.length ?*/}
                    {/*        data.userList.length + 1 : 1*/}
                    {/*} 人</Descriptions.Item>*/}

                    {/*<Descriptions.Item label="比赛要求最大人数">{data.raceMaxNum} 人</Descriptions.Item>*/}
                    {/*<Descriptions.Item label="团队要求报名最少人数">{*/}
                    {/*    data.raceMinNum*/}
                    {/*} 人</Descriptions.Item>*/}

                    {/*<Descriptions.Item*/}
                    {/*    label="比赛团队指导老师人数">{data.teacherList?.length ?? 0} 人</Descriptions.Item>*/}
                    {/*<Descriptions.Item label="团队是否需要密码">{*/}
                    {/*    data.needPassword*/}
                    {/*        ? <span style={{ color: 'red' }}>是</span>*/}
                    {/*        : <span style={{ color: 'green' }}>否</span>*/}
                    {/*}</Descriptions.Item>*/}

                    {/*<Descriptions.Item label="团队报名大项名称">{data.categoryName}</Descriptions.Item>*/}
                    {/*<Descriptions.Item label="团队报名小项名称">{data.eventName}</Descriptions.Item>*/}

                    {/*{data.teamTags && <Descriptions.Item label="团队标签">*/}
                    {/*    {data.teamTags.map((item, index) => (*/}
                    {/*        <PrettyTag key={`${item}-${index}`} content={item}/>*/}
                    {/*    ))}*/}
                    {/*</Descriptions.Item>}*/}
                </Descriptions>
            )}
        </RouteContext.Consumer>
    );


    const [ tabStatus, seTabStatus ] = useState<AdvancedState>({
        operationKey: 'tab1',
        tabActiveKey: 'detail',
    });

    const submitUserRequest = async (event: number, record: any) =>
    {
        try
        {
            let response;
            // 通过
            if (event === 1)
            {
                response = await applyForDemandUsingPOST({
                    id: id
                });
            }
            else    // 拒绝
            {
                response = await rejectDemandTakeUsingPOST({
                    id: id
                });
            }
            if (response.code === 0 && response.data)
            {
                message.success(`操作成功`);
                // 考虑更新状态或使用路由导航而不是重新加载
            }
            else
            {
                message.error(`操作失败: ${response.msg}`);
            }
        }
        catch (e)
        {
            message.error("操作失败: " + e.message);
        }
    };


    const handleResolve = async (record) =>
    {
        // console.log(record)
        const response = await acceptDemandTakeUsingPOST({ id, targetUser: record.userId });
        if (response.code === 0 && response.data)
        {
            message.success(`操作成功`);
            return
        }
        else {
            message.error(`操作失败: ${response.message}`);
        }
    }

    const handleReject = async (record) =>
    {
        const response = await rejectDemandTakeUsingPOST({ id, targetUser: record.userId });
        if (response.code === 0 && response.data)
        {
            message.error(`操作成功`);
            return
        }
        else {
            message.error(`操作失败: ${response.message}`);
        }
    }


    return (
        loading ? <Spin size={"large"}/> :
            <PageContainer
                title={`队伍信息: ${data.title}-需求信息`}
                extra={action(data.isOwner ?? false, data.isApplied ?? false, data, id)}
                className={styles.pageHeader}
                content={description}
                extraContent={extra}
                tabActiveKey={tabStatus.tabActiveKey}
            >
                <div className={styles.main}>
                    <GridContent>
                        {
                            data.isOwner &&
                            <Card title="申请审核"
                                  style={{
                                      marginBottom: 24,
                                  }}
                                  bordered={false}>
                                {
                                    data.userList && data.userList.length > 0 ?
                                        <Table<API.UserTeamWorkVO>
                                            columns={userApplyColumn(handleResolve, handleReject)}
                                            dataSource={data.userList}
                                        />
                                        : <Empty description={"暂无申请信息，快去邀请其他小伙伴承接你的需求吧！！"}/>
                                }
                            </Card>
                        }
                        <Card
                            title="需求介绍说明"
                            style={{
                                marginBottom: 24,
                            }}
                            bordered={false}
                        >
                            <Typography>
                                <Title>{data.title}</Title>
                                <Paragraph>{data.description}</Paragraph>
                            </Typography>
                        </Card>
                        {/*<Card*/}
                        {/*    title="团队成员信息"*/}
                        {/*    style={{ marginBottom: 24 }}*/}
                        {/*    bordered={false}*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        data.userList && data.userList?.length > 0 ?*/}
                        {/*            <Table<API.UserTeamWorkVO>*/}
                        {/*                columns={userInfoColumn(UNIMPLEMENTED, UNIMPLEMENTED)}*/}
                        {/*                dataSource={data.userList}/>*/}
                        {/*            : <Empty description={"暂无成员信息"}/>*/}
                        {/*    }*/}
                        {/*</Card>*/}
                        {/*<Card*/}
                        {/*    title="指导老师成员信息"*/}
                        {/*    style={{ marginBottom: 24 }}*/}
                        {/*    bordered={false}*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        data.teacherList && data.teacherList?.length > 0 ?*/}
                        {/*            <Table<API.UserTeamWorkVO>*/}
                        {/*                columns={userInfoColumn(UNIMPLEMENTED, UNIMPLEMENTED)}*/}
                        {/*                dataSource={data.teacherList}/>*/}
                        {/*            :*/}
                        {/*            <Empty description="暂无指导老师"/>*/}
                        {/*    }*/}
                        {/*</Card>*/}


                    </GridContent>
                </div>
            </PageContainer>
    );
};
export default Advanced;
