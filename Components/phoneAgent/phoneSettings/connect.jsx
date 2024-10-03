"use client";

import useTheme from "next-theme";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PhoneSettingNav from "./PhoneSettingNav";
import { SiTicktick } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

const connect = () => {
  const { theme } = useTheme();
  const [phoneAgent, setPhoneAgent] = useState(null);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [webhook, setWebhook]= useState('webhook endpoint here');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(webhook);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000); 
  };

  useEffect(() => {
    const agent = localStorage.getItem("current_agent");
    if (agent) {
      setPhoneAgent(JSON.parse(agent));
    }
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

      <div className="flex flex-col w-full h-full items-center justify-start">
        <div
          className={`flex flex-col mt-[1vw] w-[50%] text-[#9f9f9f] ${
            theme === "dark" ? "bg-black" : "bg-white"
          } p-[1.5vw] rounded-lg shadow-lg gap-[.3vw]`}
        >
          <div className="flex flex-col">
            <h5
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold text-[1vw]`}
            >
              Webhook endpoint
            </h5>
            <p className="font-medium text-[.8vw]">
              Send data to your agent through webhook integration
            </p>
          </div>
          
          <div className={`flex justify-between items-center rounded-md px-[1vw] py-[.5vw] ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-[#F3F4F7] text-black'}`}>
            <input type="text" value={webhook} disabled className="bg-transparent" />
            <button onClick={handleCopy}>
              {copied ? (
                <FaClipboardCheck />
              ) : (
                <FaClipboardList />
              )}
            </button>
          </div>

          <div className="flex flex-col">
            <h5
                className={`${
                theme === "dark" ? "text-white" : "text-black"
                } font-semibold text-[.9vw] mt-[1vw]`}
            >
                Required fields
            </h5>
            <p className="font-medium text-[.8vw]">
                Webhook required fields mapping
            </p>
          </div>
          <div className="flex font-medium items-center gap-[.5vw] text-[.8vw]">
            <SiTicktick
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              name
            </span>
            <p>required field, field name: name, type: text</p>
          </div>
          <div className="flex font-medium items-center gap-[.5vw] text-[.8vw]">
            <SiTicktick
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              phone_number
            </span>
            <p>required field, field name: phone_number, type: phone number</p>
          </div>
          <h6
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } text-[.9vw] font-semibold mt-[1vw]`}
          >
            Optional
          </h6>
          <div className="flex items-center font-medium gap-[.5vw] text-[.8vw]">
            <SiTicktick
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              api
            </span>
            <p>required field, field name: api, type: api_key</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect;
