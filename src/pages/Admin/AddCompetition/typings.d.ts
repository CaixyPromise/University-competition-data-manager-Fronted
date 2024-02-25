import React from "react";

declare namespace AddMatchTypes
{

    type GroupDataItem = {
        id?: React.Key;
        parentGroupName?: string;
        permission?: "yes" | "no";
        maxTeamNum?: number;
        decs?: string;
        children?: GroupDataItem[];
    };

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

    type AwardItemType = {
        id: React.Key;
        awardName: string;
        awardContent: string;
        awardDesc: string;
    }
}

