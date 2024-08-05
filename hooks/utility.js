import { useState, useEffect } from "react"



export function getWindowSize() {
    //Custom hooks to show screen width on UI
const [windowSize, setWindowSize] = useState({width : window.innerWidth, height: window.innerHeight})
useEffect( () => {
window.addEventListener('resize', () => {
 setWindowSize({width : window.innerWidth, height: window.innerHeight})
})
}, [])

return windowSize
}