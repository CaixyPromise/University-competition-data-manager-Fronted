import React, {useEffect, useState} from "react";
import {Button, Card, Empty, List, message} from "antd";
import ListContent from "@/pages/team/teamList/components/ArticleListContent";
import {CheckCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import {createStyles} from "antd-style";
import {
    // getReplyCommentUsingGET,
    listMainCommentByRaceIdUsingPOST,
    sendCommentByRaceIdUsingPOST
} from "@/services/contentService/commentController";
import BraftEditor, {EditorState} from 'braft-editor';
import {listTeamsByPageUsingGET} from "@/services/teamService/teamController";
import PrettyTag from "@/components/PrettyTag";
import {commentText} from "tsutils";

interface TeamRecommendProps
{
    id: string
}

const useStyles = createStyles(({ token }) => {
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


const Index: React.FC<TeamRecommendProps> = ({id}) =>
{
    const { styles } = useStyles();
    const pageSize = 5;
    const [ data, setData ] = useState<API.TeamInfoPageVO[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);
    const fetchData = async (currentPage: number) =>
    {
        setLoading(true);
        try
        {
            const response = await listTeamsByPageUsingGET({
                pageSize: pageSize,
                current: currentPage
            });
            if (response.data && response.code === 0)
            {
                message.success("请求数据成功");
                const newRecords = response.data.records;
                // 数据清洗：这里可以添加更多的数据清洗逻辑
                const cleanedRecords = newRecords.filter(record => record.id && record.name); // 假设每条记录都应该有id和name
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

    const submitComment = async () =>
    {
        const submitComment = commentText.toText();
        if (submitComment.length === 0)
        {
            message.error("评论内容不能为空!!")
            return;
        }
        if (submitComment.length >= 513)
        {
            message.error("评论内容不能超过512字!!")
            return;
        }
        setLoading(true)
        try {
            const { data, code } = await sendCommentByRaceIdUsingPOST(submitComment);
            if (data && code === 0)
            {
                message.success("提交评论成功:)")
            }
            else{
                message.error("提交评论失败:(")
            }
        }
        catch (e: any)
        {
            message.error("提交评论失败:(, 失败原因: " + e.message)
        }
        finally
        {
            setLoading(false)
        }
    }

    return <>
        <Card
            title={"推荐团队"}
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
            {
                data.length > 0 ? <List<API.TeamInfoPageVO>
                        size="large"
                        loading={loading}
                        rowKey="id"
                        itemLayout="vertical"
                        loadMore={loadMoreDom}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                extra={<div className={styles.listItemExtra}/>}
                            >
                                <List.Item.Meta
                                    title={
                                        <a  href={`/team/profile/${item.id}`} className={styles.listItemMetaTitle}>
                                            {`${item.raceName}-${item.name}`}

                                        </a>
                                    }
                                    description={
                                        <span>
                    {
                        (item.teamTags && item.teamTags.length > 0) &&
                        item.teamTags.map((tag, index) => {
                            // eslint-disable-next-line react/jsx-key
                            return <PrettyTag content={tag} />
                        })

                    }
                  </span>
                                    }
                                />
                                <ListContent data={{ content: item.description, createAt: item.createTime }}/>
                            </List.Item>
                        )}
                    />:
                    <Empty description={<span>暂无推荐队伍，快去看看<a href={"/team/index"}>大厅</a>里看看吧~</span>} />
            }
        </Card>
    </>
}

export default Index;