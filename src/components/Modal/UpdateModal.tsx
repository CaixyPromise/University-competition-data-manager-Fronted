import {updateUserUsingPOST} from '@/services/userService/userController';
import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
import React from 'react';

interface Props
{
    defaultValue?: API.User;
    visible: boolean;
    columns: ProColumns<API.User>[];
    onSubmit: (values: API.UserAddRequest) => void;
    onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) =>
{
    const hide = message.loading('正在更新');
    try
    {
        await updateUserUsingPOST(fields);
        hide();
        message.success('更新成功');
        return true;
    }
    catch (error: any)
    {
        hide();
        message.error('更新失败，' + error.message);
        return false;
    }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) =>
{
    const { defaultValue, visible, columns, onSubmit, onCancel } = props;

    if (!defaultValue)
    {
        return <></>;
    }

    return (
        <Modal
            destroyOnClose
            title={'更新'}
            open={visible}
            footer={null}
            onCancel={() =>
            {
                onCancel?.();
            }}
        >
            <ProTable
                type="form"
                columns={columns}
                form={{
                    initialValues: defaultValue,
                }}
                onSubmit={async (values: API.UserAddRequest) =>
                {
                    const success = await handleUpdate({
                        ...values,
                        id: defaultValue.id as any,
                    });
                    if (success)
                    {
                        onSubmit?.(values);
                    }
                }}
            />
        </Modal>
    );
};
export default UpdateModal;
