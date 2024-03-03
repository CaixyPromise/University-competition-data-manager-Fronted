import {Card, Popover, Steps, Table, Tree, Typography} from "antd";
import {RouteContext} from "@ant-design/pro-components";
import {awardDetailsColumns, expandedRowRender, groupDetailsColumns} from "@/pages/competition/profile/configs";
import React, {Fragment, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {DataNode} from "@umijs/utils/compiled/cheerio/domhandler/lib";
import useStyles from "@/pages/competition/profile/style.style";
interface DetailPageProps
{
    id: string;
    data: API.MatchInfoProfileVO
}

const Index:React.FC<DetailPageProps> = ({id, data}) =>
{
    const { styles } = useStyles();

    const { Title, Paragraph } = Typography
    const { Step } = Steps;
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
    const customDot = (
        dot: React.ReactNode,
        {
            status,
        }: {
            status: string;
        },
    ) =>
    {
        if (status === 'process')
        {
            return (
                <Popover placement="topLeft" >
                    <span>{dot}</span>
                </Popover>
            );
        }
        return dot;
    };
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
    return <>
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
            title="比赛项目分组划分"
            style={{ marginBottom: 24 }}
            bordered={false}
        >
            <Table
                columns={groupDetailsColumns}
                dataSource={data.groupData}
                expandable={(record: any) => expandedRowRender(record)}
            />
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
    </>
}

export default Index;