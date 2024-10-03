"use client"

import React, { useEffect, useState } from 'react'
import ChatSettingNav from '../ChatSettingNav';
import ConnectNavs from '../connect/ConnectNavs';
import useTheme from 'next-theme';
import { atomOneLight, CopyBlock, dracula } from 'react-code-blocks';
import { useRouter } from 'next/navigation';

const Embeds = () => {
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
        <div className={`flex items-start justify-start py-[3vw] gap-[2vw] pl-[13vw] pr-[3vw] w-full h-full`}>
            <div className={`flex flex-col justify-center w-[20%] py-[2vw] px-[1vw] rounded-lg ${theme === "dark" ? 'bg-[#1A1C22] text-white' : 'bg-white text-black'}`}>
                <div>
                    <ConnectNavs />
                </div>
            </div>
            <div className={`flex flex-col gap-[1.5vw] justify-start items-start w-[55%] h-full py-[4vw] px-[3.5vw] rounded-lg border-[.12vw] border-zinc-300 ${theme === "dark" ? 'bg-[#1A1C22] text-white' : 'bg-white text-black'}`}>
                <h5 className={`font-bold text-[1.2vw] text-[#9f9f9f]`}>Chatbot 1</h5>
                <p className={`font-medium text-[.9vw] pt-[.7vw]`}>Preview the chatbot and tune the response as per yout outcome and save it</p>
                <div className={`flex flex-col gap-[.2vw] px-[1vw] pt-[1vw]`}>
                    <h6 className={`text-[1.4vw] font-semibold`}>Embedded Code</h6>
                    <p className={`text-[.7vw] `}>Copy the below code to your project to embed this chatbot</p>
                    <div className={` p-[.5vw] w-full rounded-lg`}>
                        <CopyBlock
                            text={`<iframe style={{position: 'absolute', bottom: '0', right: '0' }} 
src="https://embedded-chatbot-pi.vercel.app/?id=${chatAgent?.id}" 
width="40vw" height="80vh" align='right' />  `}
                            language='html'
                            showLineNumbers={true}
                            theme={dracula}
                            codeBlock
                            wrapLongLines
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Embeds