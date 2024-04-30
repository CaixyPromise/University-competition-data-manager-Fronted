// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getMatchInfo GET /api/competition/inner/get */
export async function getMatchInfoUsingGET3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMatchInfoUsingGET3Params,
  options?: { [key: string]: any },
) {
  return request<API.MatchInfoProfileVO>('/api/competition/inner/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** isExistById GET /api/competition/inner/get/exist */
export async function isExistByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isExistByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/competition/inner/get/exist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getMatchInfoByIds POST /api/competition/inner/get/nameByIds */
export async function getMatchInfoByIdsUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/competition/inner/get/nameByIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
