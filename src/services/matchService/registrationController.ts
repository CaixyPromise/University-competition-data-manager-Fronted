// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** signUpRace POST /api/competition/registration/sign */
export async function signUpRaceUsingPOST(
  body: API.RegistrationRaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/competition/registration/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getRegisterTeamListByRaceId GET /api/competition/registration/teamList */
export async function getRegisterTeamListByRaceIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRegisterTeamListByRaceIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListTeamInfoVO_>('/api/competition/registration/teamList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
