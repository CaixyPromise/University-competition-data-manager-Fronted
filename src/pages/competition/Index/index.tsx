import {Card, Form, List, message, Space, Tag, Typography} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type {FC} from 'react';
import {useEffect, useState} from "react";
import useStyles from './style.style';
import {listMatchInfoByVoPageUsingPOST} from "@/services/matchService/competitionInfoController";
import {CategoriesItem} from "@/pages/competition/Index/typings";
import {history} from "@umijs/max";

dayjs.extend(relativeTime);

const FormItem = Form.Item;
const { Paragraph } = Typography;


function getRandomRGBColor()
{
    const r = Math.floor(Math.random() * 256); // 红色分量
    const g = Math.floor(Math.random() * 256); // 绿色分量
    const b = Math.floor(Math.random() * 256); // 蓝色分量
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return {
        tagBgColor: `rgb(${r},${g},${b})`,
        tagTextColor: (yiq >= 128) ? 'black' : 'white'
    }
}


const Projects: FC = () =>
{
    const { styles } = useStyles();
    const [ listData, setListData ] = useState<API.MatchInfoQueryVO[]>([]);
    const [ current, setCurrent ] = useState<number>(1);
    const [ pageSize, setPageSize ] = useState<number>(10);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ categoryOptions, setCategoryOptions ] = useState<CategoriesItem[]>([]);

    const dataClean = async (responseData: API.MatchInfoQueryVO[]) =>
    {
        const categories: CategoriesItem[] = responseData.map((item) =>
        {
            const tag = item.matchTags
            return {
                label: tag,
                value: tag,
                key: (Math.random() * 1000000).toFixed(0)
            }
        })
        setCategoryOptions(categories)
    }

    const loadData = async () =>
    {
        setLoading(true)
        try
        {
            const { data, code } = await listMatchInfoByVoPageUsingPOST({
                current: current,
                pageSize: pageSize
            })
            console.log("code: ", code)
            if (data && code === 0)
            {

                setListData(data.records)
                message.success('获取数据成功')
                await dataClean(data.records)
            }
        }
        catch (e: any)
        {
            message.error('获取数据失败!')
        }
        finally
        {
            setLoading(false)
        }
    }
    useEffect(() =>
    {
        loadData();
    }, [ current, pageSize ])

    const list = listData || [];
    const getDayText = (item: API.MatchInfoQueryVO) =>
    {
        const signUpEndTime = dayjs(item.signUpEndTime);
        const now = dayjs();

        const daysUntilSignUpEnds = signUpEndTime.diff(now, 'day');

        const isSignUpPeriod = now.isBefore(signUpEndTime);
        if (isSignUpPeriod)
        {
            return (
                <span>
            开始日期：{dayjs(item.startTime).format('YYYY-MM-DD')}，
            <span style={{ color: 'red' }}>报名还有{daysUntilSignUpEnds}天结束</span>
        </span>
            );
        }
        else
        {
            return (
                <span>
                    结束日期: {dayjs(item.endTime).format("YYYY-MM-DD")}
                </span>
            )
        }
    }
    const cardList = list && (
        <List<API.MatchInfoQueryVO>
            rowKey="id"
            loading={loading}
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
            }}
            dataSource={list}
            renderItem={(item) =>
            {
                return (
                    <List.Item>
                        <Card className={styles.card} hoverable
                              onClick={() => {
                                  history.push(`/competition/profile/${item.id}`);
                              }}
                              cover={<img height={"200px"} alt={item.matchName} src={item.matchPic}/>}>
                            <Card.Meta
                                title={<a>{item.matchName}</a>}
                                description={
                                    <Paragraph
                                        ellipsis={{
                                            rows: 2,
                                        }}
                                    >
                                        {item.matchDesc}
                                    </Paragraph>
                                }
                            />
                            <div className={styles.cardItemContent}>
                                {getDayText(item)}
                            </div>
                            <Space size={[ 0, 8 ]} wrap>
                                {item.matchTags?.map((tags) =>
                                {
                                    const { tagBgColor, tagTextColor } = getRandomRGBColor();
                                    return (<Tag style={{
                                        backgroundColor: tagBgColor,
                                        color: tagTextColor,
                                        borderColor: tagBgColor
                                        // borderColor: "#000000"
                                    }} key={tags}>{tags}</Tag>)
                                })}
                            </Space>
                        </Card>
                    </List.Item>
                )
            }}
        />
    );
    const formItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    return (
        <div className={styles.coverCardList}>

            <div className={styles.cardList}>{cardList}</div>
        </div>
    );
};
export default Projects;
