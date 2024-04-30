import React, {useEffect, useState} from "react";
import {Card, Empty, message, Table} from "antd";
import {createStyles} from "antd-style";
import {ProTable} from "@ant-design/pro-components";
import {getRegisterTeamListByRaceIdUsingGET} from "@/services/matchService/registrationController";

interface TeamRecommendProps
{
    id: string
}

const useStyles = createStyles(({ token }) =>
{
    return {
        editor: {
            border: "1px solid #ccc",
            borderRadius: "6px",
            height: "300px",
            marginBottom: "20px",
        },
        listItemMetaTitle: {
            color: token.colorTextHeading,
        },
        listItemExtra: {
            width: '272px',
            height: '1px',
            [`@media screen and (max-width: ${token.screenLG}px)`]: {
                width: '0',
                height: '1px',
            },
        },
        selfTrigger: {
            marginLeft: '12px',
            [`@media screen and (max-width: ${token.screenXS}px)`]: {
                display: 'block',
                marginLeft: '0',
            },
            [`@media screen and (max-width: ${token.screenMD}px)`]: {
                display: 'block',
                marginLeft: '0',
            },
        },
    };
});


const tableColumns = [
    {
        title: '队伍名称',
        dataIndex: 'teamName',
        key: 'teamName',
    },
    {
        title: "团队id",
        dataIndex: "teamId",
        key: "teamId",
    },
    {
        title: "比赛名称",
        dataIndex: "raceName",
        key: "raceName",
    },
    {
        title: "团队报名的大项名称",
        dataIndex: "categoryName",
        key: "categoryName",
    },
    {
        title: "团队报名的小项名称",
        dataIndex: "eventName",
        key: "eventName",
    },
    {
        title: "团队id",
        dataIndex: "teamId",
        key: "teamId",
    }
]

const teamUserColumn = [
    {
        title: "学/工号",
        dataIndex: "userAccount",
        key: "userAccount"
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "专业",
        dataIndex: "userMajor",
        key: "userMajor"
    },
    {
        title: "学院",
        dataIndex: "userDepartment",
        key: "userDepartment"
    },
    {
        title: "邮箱",
        dataIndex: "userEmail",
        key: "userEmail"
    },
    {
        title: "身份",
        dataIndex: "userRole",
        key: "userRole"
    }

]

const Index: React.FC<TeamRecommendProps> = ({ id }) =>
{
    const { styles } = useStyles();
    const pageSize = 5;
    const [ data, setData ] = useState<API.TeamInfoPageVO[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);
    const fetchData = async () =>
    {

        setLoading(true);
        try
        {
            const response = await getRegisterTeamListByRaceIdUsingGET({ id: id });
            setData(response.data || [])
        }
        catch (e)
        {
            message.error("请求错误!!");
        }
        finally
        {
            setLoading(false);
        }
    };


    useEffect(() =>
    {
        fetchData(); // 初始加载第一页数据
    }, []); // 依赖项为空数组，仅在组件挂载时执行一次


    return <>
        <Card
            title={"已经报名的团队"}
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
            {
                data.length > 0 ?
                    <ProTable
                        columns={tableColumns}
                        key={"teamId"}
                        expandable={true}
                        expandedRowRender={(record) => {
                            const userList = [];

                            // 添加队长信息
                            if (record.leaderInfo) {
                                userList.push({
                                    userAccount: record.leaderInfo.userAccount,
                                    userName: record.leaderInfo.userName,
                                    userMajor: record.leaderInfo.userMajor,
                                    userDepartment: record.leaderInfo.userDepartment,
                                    userEmail: record.leaderInfo.userEmail,
                                    userRole: "队长"
                                });
                            }

                            // 添加队员信息
                            record.userList.forEach(item => {
                                userList.push({
                                    userAccount: item.userAccount,
                                    userName: item.userName,
                                    userMajor: item.userMajor,
                                    userDepartment: item.userDepartment,
                                    userEmail: item.userEmail,
                                    userRole: "队员"
                                });
                            });

                            // 如果有老师列表，添加老师信息
                            if (record.teacherList && record.teacherList.length > 0) {
                                record.teacherList.forEach(teacher => {
                                    userList.push({
                                        userAccount: teacher.userAccount,
                                        userName: teacher.userName,
                                        userMajor: teacher.userMajor, // 或者其他相关字段
                                        userDepartment: teacher.userDepartment, // 或者其他相关字段
                                        userEmail: teacher.userEmail,
                                        userRole: "教师"
                                    });
                                });
                            }
                            return <Table columns={teamUserColumn} dataSource={userList} />
                        }}
                        dataSource={data}
                    />
                    :
                    <Empty description={<span>暂无推荐队伍，快去看看<a href={"/team/index"}>大厅</a>里看看吧~</span>}/>
            }
        </Card>
    </>
}

export default Index;