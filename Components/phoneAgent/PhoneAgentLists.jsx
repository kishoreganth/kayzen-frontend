"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import GradientButton from "../buttons/GradientButton";
import { IoIosAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AgentCard from "./AgentCard";
import { getCookie } from "cookies-next";
import useTheme from "next-theme";
import CreateButton from "../buttons/CreateButton";
import SkeletonCard from "../SkeletonCard";
import { TfiReload } from "react-icons/tfi";

const PhoneAgentList = () => {
  const { theme } = useTheme();
  const router = useRouter();
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
                const cacheKey = `phoneList_${session_id}`;
                const cachedData = localStorage.getItem(cacheKey);

                if (cachedData) {
                    setAgentList(JSON.parse(cachedData));
                    setLoading(false)
                } else {
                    const reqData = JSON.stringify({ session_id });
                    const response = await fetch(`${url}/public/phone_agent/get_agents`, {
                        mode: 'cors',
                        method: 'POST',
                        body: reqData,
                        headers: new Headers({
                            "ngrok-skip-browser-warning": 'true',
                            'Content-Type': 'application/json',
                        }),
                        cache: 'no-cache'
                    });
                    const data = await response.json();
                    setAgentList(data[0] || []);
                    setLoading(false)
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
      setAgentList(JSON.parse(cachedData)[0]?.phone_agents);
      setLoading(false);
      console.log(cachedData[0]);
    }
    if (agentList.length == 0) {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    console.log("Current agentList state:", agentList);
  }, [agentList]);

  const replaceHandler = () => {
    router.push("/workspace/agents/phone/createagent");
  };

  return (
    <div className="h-[50%] overflow-hidden mb-[2vw] ">
      <div
        className={`w-[75vw] border-t-[.05vw] border-zinc-300 overflow-y-auto mx-auto h-[100vh] rounded-b-[.9vh] py-[2.5vh] px-[2.7vh] relative  ${
          theme === "dark" ? "bg-[#1A1C22] text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`flex items-center justify-between  w-full pb-[.9vw] pl-[1.5vw]  ${
            theme === "dark" ? " text-[#9f9f9f]" : " text-black"
          }`}
        >
          <h1 className="text-[1vw] font-bold">Phone Agents</h1>
        </div>

        <div
          className={`flex justify-center h-[40vh] w-full overflow-hidden pb-[6vh] px-[1.5vw]`}
        >
          <div
            ref={scrollRef}
            className={`flex flex-wrap items-center justify-start w-full overflow-y-scroll ${
              scrollHeight > 260 ? "scrollbar" : "scrollbar-none"
            } px-[2.5vw] py-[4vh] gap-[2.5vw] ${
              theme === "dark" ? "scrollbar-dark" : "scrollbar-light"
            }`}
          >
            <CreateButton
              onClick={replaceHandler}
              Icon={FaPlus}
              text="Create a new Phonebot"
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
                No Agents Created
              </div>
            ) : (
              <>
                {agentList.map((agent, index) => (
                  <AgentCard key={index} agent={agent} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAgentList;
