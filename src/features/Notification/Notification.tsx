import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import BellIcon from "@assets/bell.svg";

import classes from "./Notification.module.scss";

import type { Notification, Notifications } from "@/types/notification";

import Modal from "@/components/Modal/Modal";

import { NotificationTypeInfo } from "@/utils/constants";
import { getTimeAgo } from "@/utils/timestamp";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import { Box, Skeleton } from "@mui/material";

const Notification = () => {
  const page = 5;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasUnRead, setHasUnRead] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  const infinityRef = useRef<HTMLDivElement>(null);

  const getNotificationMessage = useCallback((notification: Notification) => {
    switch (notification.notificationType) {
      case NotificationTypeInfo.NOTICE:
        return (
          <p>
            "<strong>{notification.board.title}</strong>" 공지사항이 등록되었습니다.
          </p>
        );
      case NotificationTypeInfo.COMMENT:
        return (
          <p>
            <strong>{notification.sender.username}</strong>님이 회원님의 게시글에 댓글을 남겼습니다.
          </p>
        );
      case NotificationTypeInfo.LIKE:
        return (
          <p>
            <strong>{notification.sender.username}</strong>님이 회원님의 게시글을 좋아합니다.
          </p>
        );
      case NotificationTypeInfo.RECOMMEND:
        return (
          <p>
            <strong>{notification.sender.username}</strong>님의 게시글을 확인해보세요.
          </p>
        );
      case NotificationTypeInfo.FOLLOW:
        return (
          <p>
            <strong>{notification.sender.username}</strong>님이 회원님의 게시글이 등록되었습니다.
          </p>
        );
      case NotificationTypeInfo.EVENT:
        return (
          <p>
            "<strong>{notification.board.title}</strong>" 이벤트를 확인해보세요.
          </p>
        );
      default:
        return null;
    }
  }, []);

  const getNotifications = useCallback(() => {
    const notifications: Notifications = {
      notifications: [
        {
          notificationId: 1,
          notificationType: "1001",
          sender: {
            userId: 1,
            username: "user1",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 1,
            title: "공지사항 제목 1",
          },
          isRead: false,
          createdTime: "2024-08-14 10:52:00",
        },
        {
          notificationId: 2,
          notificationType: "1002",
          sender: {
            userId: 2,
            username: "user2",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 2,
            title: "비트코인 지금 사야할 때인가? 가장 중요한 지표 알려드리겠습니다.",
          },
          isRead: false,
          createdTime: "2024-07-03 10:52:00",
        },
        {
          notificationId: 3,
          notificationType: "1003",
          sender: {
            userId: 3,
            username: "user3",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 3,
            title: "개발자의 필수 역량",
          },
          isRead: true,
          createdTime: "2023-08-14 10:52:00",
        },
        {
          notificationId: 4,
          notificationType: "1004",
          sender: {
            userId: 4,
            username: "user4",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 4,
            title: "개발자의 필수 역량",
          },
          isRead: true,
          createdTime: "2023-08-14 10:52:00",
        },
        {
          notificationId: 5,
          notificationType: "1005",
          sender: {
            userId: 5,
            username: "user5",
            profilePath: "https://avatars.githubusercontent.com/u/1",
          },
          board: {
            boardId: 5,
            title: "개발자의 필수 역량",
          },
          isRead: true,
          createdTime: "2023-08-14 10:52:00",
        },
      ],
      total: 3,
    };

    setNotifications(notifications.notifications);
    setTotal(notifications.total);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleClick = useCallback(() => {
    // TODO: 알림 읽음 처리 API 호출
    setHasUnRead(false);

    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useInfinityScroll(infinityRef, () => {
    if (isLoading) return;
    else if (notifications && notifications.length >= total) return;

    // TODO: 알림 목록 추가 불러오는 API 호출
    console.log("infinity scroll");
  });

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications.filter((notification) => !notification.isRead);
      return setHasUnRead(unreadNotifications.length > 0);
    }
  }, [notifications]);

  return (
    <button className={classes.notificationBtn} onClick={handleClick} ref={btnRef}>
      <img src={BellIcon} alt="알림 아이콘" width={20} height={20} />
      {hasUnRead && <div className={classes.unread} />}
      {isOpen && (
        <Modal className={classes.modal} isOpen={isOpen} btnRef={btnRef} onClose={handleClose}>
          <div className={classes.title}>알림</div>
          {isLoading ? (
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
              {Array(page)
                .fill(0)
                .map((_, index) => (
                  <Box>
                    <Box display={"flex"} alignItems={"center"} key={index}>
                      <Box marginRight={"5px"}>
                        <Skeleton variant="circular" width={36} height={36} />
                      </Box>
                      <Box>
                        <Skeleton variant="text" width={"80px"} />
                        <Skeleton variant="text" width={"80px"} />
                      </Box>
                    </Box>
                    <Skeleton variant="text" width={"100%"} />
                  </Box>
                ))}
            </Box>
          ) : (
            <>
              <div className={classes.container}>
                {!notifications || total <= 0 ? (
                  <div className={classes.empty}>새로운 알림이 없습니다.</div>
                ) : (
                  notifications.map((notification) => (
                    <Link to={`/board/${notification.board.boardId}`} key={notification.notificationId}>
                      <div className={classes.top}>
                        <img src={notification.sender.profilePath} alt="프로필 이미지" width={36} height={36} />
                        <div className={classes.info}>
                          <div className={classes.username}>{notification.sender.username}</div>
                          <div className={classes.time}>{getTimeAgo(notification.createdTime)}</div>
                        </div>
                      </div>
                      <div className={classes.text}>{getNotificationMessage(notification)}</div>
                    </Link>
                  ))
                )}
              </div>
              <div ref={infinityRef} />
            </>
          )}
        </Modal>
      )}
    </button>
  );
};

export default Notification;
