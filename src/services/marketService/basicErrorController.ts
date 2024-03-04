// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** errorHtml GET /api/market/error */
export async function errorHtmlUsingGET(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/market/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** errorHtml PUT /api/market/error */
export async function errorHtmlUsingPut(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/market/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** errorHtml POST /api/market/error */
export async function errorHtmlUsingPOST(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/market/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** errorHtml DELETE /api/market/error */
export async function errorHtmlUsingDelete(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/market/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** errorHtml PATCH /api/market/error */
export async function errorHtmlUsingPatch(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/market/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
