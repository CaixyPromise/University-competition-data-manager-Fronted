// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createAnnounceByRaceId POST /api/content/announce/create */
export async function createAnnounceByRaceIdUsingPOST(
  body: API.CreateAnnounceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/content/announce/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteAnnounce POST /api/content/announce/delete */
export async function deleteAnnounceUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/content/announce/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listAnnounceByPage POST /api/content/announce/list/page */
export async function listAnnounceByPageUsingPOST(
  body: API.AnnouncePageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAnnounceVO_>('/api/content/announce/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateAnnounceByAnnounceId POST /api/content/announce/update */
export async function updateAnnounceByAnnounceIdUsingPOST(
  body: API.UpdateAnnounceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/content/announce/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
