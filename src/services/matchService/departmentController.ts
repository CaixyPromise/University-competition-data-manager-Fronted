// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addDepartmentInfo POST /api/competition/department/add */
export async function addDepartmentInfoUsingPOST(
  body: API.DepartmentInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/competition/department/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDepartmentInfo POST /api/competition/department/delete */
export async function deleteDepartmentInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/department/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getDepartmentInfoVOById GET /api/competition/department/get/vo */
export async function getDepartmentInfoVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDepartmentInfoVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDepartmentInfoVO_>('/api/competition/department/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getMajorUnderDepartment GET /api/competition/department/get/vo/department-major */
export async function getMajorUnderDepartmentUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMajorUnderDepartmentUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDepartmentWithMajorsVO_>(
    '/api/competition/department/get/vo/department-major',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** listDepartmentInfoByPage POST /api/competition/department/list/page */
export async function listDepartmentInfoByPageUsingPOST(
  body: API.DepartmentInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDepartmentInfo_>('/api/competition/department/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateDepartmentInfo POST /api/competition/department/update */
export async function updateDepartmentInfoUsingPOST(
  body: API.DepartmentInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/department/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
