import {
    CalendarOutlined,
    DollarCircleOutlined,
    InfoCircleOutlined,
    LikeOutlined,
    LoadingOutlined, LockOutlined,
    MessageOutlined,
    StarOutlined
} from '@ant-design/icons';
import {Button, Card, Col, Form, List, message, Row, Select} from 'antd';
import {DefaultOptionType} from 'antd/es/select';
import type {FC} from 'react';
import React, {useEffect, useMemo, useState} from 'react';
import ListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import useStyles from './style.style';
import {addDemandsUsingPOST, listDemandVoByPageUsingPOST} from "@/services/marketService/marketController";
import {history} from "@umijs/max";
import {ModalForm, ProForm, ProFormDigit, ProFormText} from "@ant-design/pro-components";
import ProFormDatePicker from "@ant-design/pro-form/es/components/DatePicker/DatePicker";

const FormItem = Form.Item;

const pageSize = 5;

const Index: FC = () =>
{

    const [ form ] = Form.useForm();

    const { styles } = useStyles();
    const [ data, setData ] = useState<API.DemandVO[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);
    const [ createModal, setCreateModal] = useState<boolean>(false);
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

    const disabledDate = (current) =>
    {

        let today = new Date();
        today.setHours(0, 0, 0, 0);
        return current && current.valueOf() < today.getTime();
    };

    const addDemands: boolean = async (values) =>
    {
        try {
            const response = await addDemandsUsingPOST({
                ...values
            })
            if (response.code === 0)
            {
                message.success('添加成功')
                return true
            }
        }
        catch (e:any)
        {
            message.error(e.message)
            return false
        }
    }


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
                    <StandardFormRow title="操作" block style={{ paddingBottom: 11 }}>
                        <Button onClick={()=>setCreateModal(true)}>发布新需求</Button>
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

            <ModalForm
                open={createModal}
                onOpenChange={setCreateModal}
                title={'发布需求信息'}
                onFinish={addDemands}
            >
                <ProFormText
                    name="title"
                    label="需求标题"
                    rules={[{ required: true, message: '请输入需求标题' },
                        { max: 64, message: '标题不能超过64个字符' }]}
                />
                <ProFormText
                    name="description"
                    label="需求描述"
                    rules={[
                        { required: true, message: '请输入需求描述' },
                        { max: 512, message: '描述不能超过512个字符' }
                    ]}
                />
                <ProFormDigit
                    name="reward"
                    label="报酬"
                    rules={[{ required: true, message: '请输入报酬' }]}
                    min={0}
                    fieldProps={{
                        precision: 2, // 设置小数点后两位
                        prefix: <DollarCircleOutlined />
                    }}// 设置小数点后两位
                />
                <ProFormText.Password
                    name="userPassword"
                    label="支付密码"
                    rules={[{ required: true, message: '请输入支付密码' }]}
                    fieldProps={{
                        prefix: <LockOutlined />
                    }}
                />
                <ProFormDatePicker
                    name="deadline"
                    label="截止日期"
                    fieldProps={{
                        prefix: <CalendarOutlined />
                    }}
                    disabledDate={disabledDate}
                    rules={[{ required: true, message: '请选择截止日期' }]}
                    initialValue={Date.now()} // 默认值为当前日期
                />
            </ModalForm>
        </>
    );
};

export default Index;
