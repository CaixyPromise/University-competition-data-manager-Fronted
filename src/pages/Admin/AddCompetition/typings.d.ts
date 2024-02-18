import React from "react";

declare namespace AddMatchTypes
{

    type option = {
        label: string,
        value: string,
        children?: option[] | any;
    }

    interface Major
    {
        [key: string]: string;
    }

    interface College
    {
        name: string;
        majors: Major;
    }

    interface Colleges
    {
        [key: string]: College;
    }

    interface CascaderOption
    {
        label: string;
        value: string;
        children?: CascaderOption[];
    }

// 定义表格行类型
    type TableRecordType = {
        id: React.Key;
        collegeId?: string;
        majorId?: string;
        children?: TableRecordType[];
    };

    type RewardItemType = {
        id: React.Key;
        rewardName: string;
        rewardContent: string;
        rewardDesc: string;
    }
}

