import React, { useState } from 'react'

//React components -> JSX File

//HTML to JSX Convertor - use
const Header = () => {
    // Dark mode:
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))

  
    return (
        <>
            <header className="header-container">
                <div className="header-content">
                    <h2 className="title">
                        <a href="/">Where in the world?</a>
                    </h2>
                    <p className="theme-changer" onClick={() => {
                        // document.body.classList.toggle('dark')
                        setIsDark(!isDark)
                        // toggle -> clicking once : dark mode, clicking again : light mode

                        // Storing in localStorage
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