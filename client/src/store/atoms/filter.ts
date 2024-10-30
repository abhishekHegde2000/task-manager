import { atom } from "recoil";

export const filterAtom = atom<string>({
  key: "filterAtom",
  default: "All",
});
