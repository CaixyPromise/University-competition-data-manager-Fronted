import {DownOutlined, EllipsisOutlined,} from '@ant-design/icons';
import {GridContent, PageContainer, RouteContext} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import {
    Badge,
    Button,
    Card,
    Descriptions,
    Dropdown,
    message,
    Popover,
    Space,
    Spin,
    Statistic,
    Steps,
    Table,
    Tag,
    Tree,
    Typography,
} from 'antd';
import classNames from 'classnames';
import type {FC} from 'react';
import React, {Fragment, useEffect, useState} from 'react';
import useStyles from './style.style';
import {useParams} from "@@/exports";
import {getMatchInfoUsingGET} from "@/services/matchService/competitionInfoController";
import dayjs from "dayjs";
import {awardDetailsColumns, expandedRowRender, groupDetailsColumns} from "@/pages/competition/profile/configs";
import {DataNode} from "@umijs/utils/compiled/cheerio/domhandler/lib";
import {record} from "@umijs/utils/compiled/zod";
import DetailsContainer from "@/pages/competition/profile/components/DetailsContainer";
import ConversationContainer from "@/pages/competition/profile/components/ConversationContainer";
import NoticeTab from "@/pages/competition/profile/components/NoticeTab";
import TeamRecommend from "@/pages/competition/profile/components/TeamRecommend";

const ButtonGroup = Button.Group;


const columns = [
    {
        title: '操作类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '操作人',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '执行结果',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) =>
        {
            if (text === 'agree')
            {
                return <Badge status="success" text="成功"/>;
            }
            return <Badge status="error" text="驳回"/>;
        },
    },
    {
        title: '操作时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
    {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
    },
];
type AdvancedState = {
    operationKey: 'tab1' | 'tab2' | 'tab3';
    tabActiveKey: string;
};
const Advanced: FC = () =>
{
    const { styles } = useStyles();
    const { id } = useParams();
    const [ data, setData ] = useState<API.MatchInfoProfileVO>(null);
    const [ loading, setLoading ] = useState<boolean>(true)
    const { Title, Paragraph } = Typography
    const { Step } = Steps;


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
                                        label: '联系负责人',
                                    },
                                    {
                                        key: '2',
                                        label: '操作二',
                                    },
                                    {
                                        key: '3',
                                        label: '操作三',
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >
                            报名比赛
                        </Dropdown.Button>
                    );
                }
                return (
                    <Space>
                        <ButtonGroup>
                            <Button>联系负责人</Button>
                            <Button>操作二</Button>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: '选项一',
                                        },
                                        {
                                            key: '2',
                                            label: '选项二',
                                        },
                                        {
                                            key: '3',
                                            label: '选项三',
                                        },
                                    ],
                                }}
                                placement="bottomRight"
                            >
                                <Button>
                                    <EllipsisOutlined/>
                                </Button>
                            </Dropdown>
                        </ButtonGroup>
                        <Button type="primary" onClick={()=>
                        {
                            history.push(`/competition/register/${id}`)
                        }}>报名比赛</Button>
                    </Space>
                );
            }}
        </RouteContext.Consumer>
    );
    const getDayText = (targetTime: string, color: string, type: string, noticeText: string) =>
    {
        const formatTime = dayjs(targetTime);
        const now = dayjs();

        const betweenTime = formatTime.diff(now, 'day');

        const isBefore = now.isBefore(formatTime);
        if (isBefore)
        {
            return (
                <span style={{ color: color }}>{type}还有{betweenTime}天{noticeText}</span>
            );
        }
    }
    const isPermission = (data: API.MatchInfoProfileVO) =>
    {

        const permissionRule = (data.matchPermissionRule);
        // @ts-ignore
        return Object.keys(permissionRule).length !== 0;

    }

    // 用于生成权限树结构的数据


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
            const { data, code } = await getMatchInfoUsingGET({
                id: id
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


    const getStatusText = (data: API.MatchInfoProfileVO) =>
    {
        const valueDict = [
            '未开始',
            "报名中",
            "结束报名",
            "进行中",
            "已结束"
        ]

        return {
            value: data.matchStatus !== undefined ? valueDict[data.matchStatus] : "未知",
            valueStyle: {
                color: data.matchStatus === 0 ? 'red' :
                    data.matchStatus === 1 ? 'orange' : data.matchStatus === 2 ? 'green' : 'blue'
            },
        }
    }
    const extra = data && (
        <div className={styles.moreInfo}>
            <Statistic title="状态" {...getStatusText(data)}/>
            <Statistic title="比赛级别" value={data.matchLevel}/>
        </div>
    );
    const description = data && (
        <RouteContext.Consumer>
            {({ isMobile }) => (
                <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
                    <Descriptions.Item label="创建人">{data.createUserInfo?.userName}</Descriptions.Item>
                    <Descriptions.Item label="创建人所在学院">{data.createUserInfo?.userDepartment}</Descriptions.Item>
                    <Descriptions.Item label="比赛报名开始时间">{dayjs(data.signUpStartTime).format(
                        'YYYY-MM-DD')}</Descriptions.Item>
                    <Descriptions.Item label="比赛报名结束时间">{dayjs(data.signUpEndTime).format(
                        'YYYY-MM-DD')}</Descriptions.Item>
                    <Descriptions.Item label="比赛正式开始时间">{dayjs(data.startTime).format(
                        'YYYY-MM-DD')}</Descriptions.Item>
                    <Descriptions.Item label="比赛正式结束时间">{dayjs(data.endTime).format(
                        'YYYY-MM-DD')}</Descriptions.Item>

                    <Descriptions.Item label="比赛评级">{data.matchType}</Descriptions.Item>
                    <Descriptions.Item label="是否限制参加学院">{isPermission(data) ?
                        <span style={{ "color": "red" }}>限制学院参加</span> :
                        <span style={{ "color": "green" }}>不限制学院参加</span>}
                    </Descriptions.Item>
                    <Descriptions.Item label="比赛团队最大人数">{data.maxTeamSize} 人</Descriptions.Item>
                    <Descriptions.Item label="比赛团队最少人数">{data.minTeamSize} 人</Descriptions.Item>
                    <Descriptions.Item label="比赛团队指导老师最大人数">{data.maxTeacherSize} 人</Descriptions.Item>
                    <Descriptions.Item label="比赛团队指导老师最少人数">{data.maxTeacherSize} 人</Descriptions.Item>
                    {data.matchTags && <Descriptions.Item label="比赛标签">
                        {data.matchTags.map((item, index) => (
                            <Tag
                                key={index}
                                color="blue"
                                style={{
                                    "marginLeft": "2px"
                                }}
                            >
                                {item}
                            </Tag>
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




    const onTabChange = (tabActiveKey: string) =>
    {
        console.log('tabActiveKey', tabActiveKey)
        seTabStatus({
            ...tabStatus,
            tabActiveKey,
        });
    };
    const onOperationTabChange = (key: string) =>
    {
        seTabStatus({
            ...tabStatus,
            operationKey: key as 'tab1',
        });
    };

    const renderTab = () =>
    {
        if (tabStatus.tabActiveKey === 'detail')
        {
            return <DetailsContainer id={id} data={data} />
        }
        else if (tabStatus.tabActiveKey === "conversation")
        {
            return <ConversationContainer id={id} />
        }
        else if (tabStatus.tabActiveKey === "notice")
        {
            return <NoticeTab id={id} />
        }
        else if(tabStatus.tabActiveKey === "teamRecommend")
        {
            return <TeamRecommend id={id} />
        }
    }

    return (
        loading ? <Spin size={"large"}/> :
            <PageContainer
                title={data?.matchName}
                extra={action}
                className={styles.pageHeader}
                content={description}
                extraContent={extra}
                tabActiveKey={tabStatus.tabActiveKey}
                onTabChange={onTabChange}
                tabList={[
                    {
                        key: 'detail',
                        tab: '竞赛信息',
                    },
                    {
                        key: 'conversation',
                        tab: '竞赛讨论',
                    },
                    {
                        key: "notice",
                        tab: "竞赛通知"
                    },
                    {
                        key: "teamRecommend",
                        tab:"团队推荐"
                    }
                ]}
            >
                <div className={styles.main}>
                    <GridContent>
                        {
                            renderTab()
                        }
                    </GridContent>
                </div>
            </PageContainer>
    );
};
export default Advanced;
