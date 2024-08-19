import { NotificationTypeInfo } from "@/utils/constants";

export type Notification = {
  notificationId: number;
  notificationType: string;
  sender: Pick<IntroUser, "userId" | "username" | "profilePath">;
  board: {
    boardId: number;
    title: string;
  };
  isRead: boolean;
  createdTime: string;
};

export type Notifications = {
  notifications: Notification[];
  total: number;
};

export type NotificationTypeName = keyof typeof NotificationTypeInfo;
export type NotificationTypeValue = (typeof NotificationTypeInfo)[NotificationTypeName];

export type NotificationFollowUnRead = {
  unReadCount: number;
};
