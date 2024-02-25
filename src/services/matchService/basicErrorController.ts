// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** error GET /api/competition/error */
export async function errorUsingGET(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/competition/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** error PUT /api/competition/error */
export async function errorUsingPut1(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/competition/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** error POST /api/competition/error */
export async function errorUsingPOST(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/competition/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** error DELETE /api/competition/error */
export async function errorUsingDelete1(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/competition/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** error PATCH /api/competition/error */
export async function errorUsingPatch1(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/competition/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
