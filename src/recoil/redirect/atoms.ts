import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "redirect",
  storage: sessionStorage,
});

export const successRedirectState = atom({
  key: "success",
  default: "/",
  effects_UNSTABLE: [persistAtom],
});

export const failedRedirectState = atom({
  key: "failed",
  default: "/",
  effects_UNSTABLE: [persistAtom],
});
