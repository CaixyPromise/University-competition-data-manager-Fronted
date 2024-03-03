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
