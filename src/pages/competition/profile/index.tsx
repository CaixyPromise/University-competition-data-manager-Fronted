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
import {awardDetailsColumns} from "@/pages/competition/profile/configs";
import {DataNode} from "@umijs/utils/compiled/cheerio/domhandler/lib";

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
                        <Button type="primary">报名比赛</Button>
                    </Space>
                );
            }}
        </RouteContext.Consumer>
    );


    // 用于生成权限树结构的数据
    const generateTreeData = (dataList: Record<string, any>): DataNode[] =>
    {
        if (!dataList)
        {
            return [];
        }
        return Object.entries(dataList).map(([ departmentId, departmentData ]): DataNode =>
        {
            // 这里假设每个学院对象中都有一个特殊的"name"键存储学院名称，其他键则代表专业ID
            const departmentName = departmentData['name'];
            const majors: DataNode[] = Object.entries(departmentData)
                .filter(([ key, _ ]) => key !== 'name') // 排除"name"键，处理剩余的专业ID和名称
                .map(([ majorId, majorName ]): DataNode => ({
                    title: majorName, // 直接使用专业名称作为节点标题
                    key: majorId, // 使用专业ID作为节点的唯一标识
                }));

            return {
                title: departmentName, // 学院名称作为节点标题
                key: departmentId, // 学院ID作为节点的唯一标识
                children: majors, // 将专业作为子节点
            };
        });
    };
    const treeData = (): DataNode[] => generateTreeData(data ? data.matchPermissionRule : [])
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
    const desc1 = (
        <div className={classNames(styles.stepDescription)}>
            <Fragment>
                管理员正在抓紧筹备比赛中.......
            </Fragment>

        </div>
    );
    const makeStepText = (text: string, date: string) =>
    {
        return <div className={classNames(styles.stepDescription)}>
            <Fragment>
                <span>{text}</span>
            </Fragment>
            <div>{`计划时间: ${dayjs(date).format('YYYY-MM-DD')}`}</div>
        </div>
    }

    const [ tabStatus, seTabStatus ] = useState<AdvancedState>({
        operationKey: 'tab1',
        tabActiveKey: 'detail',
    });

    const customDot = (
        dot: React.ReactNode,
        {
            status,
        }: {
            status: string;
        },
    ) =>
    {
        const popoverContent = (
            <div
                style={{
                    width: 160,
                }}
            >
                吴加号
                <span
                    style={{
                        float: 'right',
                    }}
                >
          <Badge
              status="default"
              text={
                  <span
                      style={{
                          color: 'rgba(0, 0, 0, 0.45)',
                      }}
                  >
                未响应
              </span>
              }
          />
        </span>
                <div
                    style={{
                        marginTop: 4,
                    }}
                >
                    耗时：2小时25分钟
                </div>
            </div>
        );
        if (status === 'process')
        {
            return (
                <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
                    <span>{dot}</span>
                </Popover>
            );
        }
        return dot;
    };

    const contentList = {
        tab1: (
            <Table
                pagination={false}
                loading={loading}
                dataSource={data}
                columns={columns}
            />
        ),
        tab2: (
            <Table
                pagination={false}
                loading={loading}
                dataSource={data}
                columns={columns}
            />
        ),
        tab3: (
            <Table
                pagination={false}
                loading={loading}
                dataSource={data}
                columns={columns}
            />
        ),
    };
    const onTabChange = (tabActiveKey: string) =>
    {
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
                        tab: '详情',
                    },
                    {
                        key: 'rule',
                        tab: '规则',
                    },
                ]}
            >
                <div className={styles.main}>
                    <GridContent>
                        <Card
                            title="比赛进度"
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <RouteContext.Consumer>
                                {({ isMobile }) => (
                                    <Steps
                                        direction={isMobile ? 'vertical' : 'horizontal'}
                                        progressDot={customDot}
                                        current={data?.matchStatus ? data.matchStatus : 0}
                                    >
                                        <Step title="报名准备中" description={desc1}/>
                                        <Step title="比赛报名中"
                                              description={makeStepText("比赛正在火热报名中", data.signUpStartTime)}/>
                                        <Step title="报名已结束"
                                              description={makeStepText("报名已结束！期待你的惊艳全场",
                                                  data.signUpEndTime)}/>

                                        <Step title="比赛进行中"
                                              description={makeStepText("比赛正在激烈进行中", data.startTime)}/>
                                        <Step title="比赛已结束"
                                              description={makeStepText("比赛已结束！完结撒花", data.endTime)}/>
                                    </Steps>
                                )}
                            </RouteContext.Consumer>
                        </Card>
                        <Card
                            title="比赛介绍说明"
                            style={{
                                marginBottom: 24,
                            }}
                            bordered={false}
                        >
                            <Typography>
                                <Title>比赛介绍</Title>
                                <Paragraph>{data.matchDesc}</Paragraph>
                                <Title>比赛规则说明</Title>
                                <Paragraph>{data.matchRule}</Paragraph>
                            </Typography>
                        </Card>
                        <Card
                            title="比赛奖项设置"
                            style={{
                                marginBottom: 24,
                            }}
                            bordered={false}
                        >
                            <Table
                                pagination={false}
                                columns={awardDetailsColumns}
                                dataSource={data.matchAward}
                            />
                        </Card>
                        {/*<Card bordered={false} tabList={operationTabList} onTabChange={onOperationTabChange}>*/}
                        {/*    {contentList[tabStatus.operationKey] as React.ReactNode}*/}
                        {/*</Card>*/}
                        {
                            data && isPermission(data) ?
                                <>
                                    <Card title={"比赛参加学院权限规则"}
                                          style={{
                                              marginBottom: 24,
                                          }}
                                          bordered={false}
                                    >
                                        <div>
                                            <Tree
                                                showLine
                                                autoExpandParent={true}
                                                treeData={treeData()}
                                            />
                                        </div>
                                    </Card>
                                </>
                                :
                                <></>
                        }
                    </GridContent>
                </div>
            </PageContainer>
    );
};
export default Advanced;
