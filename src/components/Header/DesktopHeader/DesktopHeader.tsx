import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeSvg from "@assets/home.svg";
import NewsSvg from "@assets/news.svg";
import BoardSvg from "@assets/board.svg";
import FollowSvg from "@assets/follow.svg";
import SearchSvg from "@assets/search.svg";
import UserPlusSvg from "@assets/user-plus.svg";

import { IntroUser } from "@/types/user";

import classes from "./DesktopHeader.module.scss";

import Notification from "@/features/Notification/Notification";

type DesktopHeaderProps = {
  user: IntroUser | null;
};

const DesktopHeader = ({ user }: DesktopHeaderProps) => {
  const router = useLocation();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSearch = useCallback(() => {
    navigate(`/search?keyword=${keyword}`);
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

  const handleNotification = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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
              <Notification isOpen={isOpen} onClick={handleNotification} />
              <div className={classes.profile}>
                <img src={user.profilePath} alt="유저 프로필 이미지" width={36} height={36} />
              </div>
            </>
          ) : (
            <>
              <button className={classes.signupBtn}>
                <img src={UserPlusSvg} alt="회원가입 아이콘" width={14} height={14} />
                <span>회원가입</span>
              </button>
              <button className={classes.loginBtn}>로그인</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
