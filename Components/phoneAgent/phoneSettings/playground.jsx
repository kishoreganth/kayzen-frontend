"use client";

import React, { useEffect, useState } from "react";
import PhoneSettingNav from "./PhoneSettingNav";
import useTheme from "next-theme";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";

const playground = () => {
    const searchParams = useSearchParams();
  const { theme } = useTheme();
  const session_id = getCookie("session_id");
  const phoneId = searchParams.get("phoneId");
  const [phoneAgent, setPhoneAgent] = useState({});
  const urlFetch = process.env.url;
  const router = useRouter();

  const getAgent = async () => {
    if (!phoneId || phoneId == "") {
      const agent = localStorage.getItem("current_agent");
      if (agent) setPhoneAgent(JSON.parse(agent));
     
      return;
    }
    const formData = new FormData();
    formData.append("session_id", session_id);
    formData.append("phone_agent_id", phoneId);
    const response = await fetch(
      `${urlFetch}/public/phone_agent/get_agent/by_id`,
      {
        mode: "cors",
        method: "POST",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
        body: formData,
      }
    );
    const data = await response.json();
    localStorage.setItem("current_agent", JSON.stringify(data[0] || []));
    setChatAgent(data[0]);
    
  };

  useEffect(() => {
    getAgent();

  }, []);

  return (
    <div
      className={`flex flex-col justify-start items-start px-[2vw]  w-full h-[100vh]`}
    >
      <div
        className={`border-b-[.1vw] flex justify-center relative w-full mt-[2vw] pt-[.6vw] mb-[.9vw] text-[1vw] border-zinc-300 ${
          theme === "dark" ? "text-[#9f9f9f]" : " text-black"
        }`}
      >
        <div className="absolute left-0">
          <button
            onClick={() =>
              router.push(
                `/workspace/agents?workspaceId=${phoneAgent?.workspace_id}`
              )
            }
            className={`${
              theme == "dark" ? "text-white bg-black" : "text-black bg-white"
            } text-[.9vw] font-semibold hover:bg-opacity-[.8] px-[.8vw] py-[.4vw] rounded-md`}
          >
            Back to workspace
          </button>
        </div>
        <PhoneSettingNav />
      </div>

      <div className={`flex w-full h-full relative`}>
            <div className={`absolute flex flex-col top-[2vw] right-[2vw] ${theme === "dark" ? 'bg-black' : 'bg-white'} p-[1.5vw] rounded-lg gap-[.8vw]`}>
                <div className={`${theme === "dark" ? 'text-white' : 'text-black'} flex items-center gap-[1vw]`}>
                    <Image src={''} width={40} height={40} />
                    <h6 className="font-semibold text-[1vw]">kayzen</h6>
                </div>
                <input type="text" placeholder="Enter name" className={`${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-[#F3F4F7] text-black'} px-[1vw] py-[.5vw] rounded-md outline-none`} />
                <input type="text" className={`${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-[#F3F4F7] text-black'} px-[1vw] py-[.5vw] rounded-md outline-none`} placeholder="Enter Phone number" />
                <div className="mt-[1vw]">
                    <button className={`text-white bg-[#702963] hover:bg-opacity-[.8] px-[1vw] py-[.5vw] rounded-md w-full`}>
                        Call me now
                    </button>
                </div>
            </div>
      </div>
    </div>
  )
}

export default playground