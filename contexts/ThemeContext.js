import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const storedIsDark = localStorage.getItem('isDarkMode');
    return storedIsDark ? JSON.parse(storedIsDark) : false;
  });

  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      {children}
    </ThemeContext.Provider>    
  )
}   