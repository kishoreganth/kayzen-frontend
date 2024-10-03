"use client"

import React, { useEffect, useState } from 'react'
import ChatSettingNav from './ChatSettingNav';
import useTheme from 'next-theme';
import { useRouter } from 'next/navigation';

const Activity = () => {
  const { theme } = useTheme()
  const [chatAgent, setChatAgent] = useState(null);
  const router = useRouter()

    // Retrieve chat agent from local storage
    useEffect(() => {
        const agent = localStorage.getItem('current_agent');
        if (agent) {
            setChatAgent(JSON.parse(agent));
        }
    }, []);
  return (
    <div className={`flex flex-col justify-start items-start px-[2vw]  w-full h-[100vh]`}>
      
      <div className={`border-b-[.1vw] flex justify-center relative w-full mt-[2vw] pt-[.6vw] mb-[.9vw] text-[1vw] border-zinc-300 ${theme === "dark" ? 'text-[#9f9f9f]' : ' text-black'}`}>
      <div className="absolute left-0">
          <button
            onClick={() =>
              router.push(`/workspace/agents?workspaceId=${chatAgent?.workspace_id}`)
            }
            className={`${
              theme == "dark" ? "text-white bg-black" : "text-black bg-white"
            } text-[.9vw] font-semibold hover:bg-opacity-[.8] px-[.8vw] py-[.4vw] rounded-md`}
          >
            Back to workspace
          </button>
        </div>
        <ChatSettingNav />  
      </div>
    </div>
  )
}

export default Activity