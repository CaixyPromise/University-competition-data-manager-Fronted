
export interface UserItem
{
    label: string;
    value: string;
}

export interface StepDataType
{
    matchId?: string;
    matchName?: string;
    teamName?: string;
    teamDescription?: string;
    matchCategoryId?: string;
    matchEventId?: string;
    matchGroupName?: string;
    matchSportName?: string;
    matchTeamSize?: number;
    teammates?: UserItem[];
    teachers?: UserItem[]
    teamPassword?: string;
    teamIsPublic?: boolean;
}

export interface StepDataTypeOne
{
    teamName: string,
    teamDescription: string,
    groupId: string,
    eventId, string
}

export interface StepDataTypeTwo
{
    isPublic: 0 | 1;
    password?: string;
    teamSize: number;
}


export type CurrentTypes = 'base' | 'confirm' | 'result';
