import { atom } from "recoil";

export const sideBarOpenAtom = atom({
  key: "isSideBarOpen",
  default: typeof window !== "undefined" && window.innerWidth >= 1024,
});
