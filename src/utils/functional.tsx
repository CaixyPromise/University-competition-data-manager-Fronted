
import {message} from "antd";

// 还没有实现功能的预留函数接口
export const UNIMPLEMENTED = async ({name} : {name?:string}) =>
{
    message.info(`${name ?? "该功能"}正在开发中，敬请期待:)`)
}