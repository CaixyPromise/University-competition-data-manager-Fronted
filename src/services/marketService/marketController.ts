// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** acceptDemandTake POST /api/market/accept */
export async function acceptDemandTakeUsingPOST(
  body: API.UpdateDemandStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/market/accept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addDemands POST /api/market/add */
export async function addDemandsUsingPOST(
  body: API.DemandAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/market/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** applyForDemand POST /api/market/apply */
export async function applyForDemandUsingPOST(
  body: API.UpdateDemandStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/market/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** completeDemand POST /api/market/complete */
export async function completeDemandUsingPOST(
  body: API.UpdateDemandStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/market/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDemandsById POST /api/market/delete */
export async function deleteDemandsByIdUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/market/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getDemandVOById GET /api/market/get/vo */
export async function getDemandVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDemandVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDemandProfileVO_>('/api/market/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getHealth GET /api/market/health */
export async function getHealthUsingGET(options?: { [key: string]: any }) {
  return request<string>('/api/market/health', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listMyDemandVOByPage POST /api/market/list/page/my/vo */
export async function listMyDemandVoByPageUsingPOST(
  body: API.DemandQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDemandVO_>('/api/market/list/page/my/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listDemandVOByPage POST /api/market/list/page/vo */
export async function listDemandVoByPageUsingPOST(
  body: API.DemandQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDemandVO_>('/api/market/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** rejectDemandTake POST /api/market/reject */
export async function rejectDemandTakeUsingPOST(
  body: API.UpdateDemandStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/market/reject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateDemand POST /api/market/update */
export async function updateDemandUsingPOST(
  body: API.DemandUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/market/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
