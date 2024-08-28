/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import classes from "./Sns.module.scss";

import KakaoIcon from "@/assets/kakao.svg";
import NaverIcon from "@/assets/naver.svg";
import GoogleIcon from "@/assets/google.svg";
import GithubIcon from "@/assets/github.svg";

import useToast from "@/hooks/useToast";

import { SessionStorageKey, SnsKind, SnsKindEnum } from "@/utils/constants";

const Sns = () => {
  const { ToastElement, showToast } = useToast();

  const kakaoJavascriptKey: string = useMemo(() => import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY, []);
  const kakaoRedirectUri: string = useMemo(() => import.meta.env.VITE_KAKAO_REDIRECT_URI, []);
  const kakaoState: string = useMemo(() => Math.random().toString(36).substring(2, 11), []);

  const naverClientId: string = useMemo(() => import.meta.env.VITE_NAVER_CLIENT_ID, []);
  const naverRedirectUri: string = useMemo(() => import.meta.env.VITE_NAVER_REDIRECT_URI, []);
  const naverState: string = useMemo(() => Math.random().toString(36).substring(2, 11), []);

  const googleClientId: string = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID, []);
  const googleRedirectUri: string = useMemo(() => import.meta.env.VITE_GOOGLE_REDIRECT_URI, []);

  const githubClientId: string = useMemo(() => import.meta.env.VITE_GITHUB_CLIENT_ID, []);

  const location = useLocation();

  const handleKakao = useCallback(async () => {
    const kakao = (window as any).Kakao;

    if (!kakao?.Auth?.authorize) {
      showToast.warning("카카오 로그인을 시도할 수 없습니다.\n나중에 다시 시도해주세요.");
      return;
    }

    sessionStorage.setItem(SessionStorageKey.FAILED_REDIRECT_STATE, location.pathname);

    kakao?.Auth?.authorize({
      redirectUri: kakaoRedirectUri,
      state: kakaoState,
    });
  }, [kakaoRedirectUri, kakaoState, location.pathname, showToast]);

  const handleNaver = useCallback(() => {
    if (!naverClientId || !naverRedirectUri || !naverState) {
      showToast.warning("네이버 로그인을 시도할 수 없습니다.\n나중에 다시 시도해주세요.");
      return;
    }

    sessionStorage.setItem(SessionStorageKey.FAILED_REDIRECT_STATE, location.pathname);

    const baseUrl = "https://nid.naver.com/oauth2.0/authorize";
    const config = {
      client_id: naverClientId,
      redirect_uri: naverRedirectUri,
      response_type: "code",
      state: naverState,
    };
    const params = new URLSearchParams(config);
    const naverUrl = `${baseUrl}?${params.toString()}`;

    window.location.href = naverUrl;
  }, [location.pathname, naverClientId, naverRedirectUri, naverState, showToast]);

  const handleGoogle = useCallback(() => {
    if (!googleClientId) {
      showToast.warning("구글 로그인을 시도할 수 없습니다.\n나중에 다시 시도해주세요.");
      return;
    }

    sessionStorage.setItem(SessionStorageKey.FAILED_REDIRECT_STATE, location.pathname);

    const baseUrl = "https://accounts.google.com/o/oauth2/auth";
    const config = {
      client_id: googleClientId,
      redirect_uri: googleRedirectUri,
      response_type: "code",
      scope: "email profile",
    };
    const params = new URLSearchParams(config);
    const googleUrl = `${baseUrl}?${params.toString()}`;

    window.location.href = googleUrl;
  }, [googleClientId, googleRedirectUri, location.pathname, showToast]);

  const handleGithub = useCallback(() => {
    if (!githubClientId) {
      showToast.warning("깃헙 로그인을 시도할 수 없습니다.\n나중에 다시 시도해주세요.");
      return;
    }

    sessionStorage.setItem(SessionStorageKey.FAILED_REDIRECT_STATE, location.pathname);

    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
      client_id: githubClientId,
      scope: "user:email read:user",
    };
    const params = new URLSearchParams(config);
    const githubUrl = `${baseUrl}?${params.toString()}`;

    window.location.href = githubUrl;
  }, [githubClientId, location.pathname, showToast]);

  const handleLogin = useCallback(
    (event: MouseEvent<HTMLButtonElement>, snsKind: SnsKind) => {
      event.preventDefault();

      switch (snsKind) {
        case SnsKindEnum.KAKAO:
          handleKakao();
          break;
        case SnsKindEnum.NAVER:
          handleNaver();
          break;
        case SnsKindEnum.GOOGLE:
          handleGoogle();
          break;
        case SnsKindEnum.GITHUB:
          handleGithub();
          break;
      }
    },
    [handleGithub, handleGoogle, handleKakao, handleNaver],
  );

  useEffect(() => {
    if (!kakaoJavascriptKey) return;

    const kakao = (window as any).Kakao;

    if (!kakao?.isInitialized()) {
      kakao?.init(kakaoJavascriptKey);
    }
  }, [kakaoJavascriptKey]);

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      if (params.get("redirect")) {
        console.log(params.get("redirect"));
        sessionStorage.setItem(SessionStorageKey.SUCCESS_REDIRECT_STATE, params.get("redirect") as string);
      }
    }

    if (location.state?.errorMessage) {
      showToast.error(location.state.errorMessage);
      window.history.replaceState({}, "");
    }
  }, [location, location.state, showToast]);

  return (
    <div className={classes.sns}>
      {ToastElement}
      <button className={classes.btn} onClick={(event) => handleLogin(event, SnsKindEnum.KAKAO)}>
        <img src={KakaoIcon} alt="카카오 로고" width={18} height={18} />
      </button>
      <button className={classes.btn} onClick={(event) => handleLogin(event, SnsKindEnum.NAVER)}>
        <img src={NaverIcon} alt="네이버 로고" width={16} height={16} />
      </button>
      <button className={classes.btn} onClick={(event) => handleLogin(event, SnsKindEnum.GOOGLE)}>
        <img src={GoogleIcon} alt="구글 로고" width={18} height={18} />
      </button>
      <button className={classes.btn} onClick={(event) => handleLogin(event, SnsKindEnum.GITHUB)}>
        <img src={GithubIcon} alt="깃헙 로고" width={18} height={18} />
      </button>
    </div>
  );
};

export default Sns;
