import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


// export function useTheme() {
// const [isDark, setIsDark] = useContext(ThemeContext)
// }
// export function useTheme() {
// return useContext(ThemeContext)
// }
export const useTheme = () => useContext(ThemeContext)


//in place of useContext(), in whichever component it has been used, useTheme() can be used