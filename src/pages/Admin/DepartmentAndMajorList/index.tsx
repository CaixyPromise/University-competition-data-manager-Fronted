import CreateModal from "@/components/Modal/CreateModal";
import UpdateModal from '@/components/Modal/UpdateModal';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message} from 'antd';
import React, {useRef, useState} from 'react';
import {CompetitionColumns, CompetitionModalColumn} from "@/pages/Admin/CompetitionList/columns/CompetitionColumns";
import {
    DepartmentColumns,
    subMajorColumns
} from "@/pages/Admin/DepartmentAndMajorList/columns/DepartmentAndMajorColumns";
import {deleteMajorInfoUsingPOST, listMajorInfoByPageUsingPOST} from "@/services/userService/majorInfoController";
import {deleteDepartmentInfoUsingPOST} from "@/services/userService/departmentController";

/**
 * 用户管理页面
 *
 * @constructor
 */
const DepartmentAndMajorListPage: React.FC = () =>
{
    // 是否显示新建窗口
    const [ createModalVisible, setCreateModalVisible ] = useState<boolean>(false);
    // 是否显示更新窗口
    const [ updateModalVisible, setUpdateModalVisible ] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    // 当前用户点击的数据
    const [ currentRow, setCurrentRow ] = useState<API.User>();
    const majorRef = useRef<ActionType>();
    const [ majorCurrentRow, setMajorCurrentRow ] = useState<API.User>();
    const processData = (data) =>
    {
        console.log("processData is: ", data);
        const groupedByDepartment = {};
        data.records.forEach(record =>
        {
            if (!groupedByDepartment[record.departmentId])
            {
                groupedByDepartment[record.departmentId] = {
                    departmentId: record.departmentId,
                    departmentName: record.departmentName,
                    majors: [],
                };
            }
            groupedByDepartment[record.departmentId].majors.push({
                majorId: record.majorId,
                majorName: record.majorName,
                operations: '操作', // 根据需要定义操作
            });
        });

        return Object.values(groupedByDepartment).map(dept => ({
            ...dept,
            key: dept.departmentId
        }));
    };
    const expandedRowRender = (record: any) =>
    {
        const handleDeleteMajor = async (record: { majorId: API.DeleteRequest; }) =>
        {
            const { data, code } = await deleteMajorInfoUsingPOST(record.majorId)
            if (code === 0 && data)
            {
                message.success('删除成功，即将刷新')
                actionRef.current?.reloadAndRest?.()
            }
        }

        return <ProTable
            columns={subMajorColumns({
                setCurrentRow: setMajorCurrentRow,
                handleDelete: handleDeleteMajor,
                setUpdateModalVisible
            })}
            headerTitle={false}
            search={false}
            actionRef={majorRef}
            options={false}
            dataSource={record.majors}
            pagination={false}
        />
    }
    /**
     * 删除节点
     *
     * @param row
     */
    const handleDeleteDepartment = async (record) =>
    {
        const { data, code } = await deleteDepartmentInfoUsingPOST({
            id: record.departmentId
        })
        if (code === 0 && data)
        {
            message.success('删除成功，即将刷新')
            actionRef.current?.reloadAndRest?.()
        }
    }

    return (
        <PageContainer>
            <ProTable<API.DepartmentWithMajorsVO>
                headerTitle={'查询表格'}
                actionRef={actionRef}
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
                            setCreateModalVisible(true);
                        }}
                    >
                        <PlusOutlined/> 新建
                    </Button>,
                ]}
                request={async (params, sort, filter) =>
                {
                    const sortField = Object.keys(sort)?.[0];
                    const sortOrder = sort?.[sortField] ?? undefined;

                    const { data, code } = await listMajorInfoByPageUsingPOST({
                        ...params,
                        sortField,
                        sortOrder,
                        ...filter,
                    } as API.UserQueryRequest);
                    return {
                        success: code === 0,
                        data: processData(data) || [],
                        total: Number(data?.total) || 0,
                    };
                }}
                columns={DepartmentColumns(
                    { setCurrentRow, setUpdateModalVisible, handleDelete: handleDeleteDepartment })}
                expandable={{ expandedRowRender }}
            />
            <CreateModal
                visible={createModalVisible}
                columns={CompetitionModalColumn}
                onSubmit={() =>
                {
                    setCreateModalVisible(false);
                    actionRef.current?.reload();
                }}
                onCancel={() =>
                {
                    setCreateModalVisible(false);
                }}
            />
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
export default DepartmentAndMajorListPage;
