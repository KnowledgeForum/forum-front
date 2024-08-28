import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeSvg from "@assets/home.svg";
import NewsSvg from "@assets/news.svg";
import BoardSvg from "@assets/board.svg";
import FollowSvg from "@assets/follow.svg";
import SearchSvg from "@assets/search.svg";
import UserPlusSvg from "@assets/user-plus.svg";
import AccountSvg from "@assets/profile.svg";
import LogoutSvg from "@assets/logout.svg";
import SettingSvg from "@assets/setting.svg";

import classes from "./DesktopHeader.module.scss";

import Notification from "@/features/Notification/Notification";

import Modal from "@/components/Modal/Modal";

import useUser from "@/hooks/useUser";

const DesktopHeader = () => {
  const { user, logout } = useUser();
  const router = useLocation();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);

  const onSearch = useCallback(() => {
    navigate(`/search?keyword=${keyword}`, { preventScrollReset: false });
  }, [keyword, navigate]);

  const handleChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const handleKeyDownEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch();
      }
    },
    [onSearch],
  );

  const handleClickSearchIcon = useCallback(() => {
    onSearch();
  }, [onSearch]);

  const handleProfile = useCallback(() => {
    setIsOpenProfile((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpenProfile(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsOpenProfile(false);
    logout();
  }, [logout]);

  return (
    <header className={classes.header}>
      <div className={classes.center}>
        <Link to={"/"} className={classes.logo}>
          <img src="/logo.svg" alt="로고 이미지" width={36} height={36} />
          <span className={classes.title}>Knowledge</span>
        </Link>
        <nav className={classes.nav}>
          <div className={classes.btnBox}>
            <Link to={"/"} className={`${classes.navItem} ${router.pathname === "/" && classes.active}`}>
              <img src={HomeSvg} alt="홈 아이콘" width={22} height={22} />
            </Link>
            <Link to={"/news"} className={`${classes.navItem} ${router.pathname === "/news" && classes.active}`}>
              <img src={NewsSvg} alt="뉴스 아이콘" width={22} height={22} />
            </Link>
            <Link to={"/board"} className={`${classes.navItem} ${router.pathname === "/board" && classes.active}`}>
              <img src={BoardSvg} alt="게시판 아이콘" width={22} height={22} />
            </Link>
            <Link to={"/follow"} className={`${classes.navItem} ${router.pathname === "/follow" && classes.active}`}>
              <img src={FollowSvg} alt="팔로우 게시판 아이콘" width={22} height={22} />
            </Link>
          </div>
          <label className={classes.inputBox} htmlFor="search">
            <input
              id="search"
              type="text"
              placeholder="검색어 입력"
              value={keyword}
              onChange={handleChangeKeyword}
              onKeyDown={handleKeyDownEnter}
              autoComplete="off"
            />
            <img src={SearchSvg} alt="검색 아이콘" onClick={handleClickSearchIcon} width={18} height={18} />
          </label>
        </nav>
        <div className={classes.btnBox}>
          {user ? (
            <>
              <Link to="/post" className={classes.postBtn}>
                글쓰기
              </Link>
              <Notification />
              <div className={classes.profileBox}>
                <button className={classes.profile} onClick={handleProfile}>
                  <img src={user.profilePath} alt="유저 프로필 이미지" width={36} height={36} />
                </button>
                <Modal isOpen={isOpenProfile} onClose={handleClose}>
                  <div className={classes.profileModal}>
                    <div className={classes.top}>
                      <img
                        src={user.profilePath}
                        alt="유저 프로필 이미지"
                        width={40}
                        height={40}
                        className={classes.profile}
                      />
                      <div className={classes.userInfo}>
                        <div className={classes.username}>{user.nickname}</div>
                        <div className={classes.email}>{user.email}</div>
                      </div>
                    </div>
                    <div className={classes.linkBox}>
                      <Link to={"/account"} className={classes.link}>
                        <img src={AccountSvg} alt="계정 아이콘" />
                        <span>내 정보</span>
                      </Link>
                      <button className={classes.link} onClick={handleLogout}>
                        <img src={LogoutSvg} alt="로그아웃 아이콘" />
                        <span>로그아웃</span>
                      </button>
                      <div className={classes.line} />
                      <Link to={"/setting"} className={classes.link}>
                        <img src={SettingSvg} alt="설정 아이콘" />
                        <span>설정</span>
                      </Link>
                    </div>
                  </div>
                </Modal>
              </div>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className={classes.signupBtn}>
                  <img src={UserPlusSvg} alt="회원가입 아이콘" width={14} height={14} />
                  <span>회원가입</span>
                </button>
              </Link>
              <Link to="/login">
                <button className={classes.loginBtn}>로그인</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
