// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** errorHtml GET /api/team/error */
export async function errorHtmlUsingGet(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/team/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** errorHtml PUT /api/team/error */
export async function errorHtmlUsingPut(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/team/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** errorHtml POST /api/team/error */
export async function errorHtmlUsingPost(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/team/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** errorHtml DELETE /api/team/error */
export async function errorHtmlUsingDelete(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/team/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** errorHtml PATCH /api/team/error */
export async function errorHtmlUsingPatch(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/team/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
