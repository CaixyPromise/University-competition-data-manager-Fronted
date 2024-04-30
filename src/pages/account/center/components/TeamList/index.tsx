import React, {useEffect, useState} from 'react';
import {Card, Empty, List, message, Popconfirm, Spin, Tooltip} from 'antd';
import {DeleteOutlined, EyeOutlined, TrophyTwoTone} from '@ant-design/icons';
import useStyles from './index.style';
import {deleteTeamUsingPOST} from "@/services/teamService/teamController";
import {history} from "@umijs/max";

// 通用的 TeamList 组件
const TeamList = ({ fetchDataFunction, description }) =>
{
    const { styles } = useStyles();
    const [ itemData, setItemData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ popConfirm, setPopConfirm ] = useState<boolean>(false)
    const fetchData = async () =>
    {
        setLoading(true);
        try
        {
            const { data, code } = await fetchDataFunction();
            if (code === 0 && data)
            {
                setItemData(data);
            }
            else
            {
                message.error("获取数据失败");
            }
        }
        catch (error)
        {
            console.error(error);
            message.error("请求过程中发生错误");
        }
        finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchData();
    }, [ fetchDataFunction ]);

    const CardContent: React.FC<{
        item: API.TeamInfoVO
    }> = ({ item }) => (
        <div className={styles.cardInfo}>
            <div>
                <p>团队人数</p>
                <p>{item.userList?.length ? item.userList?.length + 1 : 1}</p>
            </div>
            <div>
                <p>指导老师人数</p>
                <p>{item.teacherList?.length ? item.teacherList?.length + 1 : 0}</p>
            </div>
            <div>
                <p>小组名称</p>
                <p style={{ fontSize: "small" }}>{item.categoryName}</p>
            </div>
            <div>
                <p>项目名称</p>
                <p style={{ fontSize: "small" }}>{item.eventName}</p>
            </div>
        </div>
    );

    const handleDelete = async (id) =>
    {
        try
        {
            const response = await deleteTeamUsingPOST({id:id});
            if (response.code === 0)
            {
                message.success("删除成功")
            }
        }
        catch (e: any)
        {
            message.error(e.message);
        }
    }

    return (
        loading ? <Spin tip="Loading..." size="large" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}/> :
            itemData.length > 0 ?
                <List
                    rowKey="teamId"
                    className={styles.filterCardList}
                    grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                    dataSource={itemData}
                    renderItem={item => (
                        <List.Item key={item.teamId}>
                            <Card
                                hoverable
                                bodyStyle={{ paddingBottom: 20 }}
                                actions={[
                                    <Tooltip key="view" title="查看">
                                        <EyeOutlined onClick={() => history.push(`/team/profile/${item.teamId}`)} />
                                    </Tooltip>,
                                    <Popconfirm
                                        title="确定要删除吗?"
                                        onConfirm={() => handleDelete(item.teamId)}
                                        key="delete"
                                    >
                                        <Tooltip title={`删除团队-${item.teamName}`}>
                                            <DeleteOutlined />
                                        </Tooltip>
                                    </Popconfirm>,
                                ]}
                            >
                                <Card.Meta avatar={<TrophyTwoTone/>} title={item.raceName}/>
                                <CardContent item={item}/>
                            </Card>
                        </List.Item>
                    )}
                />
                : <Empty description={description}/>
    );
};

export default TeamList;
