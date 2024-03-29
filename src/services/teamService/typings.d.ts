declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListTeamInfoVO_ = {
    code?: number;
    data?: TeamInfoVO[];
    message?: string;
  };

  type BaseResponseListTeamUserVO_ = {
    code?: number;
    data?: TeamUserVO[];
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageTeamInfoPageVO_ = {
    code?: number;
    data?: PageTeamInfoPageVO_;
    message?: string;
  };

  type BaseResponseTeamInfoVO_ = {
    code?: number;
    data?: TeamInfoVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getTeamByIdUsingGETParams = {
    /** teamId */
    teamId: number;
  };

  type getTeamProfileInfoByIdUsingGETParams = {
    /** teamId */
    teamId: number;
  };

  type listMyCreateTeamsUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    idList?: number[];
    maxNum?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
    userRole?: number;
  };

  type listMyJoinTeamsUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    idList?: number[];
    maxNum?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
    userRole?: number;
  };

  type listTeamsByPageUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    idList?: number[];
    maxNum?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
    userRole?: number;
  };

  type listTeamsUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    idList?: number[];
    maxNum?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
    userRole?: number;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'CONTINUE'
      | 'SWITCHING_PROTOCOLS'
      | 'PROCESSING'
      | 'CHECKPOINT'
      | 'OK'
      | 'CREATED'
      | 'ACCEPTED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NO_CONTENT'
      | 'RESET_CONTENT'
      | 'PARTIAL_CONTENT'
      | 'MULTI_STATUS'
      | 'ALREADY_REPORTED'
      | 'IM_USED'
      | 'MULTIPLE_CHOICES'
      | 'MOVED_PERMANENTLY'
      | 'FOUND'
      | 'MOVED_TEMPORARILY'
      | 'SEE_OTHER'
      | 'NOT_MODIFIED'
      | 'USE_PROXY'
      | 'TEMPORARY_REDIRECT'
      | 'PERMANENT_REDIRECT'
      | 'BAD_REQUEST'
      | 'UNAUTHORIZED'
      | 'PAYMENT_REQUIRED'
      | 'FORBIDDEN'
      | 'NOT_FOUND'
      | 'METHOD_NOT_ALLOWED'
      | 'NOT_ACCEPTABLE'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUEST_TIMEOUT'
      | 'CONFLICT'
      | 'GONE'
      | 'LENGTH_REQUIRED'
      | 'PRECONDITION_FAILED'
      | 'PAYLOAD_TOO_LARGE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'URI_TOO_LONG'
      | 'REQUEST_URI_TOO_LONG'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'EXPECTATION_FAILED'
      | 'I_AM_A_TEAPOT'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'METHOD_FAILURE'
      | 'DESTINATION_LOCKED'
      | 'UNPROCESSABLE_ENTITY'
      | 'LOCKED'
      | 'FAILED_DEPENDENCY'
      | 'TOO_EARLY'
      | 'UPGRADE_REQUIRED'
      | 'PRECONDITION_REQUIRED'
      | 'TOO_MANY_REQUESTS'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'INTERNAL_SERVER_ERROR'
      | 'NOT_IMPLEMENTED'
      | 'BAD_GATEWAY'
      | 'SERVICE_UNAVAILABLE'
      | 'GATEWAY_TIMEOUT'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'VARIANT_ALSO_NEGOTIATES'
      | 'INSUFFICIENT_STORAGE'
      | 'LOOP_DETECTED'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'NOT_EXTENDED'
      | 'NETWORK_AUTHENTICATION_REQUIRED';
    view?: View;
    viewName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageTeamInfoPageVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TeamInfoPageVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type registerUsingPOSTParams = {
    /** teamId */
    teamId: number;
  };

  type ResolveAndRejectRequest = {
    raceId?: number;
    teamId?: number;
    userAccount?: string;
  };

  type TeamAddRequest = {
    matchCategoryId?: string;
    matchEventId?: string;
    matchId?: number;
    teachers?: number[];
    teamDescription?: string;
    teamMaxSize?: number;
    teamName?: string;
    teamPassword?: string;
    teamStatus?: number;
    teamTags?: string[];
    teammates?: number[];
  };

  type TeamInfoPageVO = {
    createTime?: string;
    currentUserNum?: number;
    description?: string;
    id?: number;
    isPublic?: number;
    maxNum?: number;
    name?: string;
    needPassword?: boolean;
    raceId?: number;
    raceName?: string;
    status?: number;
    teamTags?: string[];
  };

  type TeamInfoVO = {
    applyList?: UserTeamWorkVO[];
    categoryName?: string;
    eventName?: string;
    isApply?: boolean;
    isLeader?: boolean;
    isMember?: boolean;
    leaderId?: number;
    leaderInfo?: UserTeamWorkVO;
    matchLevel?: string;
    matchType?: string;
    needPassword?: boolean;
    raceId?: string;
    raceMaxNum?: number;
    raceMinNum?: number;
    raceName?: string;
    signUpEndTime?: string;
    teacherList?: UserTeamWorkVO[];
    teamCurrentNum?: number;
    teamDesc?: string;
    teamId?: string;
    teamMaxNum?: number;
    teamName?: string;
    teamTags?: string[];
    userList?: UserTeamWorkVO[];
  };

  type TeamJoinRequest = {
    password?: string;
    raceId?: number;
    teamId?: number;
  };

  type TeamQuitRequest = {
    teamId?: number;
  };

  type TeamUpdateRequest = {
    description?: string;
    expireTime?: string;
    id?: number;
    name?: string;
    password?: string;
    status?: number;
  };

  type TeamUserVO = {
    createTime?: string;
    createUser?: UserVO;
    description?: string;
    expireTime?: string;
    hasJoin?: boolean;
    hasJoinNum?: number;
    id?: number;
    maxNum?: number;
    name?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserTeamWorkVO = {
    teamId?: string;
    teamUserRole?: number;
    userAccount?: string;
    userDepartment?: string;
    userEmail?: string;
    userMajor?: string;
    userName?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type View = {
    contentType?: string;
  };
}
