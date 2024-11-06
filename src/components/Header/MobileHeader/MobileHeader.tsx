import { useCallback, useEffect, useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./MobileHeader.module.scss";

import Notification from "@/features/Notification/Notification";

import useUser from "@/hooks/useUser";

const Mobileheader = () => {
  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { user } = useUser();
  const router = useLocation();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router.pathname]);

  return (
    <header className={classes.header}>
      <Link to={"/"} className={classes.logo}>
        <img src="/logo.svg" alt="로고 이미지" width={36} height={36} />
        <span className={classes.title}>Knowledge</span>
      </Link>
      <div className={classes.rightBox}>
        {user && (
          <div className={classes.funcBox}>
            <Link to="/post" className={classes.postBtn}>
              글쓰기
            </Link>
            <Notification />
          </div>
        )}
        <MenuIcon width={32} height={32} onClick={() => setIsOpenMenu(true)} />
        <SwipeableDrawer
          anchor="right"
          open={isOpenMenu}
          PaperProps={{
            sx: {
              width: "100%",
            },
          }}
          onOpen={() => setIsOpenMenu(true)}
          onClose={() => setIsOpenMenu(false)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <menu className={classes.menu}>
            <CloseIcon width={36} height={36} className={classes.close} onClick={handleCloseMenu} />
            <div className={classes.linkBox}>
              <Link to="/" className={`${classes.navItem} ${router.pathname === "/" && classes.active}`}>
                홈
              </Link>
              <Link to="/news" className={`${classes.navItem} ${router.pathname === "/news" && classes.active}`}>
                뉴스
              </Link>
              <Link to="/board" className={`${classes.navItem} ${router.pathname === "/board" && classes.active}`}>
                게시판
              </Link>
              <Link to="/follow" className={`${classes.navItem} ${router.pathname === "/follow" && classes.active}`}>
                팔로우
              </Link>
              <div />
              <div />
              <Link to="/account" className={`${classes.navItem} ${router.pathname === "/account" && classes.active}`}>
                내 정보
              </Link>
              <Link
                to="/settings"
                className={`${classes.navItem} ${router.pathname === "/settings" && classes.active}`}
              >
                설정
              </Link>
            </div>
            <div className={classes.bottom}>
              {user ? (
                <>
                  <button className={classes.logoutBtn}>로그아웃</button>
                </>
              ) : (
                <>
                  <Link to="/login">로그인</Link>
                  <div className={classes.line} />
                  <Link to="/register">회원가입</Link>
                </>
              )}
            </div>
          </menu>
        </SwipeableDrawer>
      </div>
    </header>
  );
};

export default Mobileheader;
