// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteComment POST /api/content/comment/delete */
export async function deleteCommentUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/content/comment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getReplyInfo POST /api/content/comment/get/reply */
export async function getReplyInfoUsingPOST(
  body: API.GetReplyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCommentVO_>('/api/content/comment/get/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMainCommentByRaceId POST /api/content/comment/list/main */
export async function listMainCommentByRaceIdUsingPOST(
  body: API.ListCommentByIdPage,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCommentVO_>('/api/content/comment/list/main', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** sendCommentByRaceId POST /api/content/comment/post */
export async function sendCommentByRaceIdUsingPOST(
  body: API.AddCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/content/comment/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** sendReplyByCommentId POST /api/content/comment/post/reply */
export async function sendReplyByCommentIdUsingPOST(
  body: API.ReplyCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/content/comment/post/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
