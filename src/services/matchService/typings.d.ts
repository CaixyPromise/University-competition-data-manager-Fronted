declare namespace API {
  type AboutMeVO = {
    balance?: number;
    userAccount?: string;
    userAvatar?: string;
    userDepartment?: string;
    userEmail?: string;
    userId?: number;
    userMajor?: string;
    userName?: string;
    userProfile?: string;
    userSex?: string;
    userTags?: string[];
  };

  type BaseResponseAboutMeVO_ = {
    code?: number;
    data?: AboutMeVO;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseDepartmentInfoVO_ = {
    code?: number;
    data?: DepartmentInfoVO;
    message?: string;
  };

  type BaseResponseDepartmentWithMajorsVO_ = {
    code?: number;
    data?: DepartmentWithMajorsVO;
    message?: string;
  };

  type BaseResponseListDepartmentWithMajorsVO_ = {
    code?: number;
    data?: DepartmentWithMajorsVO[];
    message?: string;
  };

  type BaseResponseListMyCreateRaceVO_ = {
    code?: number;
    data?: MyCreateRaceVO[];
    message?: string;
  };

  type BaseResponseListSearchUserVO_ = {
    code?: number;
    data?: SearchUserVO[];
    message?: string;
  };

  type BaseResponseListTeamInfoVO_ = {
    code?: number;
    data?: TeamInfoVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseMajorInfoVO_ = {
    code?: number;
    data?: MajorInfoVO;
    message?: string;
  };

  type BaseResponseMatchInfoProfileVO_ = {
    code?: number;
    data?: MatchInfoProfileVO;
    message?: string;
  };

  type BaseResponseMatchRegistrationVO_ = {
    code?: number;
    data?: MatchRegistrationVO;
    message?: string;
  };

  type BaseResponsePageDepartmentInfo_ = {
    code?: number;
    data?: PageDepartmentInfo_;
    message?: string;
  };

  type BaseResponsePageMajorInfoWithDepartmentQueryVO_ = {
    code?: number;
    data?: PageMajorInfoWithDepartmentQueryVO_;
    message?: string;
  };

  type BaseResponsePageMatchInfoQueryVO_ = {
    code?: number;
    data?: PageMatchInfoQueryVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserDepartmentMajorVO_ = {
    code?: number;
    data?: PageUserDepartmentMajorVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type DepartAndMajorValidationResponse = {
    isValid?: boolean;
  };

  type DepartmentInfo = {
    createTime?: string;
    createUserId?: number;
    id?: number;
    isDelete?: number;
    name?: string;
    updateTime?: string;
  };

  type DepartmentInfoAddRequest = {
    name?: string;
  };

  type DepartmentInfoQueryRequest = {
    createTime?: string;
    createUserId?: number;
    current?: number;
    id?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
  };

  type DepartmentInfoUpdateRequest = {
    id?: number;
    name?: string;
  };

  type DepartmentInfoVO = {
    majors?: string[];
    name?: string;
  };

  type DepartmentWithMajorsVO = {
    departmentId?: number;
    departmentName?: string;
    majors?: MajorInnerInfo[];
  };

  type getByAccountUsingGETParams = {
    /** userId */
    userId: string;
  };

  type getByIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getDepartmentInfoVOByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getMajorInfoVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getMajorUnderDepartmentUsingGETParams = {
    /** departmentId */
    departmentId: number;
  };

  type getMatchInfoUsingGETParams = {
    /** id */
    id: number;
  };

  type getMatchInfoUsingGET3Params = {
    /** matchId */
    matchId: number;
  };

  type getRegisterTeamListByRaceIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserWalletUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getUserWorkVOUsingGETParams = {
    /** userId */
    userId: number;
  };

  type GroupDataItem = {
    children?: GroupDataItem[];
    decs?: string;
    id?: number;
    index?: number;
    maxTeamNum?: number;
    parentGroupName?: string;
    permission?: Option[][];
  };

  type HashMapStringString_ = true;

  type HashMapStringString_1 = true;

  type HashMapStringString_2 = true;

  type isExistByIdUsingGETParams = {
    /** matchId */
    matchId: number;
  };

  type listByIdsUsingGETParams = {
    /** idList */
    idList: number[];
  };

  type LoginUserVO = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MajorInfoAddRequest = {
    departmentId?: number;
    name?: string;
  };

  type MajorInfoQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MajorInfoUpdateRequest = {
    departId?: number;
    id?: number;
    name?: string;
  };

  type MajorInfoVO = {
    departmentId?: number;
    departmentName?: string;
    majorId?: number;
    name?: string;
  };

  type MajorInfoWithDepartmentQueryVO = {
    createTime?: string;
    createUserId?: number;
    departmentId?: string;
    departmentName?: string;
    majorId?: number;
    majorName?: string;
    updateTime?: string;
  };

  type MajorInnerInfo = {
    majorId?: number;
    majorName?: string;
  };

  type MatchAward = {
    awardContent?: string;
    awardCount?: number;
    awardDesc?: string;
    awardName?: string;
  };

  type MatchInfoAddRequest = {
    fileList?: string[];
    groupData?: GroupDataItem[];
    matchAward?: MatchAward[];
    matchDate?: string[];
    matchDesc?: string;
    matchLevel?: string;
    matchName?: string;
    matchPermissionRule?: MatchPermission[][];
    matchRule?: string;
    matchStatus?: number;
    matchTags?: string[];
    matchType?: string;
    maxTeamSize?: number;
    minTeamSize?: number;
    signupDate?: string[];
    teacherSize?: number[];
    teamSize?: number[];
  };

  type MatchInfoProfileVO = {
    createUserInfo?: UserWorkVO;
    endTime?: string;
    groupData?: GroupDataItem[];
    id?: number;
    matchAward?: MatchAward[];
    matchDesc?: string;
    matchLevel?: string;
    matchName?: string;
    matchPermissionRule?: Record<string, any>;
    matchPic?: string;
    matchRule?: string;
    matchStatus?: number;
    matchTags?: string[];
    matchType?: string;
    maxTeacherSize?: number;
    maxTeamSize?: number;
    minTeacherSize?: number;
    minTeamSize?: number;
    signUpEndTime?: string;
    signUpStartTime?: string;
    startTime?: string;
  };

  type MatchInfoQueryRequest = {
    current?: number;
    id?: number;
    matchName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MatchInfoQueryVO = {
    createUserInfo?: UserWorkVO;
    endTime?: string;
    groupData?: GroupDataItem[];
    id?: number;
    matchAward?: MatchAward[];
    matchDesc?: string;
    matchLevel?: string;
    matchName?: string;
    matchPermissionRule?: Record<string, any>;
    matchPic?: string;
    matchRule?: string;
    matchStatus?: number;
    matchTags?: string[];
    matchType?: string;
    maxTeacherSize?: number;
    maxTeamSize?: number;
    minTeacherSize?: number;
    minTeamSize?: number;
    signUpEndTime?: string;
    signUpStartTime?: string;
    startTime?: string;
  };

  type MatchInfoUpdateRequest = {
    endTime?: string;
    id?: number;
    matchAward?: Record<string, any>;
    matchDesc?: string;
    matchLevel?: string;
    matchName?: string;
    matchPermissionRule?: MatchPermission;
    matchPic?: string;
    matchRule?: string;
    matchStatus?: number;
    matchTags?: Record<string, any>;
    matchType?: string;
    startTime?: string;
    teamSize?: number;
  };

  type MatchPermission = {
    children?: MatchPermission[];
    label?: string;
    value?: string;
  };

  type MatchRegistrationVO = {
    groupData?: GroupDataItem[];
    id?: string;
    matchName?: string;
    maxTeacherSize?: number;
    maxTeamSize?: number;
    minTeacherSize?: number;
    minTeamSize?: number;
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

  type MyCreateRaceVO = {
    endTime?: string;
    hasRegistrationNum?: number;
    id?: number;
    matchName?: string;
    matchStatus?: number;
    signUpEndTime?: string;
    signUpStartTime?: string;
    startTime?: string;
  };

  type Option = {
    children?: Option[];
    key?: string;
    label?: string;
    value?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageDepartmentInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DepartmentInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMajorInfoWithDepartmentQueryVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MajorInfoWithDepartmentQueryVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMatchInfoQueryVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MatchInfoQueryVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserDepartmentMajorVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserDepartmentMajorVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type RegistrationRaceRequest = {
    raceId?: number;
    teamId?: number;
  };

  type SearchUserVO = {
    userAccount?: string;
    userDepartment?: string;
    userId?: number;
    userMajor?: string;
    userName?: string;
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

  type updateWalletUsingGETParams = {
    /** add */
    add: number;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userDepartment?: number;
    userEmail?: string;
    userMajor?: number;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
    userRoleLevel?: number;
    userSex?: number;
    userTags?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userDepartment?: number;
    userEmail?: string;
    userMajor?: number;
    userPhone?: string;
    userRole?: number;
    userSex?: number;
  };

  type UserDepartmentMajorVO = {
    createTime?: string;
    departmentName?: string;
    id?: number;
    majorName?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userEmail?: string;
    userName?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserDetailsQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userDepartment?: number;
    userEmail?: string;
    userMajor?: number;
    userPassword?: string;
    userPhone?: string;
    userSex?: number;
  };

  type UserSearchRequest = {
    useKeyword?: string;
    userPermissionIds?: number[];
    userRole?: string;
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

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserWallet = {
    balance?: number;
    frozenBalance?: number;
    id?: number;
    isDelete?: number;
    payPassword?: string;
    updateTime?: string;
    userId?: number;
  };

  type UserWorkVO = {
    userAccount?: string;
    userDepartment?: string;
    userEmail?: string;
    userId?: number;
    userMajor?: string;
    userName?: string;
  };

  type View = {
    contentType?: string;
  };
}
