"use client";

import React, { useEffect, useState } from "react";
import ChatSettingNav from "../ChatSettingNav";
import useTheme from "next-theme";
import Chatbot from "../../Chatbot";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Playground = () => {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const session_id = getCookie("session_id");
  const chatId = searchParams.get("chatId");
  const [chatAgent, setChatAgent] = useState({});
  const urlFetch = process.env.url;
  const router = useRouter();

  const getAgent = async () => {
    if (!chatId || chatId == "") {
      const agent = localStorage.getItem("current_agent");
      if (agent) setChatAgent(JSON.parse(agent));
     
      return;
    }
    const formData = new FormData();
    formData.append("session_id", session_id);
    formData.append("chat_agent_id", chatId);
    const response = await fetch(
      `${urlFetch}/public/chat_agent/get_agent/by_id`,
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
      className={`flex  flex-col justify-between items-start px-[2vw]  w-full h-[100vh]`}
    >
      <div
        className={`border-b-[.1vw] flex justify-center relative w-full mt-[2vw] pt-[.6vw] mb-[.9vw] text-[1vw] border-zinc-300 ${
          theme === "dark" ? "text-[#9f9f9f]" : " text-black"
        }`}
      >
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
      <div
        className={`flex  items-center justify-center py-[2vw] px-[8vw] w-full h-full`}
      >
        <div
          className={`flex rounded-xl  justify-between min-h-full w-full py-[2vw] px-[3vw]  ${
            theme === "dark" ? "bg-[#1A1C22]" : "bg-white"
          }`}
        >
          <div
            className={`${
              theme === "dark" ? "text-zinc-100" : "text-black"
            } flex flex-col gap-[.9vw] w-[40%] h-full border-[.15vw] rounded-xl border-zinc-300 px-[.7vw] pb-[2.5vw] pt-[.3vw] mt-[2vw] font-semibold text-[.9vw]`}
          >
            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Chatbot Name
              </span>
              <h6 className={`font-bold text-[1.1vw] pb-[.5vw] `}>
                {chatAgent?.bot_name}
              </h6>
            </div>
            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Chatbot ID
              </span>
              {chatAgent.id}
            </div>
            <div className={`flex gap-[6vw]`}>
              <div className={`flex flex-col`}>
                <span
                  className={`${
                    theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                  }`}
                >
                  Status
                </span>
                Trained
              </div>
              <div className={`flex flex-col`}>
                <span
                  className={`${
                    theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                  }`}
                >
                  Model
                </span>
                gpt-4o
              </div>
            </div>

            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Visibility
              </span>
              Private
            </div>
            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Number of Tokens
              </span>
              {chatAgent.total_tokens}
            </div>
            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Temperature
              </span>
              0
            </div>
            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Last trained at
              </span>
              {chatAgent?.created_at?.substring(0, 10)}
            </div>
          </div>

          <div className={`w-[25vw] relative right-[5vw]`}>
            <Chatbot height={"70vh"} chatAgentId={chatAgent.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
