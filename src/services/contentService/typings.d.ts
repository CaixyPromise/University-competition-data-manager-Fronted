declare namespace API {
  type AddCommentRequest = {
    content?: string;
    raceId?: number;
  };

  type AnnouncePageRequest = {
    current?: number;
    pageSize?: number;
    raceId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type AnnounceVO = {
    content?: string;
    createTime?: string;
    createUser?: UserWorkVO;
    id?: number;
    title?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCommentVO_ = {
    code?: number;
    data?: CommentVO;
    message?: string;
  };

  type BaseResponsePageAnnounceVO_ = {
    code?: number;
    data?: PageAnnounceVO_;
    message?: string;
  };

  type BaseResponsePageCommentVO_ = {
    code?: number;
    data?: PageCommentVO_;
    message?: string;
  };

  type BaseResponsePageMessageVO_ = {
    code?: number;
    data?: PageMessageVO_;
    message?: string;
  };

  type CommentVO = {
    content?: string;
    createTime?: string;
    createUserInfo?: UserWorkVO;
    hasReply?: boolean;
    id?: number;
    parentId?: number;
    raceId?: number;
    replyCount?: number;
    userId?: number;
  };

  type CreateAnnounceRequest = {
    content?: string;
    matchId?: number;
    title?: string;
  };

  type deleteMessageByIdUsingPOSTParams = {
    id?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type FileUploadInnerRequest = {
    key?: string;
    localFilePath?: string;
  };

  type getMessageInfoUsingGETParams = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type GetReplyRequest = {
    commentId?: number;
  };

  type ListCommentByIdPage = {
    current?: number;
    pageSize?: number;
    raceId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MessageVO = {
    content?: string;
    createTime?: string;
    fromUser?: string;
    id?: number;
    subject?: string;
    targetUrl?: string;
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

  type PageAnnounceVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AnnounceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMessageVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MessageVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type ReplyCommentRequest = {
    commentId?: number;
    content?: string;
    raceId?: number;
  };

  type SendMessageDTO = {
    content?: string;
    expireTime?: string;
    forUser?: number;
    fromUser?: number;
    relationshipId?: number;
    subject?: string;
    targetUrl?: string;
  };

  type UpdateAnnounceRequest = {
    content?: string;
    id?: number;
    title?: string;
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
