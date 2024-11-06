import { IntroUser } from "@/types/user";

export const UserApi = {
  getIntroUser: async (): Promise<IntroUser> => {
    // throw new Error("Unauthorized Error");
    return {
      userId: 2,
      nickname: "김승용",
      email: "seungyong20@naver.com",
      profilePath: "https://avatars.githubusercontent.com/u/77449569?v=4",
    };
  },
  logout: async () => {
    console.log("logout");
  },
};
