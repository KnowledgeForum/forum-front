import { IntroUser } from "@/types/user";
import { selector } from "recoil";

export const getIntroUser = selector({
  key: "getUserIntro",
  get: (): IntroUser | null => {
    return {
      userId: 1,
      nickname: "김승용",
      email: "seungyong20@naver.com",
      profilePath: "https://avatars.githubusercontent.com/u/48755175?v=4",
    };
  },
});
