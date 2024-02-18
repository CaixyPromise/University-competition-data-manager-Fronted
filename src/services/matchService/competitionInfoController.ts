// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMatchInfo POST /api/competition/Competition/add */
export async function addMatchInfoUsingPOST(
  body: API.MatchInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/competition/Competition/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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
