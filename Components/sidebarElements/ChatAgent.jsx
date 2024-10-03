"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import CreateButton from "../buttons/CreateButton";
import { IoIosAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AgentList from "../chatAgent/AgentList";
import SkeletonCard from "../SkeletonCard";
import { getCookie } from "cookies-next";
import useTheme from "next-theme";
import { TfiReload } from "react-icons/tfi";

const ChatAgent = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [agentList, setAgentList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const session_id = getCookie("session_id");
  const url = process.env.url;
  const scrollRef = useRef();
  const [scrollHeight, setScrollHeight] = useState();

  {
    /*useEffect(() => {
    const getAgentList = async () => {
      try {
        const cacheKey = `agentList_${session_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setAgentList(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const reqData = JSON.stringify({ session_id });
          const response = await fetch(`${url}/public/chat_agent/get_agents`, {
            mode: "cors",
            method: "POST",
            body: reqData,
            headers: new Headers({
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            }),
            cache: "no-cache",
          });
          const data = await response.json();
          setAgentList(data[0] || []);
          setLoading(false);
          localStorage.setItem(cacheKey, JSON.stringify(data[0] || []));
          console.log("Updated agentList:", data.data);
        }
      } catch (error) {
        console.error("Error fetching agent list:", error);
      }
    };
    getAgentList();
  }, [url]);*/
  }
  useEffect(() => {
    const scrollHeight = scrollRef?.current?.scrollHeight;
    setScrollHeight(scrollHeight);
    console.log(scrollHeight);
  }, [scrollRef?.current?.scrollHeight]);

  useEffect(() => {
    const cacheKey = `workspaceAgents_${session_id}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setAgentList(JSON.parse(cachedData)[0]?.chat_agents);
      setLoading(false);
    }
    if (agentList.length == 0) {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    console.log("Current agentList state:", agentList);
  }, [agentList]);

  const replaceHandler = () => {
    router.push("/workspace/agents/chats/createbot");
  };

  return (
    <div className="h-[50%] overflow-hidden mt-[2vw] ">
      <div
        className={`w-[75vw] border-b-[.05vw] border-zinc-300 overflow-y-auto mx-auto h-[90vh] mt-[1vh] rounded-t-md py-[2.5vh] px-[2.7vh] relative  ${
          theme === "dark" ? "bg-[#1A1C22] text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`flex items-center justify-between  w-full pb-[.9vw] pl-[1.5vw]  ${
            theme === "dark" ? "text-[#9f9f9f]" : " text-black"
          }`}
        >
          <h1 className="text-[1vw] font-bold">Chat Agents</h1>
          <button
            className={`bg-[#702963] flex items-center px-[.4vw] py-[.1vw] justify-end`}
          >
            <div
              className={`${
                theme === "dark" ? "text-white" : "text-white"
              } w-[1vw] h-[1vw]`}
            >
              <TfiReload />
            </div>
            <span className="font-bold text-white px-[.7vw] text-[.9vw]">
              Reload
            </span>
          </button>
        </div>

        <div
          className={`flex justify-center h-[40vh] w-full overflow-hidden pb-[6vh] px-[1.5vw]`}
        >
          <div
            ref={scrollRef}
            className={`flex flex-wrap items-center justify-start w-full overflow-y-scroll ${
              scrollHeight > 260 ? "scrollbar" : "scrollbar-none"
            } px-[2.5vw] py-[4vh] gap-[2.5vw] transition-all ${
              theme === "dark" ? "scrollbar-dark" : "scrollbar-light"
            }`}
          >
            <CreateButton
              onClick={replaceHandler}
              Icon={FaPlus}
              text=""
              className={`w-[10vw] min-h-[10vw] max-h-[10vw]`}
            />
            {isLoading ? (
              <>
                <SkeletonCard />
              </>
            ) : agentList.length === 0 ? (
              <div
                className={`${
                  theme === "dark" ? " text-[#9f9f9f]" : " text-[#9f9f9f]"
                } font-bold text-[1.1vw] w-[12vw] h-[12vw] flex items-center justify-center`}
              >
                No agents created
              </div>
            ) : (
              <>
                {agentList.map((agent, index) => (
                  <AgentList key={index} agent={agent} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAgent;
