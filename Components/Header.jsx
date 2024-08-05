import React, { useState, useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
//React components -> JSX File

//HTML to JSX Convertor - use
const Header = () => {
    // Dark mode:
    // const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))
    // const [isDark, setIsDark] = theme
    // const [isDark, setIsDark]  = useContext(ThemeContext)

    const [isDark, setIsDark] = useState(
        JSON.parse(localStorage.getItem('isDarkMode'))
      )
      
    const handleThemeChange = () => {
        setIsDark(prevIsDark => !prevIsDark);
      };
    return (
        <>
            <header className={`header-container ${isDark ? 'dark' : ''}`}>
                <div className="header-content">
                    <h2 className="title">
                        <a href="/">Where in the world?</a>
                    </h2>
                    <p className="theme-changer" onClick={() => {
                        console.log("Dar/light")
          setIsDark(!isDark)
          localStorage.setItem('isDarkMode', !isDark)
        }}>
                        {/* making classNname dynamic to implement dark and light mode */}
                        <i className={`fa-regular fa-${isDark ? 'sun' : 'moon'}`}></i>
                        &nbsp;&nbsp;{isDark ? 'Light' : 'Dark'} mode
                    </p>
                </div>
            </header>


        </>
    )
}

export default Header
