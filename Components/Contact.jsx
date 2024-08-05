import React from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'

const Contact = () => {
  const params = useParams() //info of which route we have visited
  
  return (
    <>
        {/* <Header/> */}
      Contact Us
    </>
  )
}

export default Contact
