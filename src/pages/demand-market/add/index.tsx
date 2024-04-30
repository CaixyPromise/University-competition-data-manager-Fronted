import React from "react";
import {PageContainer, ProForm, ProFormDigit, ProFormText} from "@ant-design/pro-components";
import ProFormDatePicker from "@ant-design/pro-form/es/components/DatePicker/DatePicker";
import moment from "moment";


const CreateDemand: React.FC = () =>
{
    const [ form ] = ProForm.useForm();
    const onFinish = async (values: any) => {
        console.log(values);
    }


    return <>
        <PageContainer
            title={'发布需求信息'}
        >
            <ProForm
                onFinish={onFinish}
                title={'发布需求信息'}
                form={form}
            >
                <ProFormText
                    name="title"
                    label="需求标题"
                    rules={[{ required: true, message: '请输入需求标题' }]}
                />
                <ProFormText
                    name="description"
                    label="需求描述"
                    rules={[{ required: true, message: '请输入需求描述' }]}
                />
                <ProFormDigit
                    name="reward"
                    label="报酬"
                    rules={[{ required: true, message: '请输入报酬' }]}
                    min={0}
                    fieldProps={{ precision: 2 }} // 设置小数点后两位
                />
                <ProFormDatePicker
                    name="deadline"
                    label="截止日期"
                    rules={[{ required: true, message: '请选择截止日期' }]}
                    initialValue={moment()} // 默认值为当前日期
                />
            </ProForm>
        </PageContainer>
    </>
}

export default CreateDemand;