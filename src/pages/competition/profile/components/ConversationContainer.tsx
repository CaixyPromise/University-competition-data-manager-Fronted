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

interface ConversationContainerProp
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

const Index: React.FC<ConversationContainerProp> = ({id}) =>
{
    const { styles } = useStyles();
    const pageSize = 5;
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ data, setData] = useState([]);
    const [ page, setPage ] = useState<number>(1);
    const [ commentText, setCommentText ] = useState<EditorState>(
        BraftEditor.createEditorState(null),
    );
    const fetchData = async (currentPage: number) =>
    {
        setLoading(true);
        try
        {
            const response = await listMainCommentByRaceIdUsingPOST({
                pageSize: pageSize,
                current: currentPage,
                raceId: id
            });
            if (response.data && response.code === 0)
            {
                message.success("请求数据成功");
                const newRecords = response.data.records;
                // 数据清洗：这里可以添加更多的数据清洗逻辑
                if (currentPage === 1)
                {
                    setData(newRecords);
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

    const getReplyComment = async (commentId: string) =>
    {
        try {
            const {data, code} = await getReplyCommentUsingGET({
                commentId: commentId,
            })
            if (code === 0 && data)
            {

            }
        }
        catch (e: any)
        {
        }

    }

    return <>
        <Card
            title={"发表评论"}
            bordered={false}
        >
            <BraftEditor
                className={styles.editor}
                value={commentText}
                onChange={(newEditorState) => setCommentText(newEditorState)}
                placeholder={'请输入评论内容...'}
            />
            <Button type={"primary"}
                    icon={<CheckCircleOutlined />}
                    onClick={submitComment}
                    loading={loading}>发表评论</Button>
        </Card>
        <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
            {
                data.length > 0 ? <List<API.CommentVO>
                    size="large"
                    loading={loading}
                    rowKey="id"
                    itemLayout="vertical"
                    loadMore={loadMoreDom}
                    dataSource={data}
                    renderItem={(item) =>
                    {
                        const creatUserInfo = item.createUserInfo as API.UserWorkVO;
                        return (
                            <List.Item
                                key={item.id}
                                extra={<div className={styles.listItemExtra}/>}
                            >
                                <List.Item.Meta
                                    title={
                                        <a  href={`/team/profile/${item.id}`} className={styles.listItemMetaTitle}>
                                            {`${creatUserInfo.userName}`}

                                        </a>
                                    }
                                    description={
                                        <span>来自于：
                                            {`${creatUserInfo.userDepartment}-
                                ${creatUserInfo.userMajor}-
                                ${creatUserInfo.userName}`}
                                </span>
                                    }
                                />
                                <ListContent data={{ content: item.content, createAt: item.createTime }}/>
                                {/*<div style={{marginTop: "10px"}}>*/}
                                {/*    <span>查看回复</span>*/}
                                {/*</div>*/}
                            </List.Item>
                        )
                    }}
                /> :
                    <Empty description={"讨论区为空，快去发表第一个讨论吧！"}/>
            }
        </Card>
    </>
}

export default Index;