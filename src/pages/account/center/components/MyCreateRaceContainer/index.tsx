import {DownloadOutlined, EditOutlined, EyeOutlined, ShareAltOutlined, TrophyTwoTone,} from '@ant-design/icons';
import {Card, ConfigProvider, Empty, List, message, Spin, Statistic, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import useStyles from './index.style';
import {getMyCreateRaceByRequestUsingGET} from "@/services/matchService/competitionInfoController";

const Container: React.FC = () =>
{
    const { styles: stylesApplications } = useStyles();
    const [ itemData, setItemData ] = useState<API.MyCreateRaceVO[]>([]);
    const [ loading, setLoading ] = useState(false);
    const { Countdown } = Statistic;

    const fetchData = async () =>
    {
        setLoading(true);
        try
        {
            const { data, code } = await getMyCreateRaceByRequestUsingGET();
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
    }, []);
    const getStatusLabelAndStyle= (status) => {
        const statusConfig = {
            0: { label: '筹备报名中', color: '#4d4848' }, // 灰色
            1: { label: '报名中', color: '#52c41a' }, // 绿色
            2: { label: '报名已结束', color: '#faad14' }, // 橙色
            3: { label: '比赛进行中', color: '#1890ff' }, // 蓝色
            4: { label: '比赛已结束', color: '#f5222d' } // 红色
        };

        return statusConfig[status] || { label: '未知状态', color: '#000000' }; // 默认黑色
    }

    const renderTimeInfo = (item) => {
        const now = new Date();
        const signUpEndTime = new Date(item.signUpEndTime);
        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);

        if (now < signUpEndTime) {
            // 如果还在报名期间
            return (
                <>
                    <div>
                        <p>报名结束时间</p>
                        <Countdown style={{ fontSize: "small" }} value={signUpEndTime} format="D 天 H 时 m 分"/>
                    </div>
                    <div>
                        <p>比赛开始时间</p>
                        <Countdown style={{ fontSize: "small" }} value={startTime} format="D 天 H 时 m 分"/>
                    </div>
                </>
            );
        } else {
            // 如果报名已经结束
            return (
                <>
                    <div>
                        <p>比赛开始时间</p>
                        <Countdown style={{ fontSize: "small" }} value={startTime} format="D 天 H 时 m 分"/>
                    </div>
                    <div>
                        <p>比赛结束时间</p>
                        <Countdown style={{ fontSize: "small" }} value={endTime} format="D 天 H 时 m 分"/>
                    </div>
                </>
            );
        }
    }

    const CardContent: React.FC<{
        item: API.MyCreateRaceVO
    }> = ({ item }) =>
    {
        const { label, color } = getStatusLabelAndStyle(item.matchStatus);

        return  (
            <div className={stylesApplications.cardInfo}>
                <ConfigProvider theme={{
                    components: {
                        Statistic: {
                            contentFontSize: '12px',
                        }

                    }
                }}>
                    <div>
                        <p>比赛状态</p>
                        <p style={{color}}>{label}</p>

                    </div>
                    <div>
                        <p>报名团队数量</p>
                        <p>{item.hasRegistrationNum}</p>

                    </div>
                    {renderTimeInfo(item)}
                </ConfigProvider>
            </div>
        );
    }
    return (
        loading ? <Spin tip="Loading..." size="large" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}/> :
            itemData.length > 0 ?
                <List<API.MyCreateRaceVO>
                    rowKey="id"
                    className={stylesApplications.filterCardList}
                    grid={{
                        gutter: 24,
                        xxl: 3,
                        xl: 2,
                        lg: 2,
                        md: 2,
                        sm: 2,
                        xs: 1,
                    }}
                    dataSource={itemData || []}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <Card
                                hoverable
                                bodyStyle={{
                                    paddingBottom: 20,
                                }}
                                actions={[
                                    <Tooltip key="look" title="查看">
                                        <EyeOutlined />
                                    </Tooltip>,
                                    <Tooltip title="编辑" key="edit">
                                        <EditOutlined/>
                                    </Tooltip>,
                                    <Tooltip title="分享" key="share">
                                        <ShareAltOutlined/>
                                    </Tooltip>,
                                ]}
                            >
                                <Card.Meta avatar={<TrophyTwoTone/>} style={{
                                    marginLeft: "-10px"
                                }} title={item.matchName}/>
                                <div>
                                    <CardContent
                                        item={item}
                                    />
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
                : <Empty description={"暂无创建的比赛"}/>
    );
};
export default Container;
