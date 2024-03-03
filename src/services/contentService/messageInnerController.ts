// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteByRelationId POST /api/content/inner/message/delete */
export async function deleteByRelationIdUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/content/inner/message/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** sendById POST /api/content/inner/message/send */
export async function sendByIdUsingPOST(
  body: API.SendMessageDTO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/content/inner/message/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
