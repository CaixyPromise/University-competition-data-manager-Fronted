import type FC from "react";
import {Cascader} from "antd";
import React from "react";
import {AddMatchTypes} from "@/pages/Admin/AddCompetition/typings";
import {useModel} from "@@/exports";

const ChoiceCollegeCascader = ({setOption, placeholder}) =>
{
    const { collegesAndMajors } = useModel('collegesAndMajors');

    const transformToCascadesOptions = (
        colleges: AddMatchTypes.Colleges,
    ): AddMatchTypes.CascaderOption[] =>
    {
        return Object.entries(colleges).map(([ collegeId, { name, majors } ]) => ({
            label: name,
            value: collegeId,
            key: (Math.random() * 1000000).toFixed(0),
            children: Object.entries(majors).map(([ majorId, majorName ]) => ({
                label: majorName,
                value: majorId,
            })),
        }));
    };
    const options: AddMatchTypes.option[] = transformToCascadesOptions(collegesAndMajors);

    return <Cascader
        style={{ width: '100%' }}
        options={options}
        // @ts-ignore
        onChange={(_: string[][], selectOptions) =>
        {
            setOption(selectOptions);
        }}
        placeholder={placeholder}
        multiple
        maxTagCount="responsive"
    />
}

export default ChoiceCollegeCascader;