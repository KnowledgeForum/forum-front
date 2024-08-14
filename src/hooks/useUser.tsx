import { getIntroUser } from "@/recoil/user/selectors";
import { IntroUser } from "@/types/user";
import { Loadable, useRecoilValueLoadable } from "recoil";

const useUser = () => {
  const userLoadable: Loadable<IntroUser | null> = useRecoilValueLoadable(getIntroUser);
  const isLoaded: boolean = userLoadable.state === "hasValue";
  const error: { message: string | null; isError: boolean } =
    userLoadable.state === "hasError"
      ? { message: userLoadable.contents, isError: true }
      : { message: null, isError: false };
  const user: IntroUser | null = userLoadable.state === "hasValue" ? userLoadable.contents : null;

  return {
    user,
    isLoaded,
    error,
  };
};

export default useUser;
