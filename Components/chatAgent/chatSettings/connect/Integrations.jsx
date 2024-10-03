"use client"

import React from 'react'
import ChatSettingNav from '../ChatSettingNav';
import ConnectNavs from '../connect/ConnectNavs';
import useTheme from 'next-theme';
import { useRouter } from 'next/navigation';

const Integrations = () => {
  const { theme } = useTheme()
  const router = useRouter()

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
        <div className={`flex items-start justify-start py-[4vw] gap-[2vw] pl-[13vw] pr-[3vw] w-full h-full`}>
            <div className={`flex flex-col justify-center w-[20%] py-[2vw] px-[1vw] rounded-lg ${theme === "dark" ? 'bg-[#1A1C22] text-white' : 'bg-white text-black'}`}>
                <div>
                    <ConnectNavs />
                </div>
            </div>
            <div className={`flex flex-col w-[50%] h-full px-[1vw]`}>
                <div className={`flex flex-col items-start gap-[1vw] w-full h-full`}>
                    <div className={`${theme === "dark" ? 'bg-[#1A1C22] text-white' : 'bg-white text-black'} flex items-center justify-center text-[1vw] font-semibold border-[.12vw] border-zinc-300 w-full h-[7vw] rounded-md`}>Connect to Whatsapp</div>
                    <div className={`${theme === "dark" ? 'bg-[#1A1C22] text-white' : 'bg-white text-black'} flex items-center justify-center text-[1vw] font-semibold border-[.12vw] border-zinc-300 w-full h-[7vw] rounded-md`}>Connect to Telegram</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Integrations