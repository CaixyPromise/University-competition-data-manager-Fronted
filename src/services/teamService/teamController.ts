// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addTeam POST /api/team/team/add */
export async function addTeamUsingPOST(body: API.TeamAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/team/team/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTeam POST /api/team/team/delete */
export async function deleteTeamUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/team/team/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTeamById GET /api/team/team/get/info */
export async function getTeamByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTeamByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTeamInfoVO_>('/api/team/team/get/info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** joinTeam POST /api/team/team/join */
export async function joinTeamUsingPOST(
  body: API.TeamJoinRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/team/team/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** handleRejectJoinTeam POST /api/team/team/join/reject */
export async function handleRejectJoinTeamUsingPOST(
  body: API.ResolveAndRejectRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/team/team/join/reject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** handleResolveJoinTeam POST /api/team/team/join/resolve */
export async function handleResolveJoinTeamUsingPOST(
  body: API.ResolveAndRejectRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/team/team/join/resolve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTeams GET /api/team/team/list */
export async function listTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListTeamUserVO_>('/api/team/team/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMyCreateTeams GET /api/team/team/list/my/create */
export async function listMyCreateTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMyCreateTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListTeamInfoVO_>('/api/team/team/list/my/create', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMyJoinTeams GET /api/team/team/list/my/join */
export async function listMyJoinTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMyJoinTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListTeamInfoVO_>('/api/team/team/list/my/join', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listTeamsByPage GET /api/team/team/list/page */
export async function listTeamsByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTeamsByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTeamInfoPageVO_>('/api/team/team/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** quitTeam POST /api/team/team/quit */
export async function quitTeamUsingPOST(
  body: API.TeamQuitRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/team/team/quit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTeam POST /api/team/team/update */
export async function updateTeamUsingPOST(
  body: API.TeamUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/team/team/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
