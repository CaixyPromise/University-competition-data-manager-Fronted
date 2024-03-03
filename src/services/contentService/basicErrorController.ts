// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** error GET /api/content/error */
export async function errorUsingGET(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/content/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** error PUT /api/content/error */
export async function errorUsingPut(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/content/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** error POST /api/content/error */
export async function errorUsingPOST(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/content/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** error DELETE /api/content/error */
export async function errorUsingDelete(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/content/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** error PATCH /api/content/error */
export async function errorUsingPatch(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/content/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
