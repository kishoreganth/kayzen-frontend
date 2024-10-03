"use client"

import React from 'react'
import ChatAgent from '../sidebarElements/ChatAgent'
import PhoneAgentList from '../phoneAgent/PhoneAgentLists'
import useTheme from 'next-theme'

const Agents = () => {

  return (
    <div className={`h-[100vh] flex flex-col`}>
      <ChatAgent />
      <PhoneAgentList />
    </div>
  )
}

export default Agents