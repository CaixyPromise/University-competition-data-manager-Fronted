import {ApartmentOutlined, ClusterOutlined, ContactsOutlined, PlusOutlined} from '@ant-design/icons';
import {GridContent} from '@ant-design/pro-components';
import {Card, Col, Divider, Input, InputRef, message, Row, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import useStyles from './Center.style';
import type {TagType} from './data.d';
import {TabStatusType} from "./data.d";
import {getMeByRequestUsingGET} from "@/services/userService/userController";
import {useModel} from "@@/exports";
import {listMyCreateTeamsUsingGET, listMyJoinTeamsUsingGET} from "@/services/teamService/teamController";
import TeamList from "@/pages/account/center/components/TeamList";
import MyCreateRaceContainer from "@/pages/account/center/components/MyCreateRaceContainer";
import Articles from "@/pages/account/center/components/Articles";


const operationTabList = ({ canAdmin, isTeacher }:
    {
        canAdmin: boolean;
        isTeacher: boolean
    }): TabStatusType[] =>
{
    const tabLists: TabStatusType[] = [];
    const makeTabObject = (key: string, name: string) =>
    {
        return {
            key: key,
            tab: <span>{name}</span>,
        }
    }
    tabLists.push(makeTabObject('message', '站内信',));
    if (canAdmin) // 管理员
    {
        tabLists.push(makeTabObject("my-create", "我创建的比赛"))
        tabLists.push(makeTabObject("my-join", "我加入的队伍",))
        tabLists.push(makeTabObject("my-apply", "我申请的队伍",))
        tabLists.push(makeTabObject("my-team", "我创建的队伍"))
        // tabLists.push()
    }
    else if (isTeacher) // 指导老师
    {
        tabLists.push(makeTabObject("my-teach", "我指导的队伍"))
    }
    else // 普通学生
    {
        tabLists.push(makeTabObject("my-join", "我加入的队伍"))
        tabLists.push(makeTabObject("my-apply", "我申请的队伍"))
        tabLists.push(makeTabObject("my-project", "我创建的队伍"))
    }
    return tabLists;
}
const TagList: React.FC<{
    tags: TagType[];
}> = ({ tags }) =>
{
    const { styles } = useStyles();
    const ref = useRef<InputRef | null>(null);
    const [ newTags, setNewTags ] = useState<TagType[]>([]);
    const [ inputVisible, setInputVisible ] = useState<boolean>(false);
    const [ inputValue, setInputValue ] = useState<string>('');
    const showInput = () =>
    {
        setInputVisible(true);
        if (ref.current)
        {
            // eslint-disable-next-line no-unused-expressions
            ref.current?.focus();
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () =>
    {
        let tempsTags = [ ...newTags ];
        if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0)
        {
            tempsTags = [
                ...tempsTags,
                {
                    key: `new-${tempsTags.length}`,
                    label: inputValue,
                },
            ];
        }
        setNewTags(tempsTags);
        setInputVisible(false);
        setInputValue('');
    };
    return (
        <div className={styles.tags}>
            <div className={styles.tagsTitle}>标签</div>
            {(tags || []).concat(newTags).map((item) => (
                <Tag key={item.key}>{item.label}</Tag>
            ))}
            {inputVisible && (
                <Input
                    ref={ref}
                    type="text"
                    size="small"
                    style={{
                        width: 78,
                    }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag
                    onClick={showInput}
                    style={{
                        borderStyle: 'dashed',
                    }}
                >
                    <PlusOutlined/>
                </Tag>
            )}
        </div>
    );
};
const Center: React.FC = () =>
{
    const { styles } = useStyles();
    const [activeTabKey, setActiveTabKey] = useState('message');

    const [ data, setData ] = useState<API.AboutMeVO>({});
    const [ loading, setLoading ] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const { userRole }: API.LoginUserVO = initialState.currentUser;
    const tabList = operationTabList({ canAdmin: userRole === 'admin', isTeacher: userRole === 'teacher' });
    const fetchData = async () =>
    {
        setLoading(true);
        try
        {
            const response = await getMeByRequestUsingGET()
            if (response.code === 0 && response.data)
            {
                setData(response.data);
            }
            else
            {
                message.error("获取信息失败，可能是未登陆");
            }
        }
        catch (error: any)
        {
            message.error(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }
    useEffect(() =>
    {
        fetchData()
    }, []);

    //  获取用户信息
    // const { data: currentUser, loading } = useRequest(() =>
    // {
    //     return queryCurrent();
    // });

    //  渲染用户信息
    const renderUserInfo = ({ userEmail, userSex, userDepartment, userMajor }: Partial<API.AboutMeVO>) =>
    {
        return (
            <div className={styles.detail}>
                <p>
                    <ContactsOutlined
                        style={{
                            marginRight: 8,
                        }}
                    />
                    {userSex}
                </p>
                <p>
                    <ClusterOutlined
                        style={{
                            marginRight: 8,
                        }}
                    />
                    {userEmail}
                </p>
                <p>
                    <ApartmentOutlined
                        style={{
                            marginRight: 8,
                        }}
                    />
                    {`${userDepartment}-${userMajor}`}
                </p>
            </div>
        );
    };

    // 渲染tab切换
    const renderChildrenByTabKey = (tabValue: string) =>
    {
        console.log(tabValue)
        if (tabValue === "message")
        {
            return <Articles />
        }

        else if (tabValue === 'my-join')
        {
            return  <TeamList
                fetchDataFunction={() => listMyJoinTeamsUsingGET({ userRole: 1 })}
                description={"暂无加入团队信息"}
            />;
        }
        else if (tabValue === 'my-team')
        {
            return  <TeamList
                        fetchDataFunction={listMyCreateTeamsUsingGET}
                        description={"暂无创建团队信息"}
            />;
        }
        else if (tabValue === "my-apply")
        {
            return <TeamList
                fetchDataFunction={() =>listMyJoinTeamsUsingGET({ userRole: -1 })}
                description={"暂无申请加入团队信息"}
            />
        }
        else if (tabValue === "my-create")
        {
            return <MyCreateRaceContainer />
        }
        return null;
    };

    const cleanTags = (tags: string[]) =>
    {
        if (tags !== undefined || tags.length > 0)
        {
            return tags.map((tag: string, index: number) =>
            {
                return {
                    key: `${tag}-${index}`,
                    label: tag
                }
            })
        }
        else
        {
            return []
        }
    }

    return (
        <GridContent>
            <Row gutter={24}>
                <Col lg={7} md={24}>
                    <Card
                        bordered={false}
                        style={{
                            marginBottom: 24,
                        }}
                        loading={loading}
                    >
                        {!loading && data && (
                            <div>
                                <div className={styles.avatarHolder}>
                                    <img alt="" src={data.userAvatar}/>
                                    <div className={styles.name}>{data.userName}</div>
                                    <div>{data?.userProfile}</div>
                                </div>
                                {renderUserInfo(data)}
                                <Divider dashed/>
                                <TagList tags={(cleanTags(data.userTags || []))}/>
                                <Divider
                                    style={{
                                        marginTop: 16,
                                    }}
                                    dashed
                                />
                                {/*<div className={styles.team}>*/}
                                {/*    <div className={styles.teamTitle}>团队</div>*/}
                                {/*    <Row gutter={36}>*/}
                                {/*        {currentUser.notice &&*/}
                                {/*            currentUser.notice.map((item) => (*/}
                                {/*                <Col key={item.id} lg={24} xl={12}>*/}
                                {/*                    <a href={item.href}>*/}
                                {/*                        <Avatar size="small" src={item.logo}/>*/}
                                {/*                        {item.member}*/}
                                {/*                    </a>*/}
                                {/*                </Col>*/}
                                {/*            ))}*/}
                                {/*    </Row>*/}
                                {/*</div>*/}
                            </div>
                        )}
                    </Card>
                </Col>
                <Col lg={17} md={24}>
                    <Card
                        className={styles.tabsCard}
                        bordered={false}
                        tabList={tabList}
                        activeTabKey={activeTabKey}
                        onTabChange={(_tabKey) => {
                            setActiveTabKey(_tabKey);
                        }}
                    >
                        {renderChildrenByTabKey(activeTabKey)}
                    </Card>
                </Col>
            </Row>
        </GridContent>
    );
};
export default Center;
