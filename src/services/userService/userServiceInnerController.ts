// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getByAccount GET /api/user/inner/get/account */
export async function getByAccountUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByAccountUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.User>('/api/user/inner/get/account', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByAccount GET /api/user/inner/get/account/list */
export async function listUserByAccountUsingGET(body: string[], options?: { [key: string]: any }) {
  return request<API.User[]>('/api/user/inner/get/account/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getById GET /api/user/inner/get/id */
export async function getByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.User>('/api/user/inner/get/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserWorkVO GET /api/user/inner/get/id/workVO */
export async function getUserWorkVoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserWorkVOUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.UserWorkVO>('/api/user/inner/get/id/workVO', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listByIds GET /api/user/inner/get/ids */
export async function listByIdsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listByIdsUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.User[]>('/api/user/inner/get/ids', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserWorksByIds POST /api/user/inner/get/ids/workVO */
export async function getUserWorksByIdsUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.UserWorkVO[]>('/api/user/inner/get/ids/workVO', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** validateDepartmentsAndMajors POST /api/user/inner/validate/departments-and-majors */
export async function validateDepartmentsAndMajorsUsingPOST(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<API.DepartAndMajorValidationResponse>(
    '/api/user/inner/validate/departments-and-majors',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** validateUsers POST /api/user/inner/validate/users */
export async function validateUsersUsingPOST(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/api/user/inner/validate/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
