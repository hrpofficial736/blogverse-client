import { atom } from "recoil";

export const myDataAtom = atom({
  key: "myDataAtom",
  default: {
    image: "",
    name: "",
    username: "",
    email: "",
    country: "",
    profession: "",
    description: "",
    blogs: [],
  },
});
