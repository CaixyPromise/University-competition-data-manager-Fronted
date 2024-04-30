// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getByAccount GET /api/competition/inner/get/account */
export async function getByAccountUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByAccountUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.User>('/api/competition/inner/get/account', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByAccount GET /api/competition/inner/get/account/list */
export async function listUserByAccountUsingGET(body: string[], options?: { [key: string]: any }) {
  return request<API.User[]>('/api/competition/inner/get/account/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getBothUserWallet POST /api/competition/inner/get/both/wallet */
export async function getBothUserWalletUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/competition/inner/get/both/wallet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getById GET /api/competition/inner/get/id */
export async function getByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.User>('/api/competition/inner/get/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserWorkVO GET /api/competition/inner/get/id/workVO */
export async function getUserWorkVoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserWorkVOUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.UserWorkVO>('/api/competition/inner/get/id/workVO', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listByIds GET /api/competition/inner/get/ids */
export async function listByIdsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listByIdsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.User[]>('/api/competition/inner/get/ids', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserWorksByIds POST /api/competition/inner/get/ids/workVO */
export async function getUserWorksByIdsUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.UserWorkVO[]>('/api/competition/inner/get/ids/workVO', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserWallet GET /api/competition/inner/get/wallet */
export async function getUserWalletUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserWalletUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.UserWallet>('/api/competition/inner/get/wallet', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getDepartmentInfoByIdsAndUpdateCache POST /api/competition/inner/update/departemtCache */
export async function getDepartmentInfoByIdsAndUpdateCacheUsingPOST(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/competition/inner/update/departemtCache', {
    method: 'POST',
    ...(options || {}),
  });
}

/** updateUserWallet POST /api/competition/inner/update/wallet */
export async function updateUserWalletUsingPOST(
  body: API.UserWallet,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/competition/inner/update/wallet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** validateDepartmentsAndMajors POST /api/competition/inner/validate/departments-and-majors */
export async function validateDepartmentsAndMajorsUsingPOST(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<API.DepartAndMajorValidationResponse>(
    '/api/competition/inner/validate/departments-and-majors',
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

/** validateUsers POST /api/competition/inner/validate/users */
export async function validateUsersUsingPOST(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/api/competition/inner/validate/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
