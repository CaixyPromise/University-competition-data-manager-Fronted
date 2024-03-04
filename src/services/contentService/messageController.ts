// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteMessageById POST /api/content/message/delete */
export async function deleteMessageByIdUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMessageByIdUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/notice/message/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getMessageInfo GET /api/content/message/get */
export async function getMessageInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMessageInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMessageVO_>('/api/notice/message/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
