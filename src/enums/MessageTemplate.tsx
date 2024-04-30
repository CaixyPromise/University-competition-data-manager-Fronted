import {BACKEND_HOST_LOCAL} from "@/constants";

export const InviteRace = (id: string) =>
{
    return `我正在参加这个比赛，一起来玩吧！${BACKEND_HOST_LOCAL}/competition/profile/${id}`
}