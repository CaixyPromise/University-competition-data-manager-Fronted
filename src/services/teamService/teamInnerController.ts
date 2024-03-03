// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getTeamProfileInfoById GET /api/team/inner/getById */
export async function getTeamProfileInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTeamProfileInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.TeamInfoVO>('/api/team/inner/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** register POST /api/team/inner/register */
export async function registerUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.registerUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/team/inner/register', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
