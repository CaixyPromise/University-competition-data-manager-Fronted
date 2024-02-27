// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** errorHtml GET /api/competition/error */
export async function errorHtmlUsingGET(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/competition/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** errorHtml PUT /api/competition/error */
export async function errorHtmlUsingPut1(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/competition/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** errorHtml POST /api/competition/error */
export async function errorHtmlUsingPOST(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/competition/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** errorHtml DELETE /api/competition/error */
export async function errorHtmlUsingDelete1(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/competition/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** errorHtml PATCH /api/competition/error */
export async function errorHtmlUsingPatch1(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/competition/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
