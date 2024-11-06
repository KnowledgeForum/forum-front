import { selector } from "recoil";

import { IntroUser } from "@/types/user";

import { UserApi } from "@/api/user";

export const getIntroUser = selector({
  key: "getUserIntro",
  get: async (): Promise<IntroUser | null> => {
    return await UserApi.getIntroUser();
  },
});
