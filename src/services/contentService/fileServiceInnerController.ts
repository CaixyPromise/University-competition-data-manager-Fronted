// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** uploadFile POST /api/content/inner/file/upload */
export async function uploadFileUsingPOST(
  body: API.FileUploadInnerRequest,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/content/inner/file/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
