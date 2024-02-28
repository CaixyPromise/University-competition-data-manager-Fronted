import {ProColumns} from "@ant-design/pro-components";

export type AdvancedOperation1 = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export type AdvancedOperation2 = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export type AdvancedOperation3 = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export interface AdvancedProfileData
{
    advancedOperation1?: AdvancedOperation1[];
    advancedOperation2?: AdvancedOperation2[];
    advancedOperation3?: AdvancedOperation3[];
}


export const userInfoColumn: ProColumns<API.UserTeamWorkVO>[] = [
    {
        title: "学号",
        dataIndex: "userAccount",
        key: "userAccount"
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "专业",
        dataIndex: "userMajor",
        key: "userMajor"
    },
    {
        title: "学院",
        dataIndex: "userDepartment",
        key: "userDepartment"
    },
    {
        title: "邮箱",
        dataIndex: "userEmail",
        key: "userEmail"
    }
]
