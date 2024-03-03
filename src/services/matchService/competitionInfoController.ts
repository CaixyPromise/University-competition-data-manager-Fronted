// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加信息 添加信息接口 POST /api/competition/Competition/add */
export async function addMatchInfoUsingPOST(
  body: {
    /** 业务数据 */
    data: string;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseString_>('/api/competition/Competition/add', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** deleteMatchInfo POST /api/competition/Competition/delete */
export async function deleteMatchInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/Competition/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getMyCreateRaceByRequest GET /api/competition/Competition/get/myCreate */
export async function getMyCreateRaceByRequestUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMyCreateRaceVO_>('/api/competition/Competition/get/myCreate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getMatchInfo GET /api/competition/Competition/get/profile */
export async function getMatchInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMatchInfoUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMatchInfoProfileVO_>('/api/competition/Competition/get/profile', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getRegistrationInfo POST /api/competition/Competition/get/registration */
export async function getRegistrationInfoUsingPOST(
  body: number,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMatchRegistrationVO_>(
    '/api/competition/Competition/get/registration',
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

/** listMatchInfoByPage POST /api/competition/Competition/list/page */
export async function listMatchInfoByPageUsingPOST(
  body: API.MatchInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMatchInfoQueryVO_>('/api/competition/Competition/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMatchInfoByVoPage POST /api/competition/Competition/list/page/vo */
export async function listMatchInfoByVoPageUsingPOST(
  body: API.MatchInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMatchInfoQueryVO_>(
    '/api/competition/Competition/list/page/vo',
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

/** updateMatchInfo POST /api/competition/Competition/update */
export async function updateMatchInfoUsingPOST(
  body: API.MatchInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/Competition/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
