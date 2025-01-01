import { atom } from "recoil";

export const showComponentAtom = atom<boolean>({
  key: "showComponentAtom",
  default: false,
});
