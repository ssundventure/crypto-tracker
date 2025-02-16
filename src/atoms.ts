import { atom } from "recoil";

export const THEME_MODE = "isDarkMode"

const getDarkModeFromStorage = () => {
  const storedValue = localStorage.getItem(THEME_MODE);
  return storedValue ? JSON.parse(storedValue) : false ;
}


export const isDarkAtom = atom({
  key: "isDark",
  default: getDarkModeFromStorage(),
});
