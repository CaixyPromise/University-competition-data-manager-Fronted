import React, {useEffect, useState} from "react";
import {Button, Card, Empty, List, message} from "antd";
import ListContent from "@/pages/team/teamList/components/ArticleListContent";
import {CheckCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import {createStyles} from "antd-style";
import {sendCommentByRaceIdUsingPOST} from "@/services/contentService/commentController";
import BraftEditor, {EditorState} from 'braft-editor';
import {deleteAnnounceUsingPOST, listAnnounceByPageUsingPOST} from "@/services/contentService/announceController";
import {useModel} from "@umijs/max";

interface AnnounceTabContainerProp
{
    id: string
    canAdmin: boolean
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


const Index: React.FC<AnnounceTabContainerProp> = ({ id,canAdmin }) =>
{
    const { styles } = useStyles();
    const pageSize = 5;
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ data, setData ] = useState<API.AnnounceVO[]>([]);
    const [ page, setPage ] = useState<number>(1);
    const [ commentText, setCommentText ] = useState<EditorState>(
        BraftEditor.createEditorState(null),
    );
    const fetchData = async (currentPage: number) =>
    {
        setLoading(true);
        try
        {
            const response = await listAnnounceByPageUsingPOST({
                pageSize: pageSize,
                current: currentPage,
                raceId: id
            });
            if (response.data && response.code === 0)
            {
                message.success("请求数据成功");
                const newRecords = response.data.records;
                console.log("typeof newRecords", typeof newRecords);
                // 数据清洗：这里可以添加更多的数据清洗逻辑
                setData(newRecords || [])
            }
            else
            {
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
            message.error("公告内容不能为空!!")
            return;
        }
        if (submitComment.length >= 513)
        {
            message.error("公告内容不能超过512字!!")
            return;
        }
        setLoading(true)
        try
        {
            const { data, code } = await sendCommentByRaceIdUsingPOST(submitComment);
            if (data && code === 0)
            {
                message.success("发布公告成功:)")
            }
            else
            {
                message.error("提交公告失败:(")
            }
        }
        catch (e: any)
        {
            message.error("提交公告失败:(, 失败原因: " + e.message)
        }
        finally
        {
            setLoading(false)
        }
    }

    return <>
        {canAdmin && <Card
                title={"发布公告"}
                bordered={false}
            >
            <BraftEditor
                className={styles.editor}
                value={commentText}
                onChange={(newEditorState) => setCommentText(newEditorState)}
                placeholder={'请输入公告内容...'}
            />
            <Button type={"primary"}
                    icon={<CheckCircleOutlined/>}
                    onClick={submitComment}
                    loading={loading}>发布公告</Button>
            </Card>
        }

        <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
            {
                data.length > 0 ? <List<API.AnnounceVO>
                    size="large"
                    loading={loading}
                    rowKey="id"
                    itemLayout="vertical"
                    loadMore={loadMoreDom}
                    dataSource={data}
                    renderItem={(item) =>
                    {
                        const creatUserInfo = item.createUser as API.UserWorkVO;
                        return (
                            <List.Item
                                key={item.id}
                                extra={<div className={styles.listItemExtra}/>}
                            >
                                <List.Item.Meta
                                    title={
                                        <a className={styles.listItemMetaTitle}>
                                            {item.title}
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
                                {
                                    canAdmin &&
                                    <div style={{
                                        marginTop: "8px"
                                    }}>
                                        <a onClick={async (e) =>
                                        {
                                            e.preventDefault();
                                            // 删除公告
                                            const response = await deleteAnnounceUsingPOST({
                                                id: item.id
                                            });
                                            if (response.code === 0 && response.data)
                                            {
                                                message.success("删除成功");
                                                // 刷新页面
                                                window.location.reload();
                                            }
                                        }}>删除</a>
                                    </div>
                                }
                            </List.Item>
                        )
                    }}
                />
                    : <Empty description={"暂无公告信息"}/>
            }
        </Card>
    </>
}

export default Index;