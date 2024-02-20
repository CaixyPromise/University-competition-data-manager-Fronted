declare namespace API {
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

  type getByIdUsingGET1Params = {
    /** userId */
    userId: number;
  };

  type getDepartmentInfoVOByIdUsingGET1Params = {
    /** id */
    id: number;
  };

  type getMajorInfoVOByIdUsingGET1Params = {
    /** id */
    id?: number;
  };

  type getMajorUnderDepartmentUsingGET1Params = {
    /** departmentId */
    departmentId: number;
  };

  type getUserByIdUsingGET1Params = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGET1Params = {
    /** id */
    id?: number;
  };

  type listByIdsUsingGET1Params = {
    /** idList */
    idList: number[];
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
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

  type MatchInfoAddRequest = {
    hasFileList?: boolean;
    matchDate?: string[];
    matchDesc?: string;
    matchLevel?: string;
    matchLogo?: string;
    matchName?: string;
    matchPermissionRule?: MatchPermission[][];
    matchReward?: MatchReward[];
    matchRule?: string;
    matchStatus?: number;
    matchTags?: string[];
    matchType?: string;
    maxTeamSize?: number;
    minTeamSize?: number;
    signupDate?: string[];
  };

  type MatchInfoQueryRequest = {
    current?: number;
    matchName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MatchInfoQueryVO = {
    endTime?: string;
    id?: number;
    matchAward?: Record<string, any>;
    matchDesc?: string;
    matchLevel?: string;
    matchName?: string;
    matchPermissionRule?: Record<string, any>;
    matchPic?: string;
    matchRule?: string;
    matchStatus?: number;
    matchTags?: Record<string, any>;
    matchType?: string;
    startTime?: string;
    teamSize?: number;
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

  type MatchReward = {
    rewardContent?: string;
    rewardCount?: number;
    rewardDesc?: string;
    rewardName?: string;
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
    userTags?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
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
    userPassword?: string;
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

  type View = {
    contentType?: string;
  };
}
