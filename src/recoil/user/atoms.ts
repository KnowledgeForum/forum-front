import { IntroUser } from "@/types/user";
import { atom } from "recoil";

export const userState = atom<IntroUser | null>({
  key: "userState",
  default: null,
});
