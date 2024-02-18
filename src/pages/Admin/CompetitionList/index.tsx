
import UpdateModal from '@/components/Modal/UpdateModal';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button} from 'antd';
import React, {useRef, useState} from 'react';
import {CompetitionColumns, CompetitionModalColumn} from "@/pages/Admin/CompetitionList/columns/CompetitionColumns";
import {listMatchInfoByPageUsingPOST} from "@/services/matchService/competitionInfoController";
import MatchInfoForm from "@/pages/Admin/CompetitionList/components/MatchInfoForm";
import {useModel} from "@@/exports";
import {history} from '@umijs/max';

/**
 * 用户管理页面
 *
 * @constructor
 */
const CompetitionListPage: React.FC = () =>
{
    // 是否显示新建窗口
    const [ createModalVisible, setCreateModalVisible ] = useState<boolean>(false);
    // 是否显示更新窗口
    const [ updateModalVisible, setUpdateModalVisible ] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    // 当前用户点击的数据
    const [ currentRow, setCurrentRow ] = useState<API.User>();
    const { collegesAndMajors } = useModel('collegesAndMajors');
    /**
     * 删除节点
     *
     * @param row
     */

    const onFinish = (value: any) =>
    {
        console.log("onFinish: ", value)
    }


    return (
        <PageContainer>
            <ProTable<API.MatchInfoQueryVO>
                headerTitle={'查询表格'}
                actionRef={actionRef}
                scroll={{ x: 200 }}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() =>
                        {
                            history.push("/admin/competition/add")
                        }}
                    >
                        <PlusOutlined/> 新建
                    </Button>,
                ]}
                request={async (params, sort, filter) =>
                {
                    const sortField = Object.keys(sort)?.[0];
                    const sortOrder = sort?.[sortField] ?? undefined;

                    const { data, code } = await listMatchInfoByPageUsingPOST({
                        ...params,
                        sortField,
                        sortOrder,
                        ...filter,
                    } as API.UserQueryRequest);

                    return {
                        success: code === 0,
                        data: data?.records || [],
                        total: Number(data?.total) || 0,
                    };
                }}
                columns={CompetitionColumns}
            />
            <MatchInfoForm defaultValues={{}}
                           visible={createModalVisible}
                           onFinish={onFinish}
                           onOpenChange={setCreateModalVisible}
                           collegesAndMajors={collegesAndMajors}
            />
            {/*<CreateModal*/}
            {/*    visible={createModalVisible}*/}
            {/*    columns={CompetitionModalColumn}*/}
            {/*    onSubmit={() =>*/}
            {/*    {*/}
            {/*        setCreateModalVisible(false);*/}
            {/*        actionRef.current?.reload();*/}
            {/*    }}*/}
            {/*    onCancel={() =>*/}
            {/*    {*/}
            {/*        setCreateModalVisible(false);*/}x
            {/*    }}*/}
            {/*/>*/}
            <UpdateModal
                visible={updateModalVisible}
                columns={CompetitionColumns}
                defaultValue={currentRow}
                onSubmit={() =>
                {
                    setUpdateModalVisible(false);
                    setCurrentRow(undefined);
                    actionRef.current?.reload();
                }}
                onCancel={() =>
                {
                    setUpdateModalVisible(false);
                }}
            />
        </PageContainer>
    );
};
export default CompetitionListPage;
