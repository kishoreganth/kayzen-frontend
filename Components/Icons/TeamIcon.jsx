"use client"
import React from 'react'

const TeamIcon = ({className,isActive}) => {
  return (
<lord-icon
    src="https://cdn.lordicon.com/kthelypq.json"
    trigger="hover"
    colors={`primary:${!isActive ? '#737791' : '#f8fafc'}`}
    target={`.${className}`}
    style={{width:'1.5vw',height:'1.5vw'}}>
</lord-icon>
  )
}

export default TeamIcon