// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** error GET /api/team/error */
export async function errorUsingGet(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/team/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** error PUT /api/team/error */
export async function errorUsingPut(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/team/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** error POST /api/team/error */
export async function errorUsingPost(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/team/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** error DELETE /api/team/error */
export async function errorUsingDelete(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/team/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** error PATCH /api/team/error */
export async function errorUsingPatch(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/team/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
