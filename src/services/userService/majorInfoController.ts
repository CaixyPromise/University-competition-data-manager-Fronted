// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMajorInfo POST /api/user/major/add */
export async function addMajorInfoUsingPOST(
  body: API.MajorInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/user/major/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMajorInfo POST /api/user/major/delete */
export async function deleteMajorInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/major/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAllDepartmentAndMajor GET /api/user/major/get/all */
export async function getAllDepartmentAndMajorUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDepartmentWithMajorsVO_>('/api/user/major/get/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getMajorInfoVOById GET /api/user/major/get/vo */
export async function getMajorInfoVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMajorInfoVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMajorInfoVO_>('/api/user/major/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMajorInfoByPage POST /api/user/major/list/page */
export async function listMajorInfoByPageUsingPOST(
  body: API.MajorInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMajorInfoWithDepartmentQueryVO_>('/api/user/major/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMajorInfo POST /api/user/major/update */
export async function updateMajorInfoUsingPOST(
  body: API.MajorInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/major/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
