import {LikeOutlined, LoadingOutlined, MessageFilled, StarTwoTone} from '@ant-design/icons';
import {Button, List, message, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import type {ListItemDataType} from '../../data.d';
import ArticleListContent from '../ArticleListContent';
import useStyles from './index.style';
import {getMessageInfoUsingGET} from "@/services/contentService/messageController";

const Articles: React.FC = () =>
{
    const { styles } = useStyles();
    const pageSize = 10;
    const [ data, setData ] = useState<API.MessageVO[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);
    const fetchData = async (currentPage: number) =>
    {
        setLoading(true);
        try
        {
            const response = await getMessageInfoUsingGET({
                pageSize: pageSize,
                current: currentPage
            });
            if (response.data && response.code === 0)
            {
                message.success("请求数据成功");
                const newRecords = response.data.records;
                const cleanedRecords = newRecords.filter(record => record.id && record.id); // 假设每条记录都应该有id和name
                if (currentPage === 1)
                {
                    setData(cleanedRecords);
                }
                else
                {
                    // 过滤掉可能重复的数据
                    const newData = [ ...data, ...cleanedRecords ].reduce((acc, current) =>
                    {
                        const x = acc.find(item => item.id === current.id);
                        if (!x)
                        {
                            return acc.concat([ current ]);
                        }
                        else
                        {
                            return acc;
                        }
                    }, []);
                    setData(newData);
                }
            }
            else
            {
                // 处理数据加载失败情况
                setData(currentPage === 1 ? [] : data); // 保留当前数据不变
            }
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
        fetchData(1); // 初始加载第一页数据
    }, []); // 依赖项为空数组，仅在组件挂载时执行一次
    const loadMore = () =>
    {
        setPage(prevPage => prevPage + 1);
        fetchData(page + 1);
    };
    const loadMoreDom = data.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={loadMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
                {loading ? (
                    <span>
            <LoadingOutlined/> 加载中...
          </span>
                ) : (
                    '加载更多'
                )}
            </Button>
        </div>
    );

    const IconText: React.FC<{
        icon: React.ReactNode;
        text: React.ReactNode;
    }> = ({ icon, text }) => (
        <span>
      {icon} {text}
    </span>
    );

    // 获取tab列表数据

    return (
        <List<API.MessageVO>
            size="large"
            className={styles.articleList}
            rowKey="id"
            loading={loading}
            loadMore={loadMoreDom}
            itemLayout="vertical"
            dataSource={data || []}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    // actions={[
                    //     <IconText key="star" icon={<StarTwoTone/>} text={item.star}/>,
                    //     <IconText key="like" icon={<LikeOutlined/>} text={item.like}/>,
                    //     <IconText key="message" icon={<MessageFilled/>} text={item.message}/>,
                    // ]}
                >
                    <List.Item.Meta
                        title={
                            <a className={styles.listItemMetaTitle} href={item.targetUrl}>
                                {item.subject}
                            </a>
                        }
                        // description={
                        //     <span>
                        //         <Tag>Ant Design</Tag>
                        //         <Tag>设计语言</Tag>
                        //         <Tag>蚂蚁金服</Tag>
                        //     </span>
                        // }
                    />
                    <ArticleListContent data={item}/>
                </List.Item>
            )}
        />
    );
};
export default Articles;
