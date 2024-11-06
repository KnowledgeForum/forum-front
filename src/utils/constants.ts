export const NotificationTypeInfo = {
  NOTICE: "1001",
  COMMENT: "1002",
  LIKE: "1003",
  FOLLOW: "1004",
  RECOMMEND: "1005",
  EVENT: "1006",
} as const;

export const SnsKindEnum = {
  KAKAO: "1001",
  NAVER: "1002",
  GOOGLE: "1003",
  GITHUB: "1004",
} as const;

export type SnsKind = (typeof SnsKindEnum)[keyof typeof SnsKindEnum];

export const SessionStorageKey = {
  SUCCESS_REDIRECT_STATE: "SUCCESS_REDIRECT_STATE",
  FAILED_REDIRECT_STATE: "FAILED_REDIRECT_STATE",
};
