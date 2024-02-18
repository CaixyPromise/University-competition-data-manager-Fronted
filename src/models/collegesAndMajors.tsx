import {getAllDepartmentAndMajorUsingGET} from "@/services/userService/majorInfoController";
import {useEffect, useState} from "react";

const useCollegesAndMajors = () =>
{
    const [ collegesAndMajors, setCollegesAndMajors ] = useState({});

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await getAllDepartmentAndMajorUsingGET();
            if (response.data)
            {
                const transformedData = response.data.reduce((acc, department) =>
                {
                    // 专业信息majors转换为键值对
                    // @ts-ignore
                    const majorsObject = department.majors.reduce(
                        (majAcc, major) =>
                        {
                            // @ts-ignore
                            majAcc[String(major.majorId)] = major.majorName;
                            return majAcc;
                        }, {});

                    // 学院信息添加到累加器对象
                    // @ts-ignore
                    acc[String(department.departmentId)] =
                        {
                            name: department.departmentName,
                            majors: majorsObject,
                        };

                    return acc;
                }, {});

                setCollegesAndMajors(transformedData);
            }
            else
            {
                setCollegesAndMajors({});
            }

        };
        fetchData();
    }, []);

    return {
        collegesAndMajors,
    };
};

export default useCollegesAndMajors;