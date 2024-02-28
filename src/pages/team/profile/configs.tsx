import {ProColumns} from "@ant-design/pro-components";
import {Table, Tree} from "antd";
import {record} from "@umijs/utils/compiled/zod";

export const awardDetailsColumns: ProColumns[] = [
    {
        title: '奖项名称',
        dataIndex: 'awardName',
        key: 'awardName',
    },
    {
        title: '奖项内容',
        dataIndex: 'awardContent',
        key: 'awardContent',

    },
    {
        title: '奖项描述',
        key: 'awardDesc',
        dataIndex: 'awardDesc',
    },
    {
        title: '奖项数量',
        dataIndex: 'awardCount',
        key: 'awardCount',
        valueType: 'digit', // 指定值类型为数字
    },
];
const renderPermission = (permissions: any[]): React.ReactNode => {
    if (!permissions || permissions.length === 0) return '无';

    const renderTreeNodes = (data: any[]) => data.map((item) => {
        if (item.children) {
            return (
                <Tree.TreeNode title={item.label} key={item.key || item.label}>
                    {renderTreeNodes(item.children)}
                </Tree.TreeNode>
            );
        }
        return <Tree.TreeNode key={item.key || item.label} title={item.label} />;
    });

    return (
        <Tree>
            {permissions.map((permissionGroup, index) => (
                renderTreeNodes(permissionGroup)
            ))}
        </Tree>
    );
};



export const groupDetailsColumns: ProColumns[] = [
    {
        title: "分组大项名称",
        dataIndex: "parentGroupName",
        key: "parentGroupName",
    },
    {
        title: "是否限制参加学院",
        dataIndex: "permission",
        key: "permission",
        render: (permissions) => renderPermission(permissions),
    },
    {
        title: "最大参加团队数量",
        dataIndex: "maxTeamNum",
        key: "maxTeamNum",
    },
    {
        title: "描述",
        dataIndex: "decs",
        key: "decs",
    },
]
export const expandedRowRender = (record) => {
    return (
        <>
            <h4>Permission</h4>
            {renderPermission(record.permission)}
            <h4>Children</h4>
            {record.children && record.children.length > 0 ? (
                <Table columns={groupDetailsColumns} dataSource={record.children} pagination={false} />
            ) : (
                "无"
            )}
        </>
    );
};
