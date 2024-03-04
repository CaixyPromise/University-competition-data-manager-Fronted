import {LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {Button, Card, Col, Form, List, message, Row, Select} from 'antd';
import {DefaultOptionType} from 'antd/es/select';
import type {FC} from 'react';
import React, {useEffect, useMemo, useState} from 'react';
import ListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import useStyles from './style.style';
import {listDemandVoByPageUsingPOST} from "@/services/marketService/marketController";

const FormItem = Form.Item;

const pageSize = 5;

const Index: FC = () =>
{

    const [ form ] = Form.useForm();

    const { styles } = useStyles();
    const [ data, setData ] = useState<API.DemandVO[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);
    const fetchData = async (currentPage: number) =>
    {
        setLoading(true);
        try
        {
            const response = await listDemandVoByPageUsingPOST({
                pageSize: pageSize,
                current: currentPage
            });
            if (response.data && response.code === 0)
            {
                message.success("请求数据成功");
                const newRecords = response.data.records;
                // 数据清洗：这里可以添加更多的数据清洗逻辑
                const cleanedRecords = newRecords.filter(record => record.id === record.id); // 假设每条记录都应该有id和name
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
    const list = data || [];

    const setOwner = () =>
    {
        form.setFieldsValue({
            owner: [ 'wzj' ],
        });
    };

    const owners = [
        {
            id: 'wzj',
            name: '我自己',
        },
        {
            id: 'wjh',
            name: '吴家豪',
        },
        {
            id: 'zxx',
            name: '周星星',
        },
        {
            id: 'zly',
            name: '赵丽颖',
        },
        {
            id: 'ym',
            name: '姚明',
        },
    ];

    const IconText: React.FC<{
        type: string;
        text: React.ReactNode;
    }> = ({ type, text }) =>
    {
        switch (type)
        {
            case 'star-o':
                return (
                    <span>
            <StarOutlined style={{ marginRight: 8 }}/>
                        {text}
          </span>
                );
            case 'like-o':
                return (
                    <span>
            <LikeOutlined style={{ marginRight: 8 }}/>
                        {text}
          </span>
                );
            case 'message':
                return (
                    <span>
            <MessageOutlined style={{ marginRight: 8 }}/>
                        {text}
          </span>
                );
            default:
                return null;
        }
    };

    const formItemLayout = {
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 12 },
        },
    };

    const loadMoreDom = list.length > 0 && (
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

    const ownerOptions = useMemo<DefaultOptionType[]>(
        () =>
            owners.map((item) => ({
                label: item.name,
                value: item.id,
            })),
        [ owners ],
    );

    return (
        <>
            <Card bordered={false}>
                <Form
                    layout="inline"
                    form={form}
                    initialValues={{
                        owner: [ 'wjh', 'zxx' ],
                    }}
                >
                    <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                        <FormItem name="category">
                            <TagSelect expandable>
                                {/*{categoryOptions.map((category) => (*/}
                                {/*  <TagSelect.Option value={category.value!} key={category.value}>*/}
                                {/*    {category.label}*/}
                                {/*  </TagSelect.Option>*/}
                                {/*))}*/}
                            </TagSelect>
                        </FormItem>
                    </StandardFormRow>
                    <StandardFormRow title="owner" grid>
                        <FormItem name="owner" noStyle>
                            <Select
                                mode="multiple"
                                placeholder="选择 owner"
                                style={{ minWidth: '6rem' }}
                                options={ownerOptions}
                            />
                        </FormItem>
                        <a className={styles.selfTrigger} onClick={setOwner}>
                            只看自己的
                        </a>
                    </StandardFormRow>
                    <StandardFormRow title="其它选项" grid last>
                        <Row gutter={16}>
                            <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                <FormItem {...formItemLayout} label="活跃用户" name="user">
                                    <Select
                                        placeholder="不限"
                                        style={{ maxWidth: 200, width: '100%' }}
                                        options={[
                                            {
                                                label: '李三',
                                                value: 'lisa',
                                            },
                                        ]}
                                    />
                                </FormItem>
                            </Col>
                            <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                <FormItem {...formItemLayout} label="好评度" name="rate">
                                    <Select
                                        placeholder="不限"
                                        style={{ maxWidth: 200, width: '100%' }}
                                        options={[
                                            {
                                                label: '优秀',
                                                value: 'good',
                                            },
                                        ]}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </StandardFormRow>
                </Form>
            </Card>
            <Card
                style={{ marginTop: 24 }}
                bordered={false}
                bodyStyle={{ padding: '8px 32px 32px 32px' }}
            >
                <List<API.DemandVO>
                    size="large"
                    loading={loading}
                    rowKey="id"
                    itemLayout="vertical"
                    loadMore={loadMoreDom}
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            extra={<div className={styles.listItemExtra}/>}
                        >
                            <List.Item.Meta
                                title={
                                    <a  href={`/demands/profile/${item.id}`} className={styles.listItemMetaTitle}>
                                        {`${item.title}-报价：${item.reward}元; `}

                                    </a>
                                }
                                description={
                                    <span>
                    {/*{*/}
                    {/*    (item.teamTags && item.teamTags.length > 0) &&*/}
                    {/*    item.teamTags.map((tag, index) => {*/}
                    {/*        // eslint-disable-next-line react/jsx-key*/}
                    {/*        return <PrettyTag content={tag} />*/}
                    {/*    })*/}

                    {/*}*/}
                  </span>
                                }
                            />
                            <ListContent data={{ content: item.description, createAt: item.createTime, deadline: item.deadline }}/>
                        </List.Item>
                    )}
                />
            </Card>
        </>
    );
};

export default Index;
