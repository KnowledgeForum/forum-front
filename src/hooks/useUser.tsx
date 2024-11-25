import { useCallback } from "react";
import { Loadable, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { userState } from "@/recoil/user/atoms";
import { getIntroUser } from "@/recoil/user/selectors";

import { IntroUser } from "@/types/user";

import { UserApi } from "@/api/user";

const useUser = () => {
  const userLoadable: Loadable<IntroUser | null> = useRecoilValueLoadable(getIntroUser);
  const isLoaded: boolean = userLoadable.state === "hasValue";
  const error: { message: string | null; isError: boolean } =
    userLoadable.state === "hasError"
      ? { message: userLoadable.contents, isError: true }
      : { message: null, isError: false };
  const user: IntroUser | null = userLoadable.state === "hasValue" ? userLoadable.contents : null;

  const setUser = useSetRecoilState(userState);
  const logout = useCallback(async () => {
    await UserApi.logout();
    setUser(null);
  }, [setUser]);

  return {
    user,
    isLoaded,
    error,
    logout,
  };
};

export default useUser;
