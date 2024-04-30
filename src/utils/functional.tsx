import {message} from "antd";

// 还没有实现功能的预留函数接口
export const UNIMPLEMENTED = async (name:string) =>
{
    message.info(`${name ?? "该功能"}正在开发中，敬请期待:)`)
}

export const copyTextToClipboard = async (text:string) =>
{
    try
    {
        await navigator.clipboard.writeText(text);
        message.success('复制成功')
    }
    catch (err)
    {
        message.error('复制失败')
    }
};

export const sendEmail = async (to:string, subject:string) =>
{
    window.location.href = `mailto:${to}?subject=${subject}`
}