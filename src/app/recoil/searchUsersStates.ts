import { atom } from "recoil";
import { OtherUser } from "../interfaces/otherUser/interface";

export const searchInputState = atom({
  key: "searchInputState",
  default: "",
});

export const usersState = atom<OtherUser[]>({
  key: "usersState",
  default: [],
});
