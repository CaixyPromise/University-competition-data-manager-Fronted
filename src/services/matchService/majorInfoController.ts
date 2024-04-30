// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMajorInfo POST /api/competition/major/add */
export async function addMajorInfoUsingPOST(
  body: API.MajorInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/competition/major/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMajorInfo POST /api/competition/major/delete */
export async function deleteMajorInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/major/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAllDepartmentAndMajor GET /api/competition/major/get/all */
export async function getAllDepartmentAndMajorUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDepartmentWithMajorsVO_>('/api/competition/major/get/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getMajorInfoVOById GET /api/competition/major/get/vo */
export async function getMajorInfoVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMajorInfoVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMajorInfoVO_>('/api/competition/major/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMajorInfoByPage POST /api/competition/major/list/page */
export async function listMajorInfoByPageUsingPOST(
  body: API.MajorInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMajorInfoWithDepartmentQueryVO_>(
    '/api/competition/major/list/page',
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

/** updateMajorInfo POST /api/competition/major/update */
export async function updateMajorInfoUsingPOST(
  body: API.MajorInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/major/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
