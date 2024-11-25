import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import BellIcon from "@assets/bell.svg";

import classes from "./Notification.module.scss";

import type { Notification, Notifications } from "@/types/notification";

import { NotificationApi } from "@/api/notification";

import useInfinityScroll from "@/hooks/useInfinityScroll";

import Modal from "@/components/Modal/Modal";

import { NotificationTypeInfo } from "@/utils/constants";
import { getTimeAgo } from "@/utils/number";
import { getNextPagination } from "@/utils/pagination";

const Notification = () => {
  const count = 5;

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<Notifications>({
    queryKey: ["notifications", count],
    initialData: undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return getNextPagination({
        itemLength: allPages.length,
        count,
        total: lastPage.total,
        page: lastPageParam as number,
      });
    },
    queryFn: async ({ pageParam: page = 1 }) => {
      return await NotificationApi.getNotifications({ page: page as number, count });
    },
  });

  const [hasUnRead, setHasUnRead] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const handleClick = useCallback(() => {
    // TODO: 알림 읽음 처리 API 호출
    setHasUnRead(false);

    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useInfinityScroll(infinityRef, () => {
    if (isLoading || isFetching || !hasNextPage) return;

    fetchNextPage();
  });

  useEffect(() => {
    if (data?.pages) {
      const notifications = data.pages.flatMap((page) => page.notifications);
      const unreadNotifications = notifications.filter((notification) => !notification.isRead);
      return setHasUnRead(unreadNotifications.length > 0);
    }
  }, [data]);

  return (
    <div className={classes.notification}>
      <button className={classes.notificationBtn} onClick={handleClick}>
        <img src={BellIcon} alt="알림 아이콘" width={20} height={20} />
        {hasUnRead && <div className={classes.unread} />}
      </button>
      <Modal className={classes.modal} isOpen={isOpen} onClose={handleClose}>
        <div className={classes.title}>알림</div>
        {isLoading ? (
          <Box display={"flex"} flexDirection={"column"} gap={"0.625rem"}>
            {Array(count)
              .fill(0)
              .map((_, index) => (
                <Box key={index}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box marginRight={"0.3125rem"}>
                      <Skeleton variant="circular" width={"2.25rem"} height={"2.25rem"} />
                    </Box>
                    <Box>
                      <Skeleton variant="text" width={"5rem"} />
                      <Skeleton variant="text" width={"5rem"} />
                    </Box>
                  </Box>
                  <Skeleton variant="text" width={"100%"} />
                </Box>
              ))}
          </Box>
        ) : (
          <>
            <div className={classes.container}>
              {!data ? (
                <div className={classes.empty}>새로운 알림이 없습니다.</div>
              ) : (
                data.pages.map((page) =>
                  page.notifications.map((notification) => (
                    <Link to={`/board/${notification.board.boardId}`} key={notification.notificationId}>
                      <div className={classes.top}>
                        <img src={notification.sender.profilePath} alt="프로필 이미지" />
                        <div className={classes.info}>
                          <div className={classes.username}>{notification.sender.username}</div>
                          <div className={classes.time}>{getTimeAgo(notification.createdTime)}</div>
                        </div>
                      </div>
                      <div className={classes.text}>{getNotificationMessage(notification)}</div>
                    </Link>
                  )),
                )
              )}
            </div>
            <div ref={infinityRef} />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Notification;
