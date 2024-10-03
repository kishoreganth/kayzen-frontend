"use client";

import useTheme from "next-theme";
import React, { useEffect, useState } from "react";
import ChatSettingNav from "../ChatSettingNav";
import SettingsNav from "../settings/SettingsNav";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the new component
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const General = () => {
  const { theme } = useTheme();
  const [chatAgent, setChatAgent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const urlFetch = process.env.url;
  const navigate = useRouter();
  // Retrieve chat agent from local storage
  useEffect(() => {
    const agent = localStorage.getItem("current_agent");
    if (agent) {
      setChatAgent(JSON.parse(agent));
    }
  }, []);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    // Delete chat agent from local storage and database
    const session_id = getCookie("session_id");
    const formData = new FormData();
    formData.append("session_id", session_id);
    formData.append("chat_agent_id", chatAgent?.id);
    const response = await fetch(`${urlFetch}/public/chat_agent/delete`, {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
      }),
      body: formData,
    });
    const data = await response.text();
    localStorage.removeItem("current_agent");
    localStorage.removeItem("agentList_" + session_id);
    console.log("Chatbot deleted ", data);
    setIsDialogOpen(false);
    navigate.push("/chats");
  };

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
                navigate.push(`/workspace/agents?workspaceId=${chatAgent?.workspace_id}`)
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
        className={`flex items-start justify-start py-[1vw] gap-[2vw] pl-[13vw] pr-[3vw] w-full h-full`}
      >
        <div
          className={`flex flex-col justify-center w-[20%] py-[2vw] px-[1vw] rounded-lg ${
            theme === "dark" ? "bg-[#1A1C22] text-white" : "bg-white text-black"
          }`}
        >
          <SettingsNav />
        </div>
        <div
          className={`flex flex-col w-[50%] h-full mx-[1vw] rounded-lg border-[.15vw] border-zinc-300 ${
            theme === "dark" ? "bg-[#1A1C22]" : "bg-white"
          }`}
        >
          <div
            className={`${
              theme === "dark" ? "text-zinc-100" : "text-black"
            } flex flex-col gap-[.9vw] py-[2vw] px-[3vw] w-full h-full  font-semibold text-[.9vw]`}
          >
            <h6 className={`font-bold text-[1.1vw] pb-[.5vw] `}>
              {chatAgent?.bot_name}
            </h6>
            <div className={`flex flex-col`}>
              <span
                className={`${
                  theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                }`}
              >
                Chatbot ID
              </span>
              {chatAgent?.id}
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
              <div className={`flex flex-col ml-[7vw]`}>
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
            <div className={`flex gap-[6vw]`}>
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
              <div className={`flex flex-col ml-[6.5vw]`}>
                <span
                  className={`${
                    theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                  }`}
                >
                  Temperature
                </span>
                0
              </div>
            </div>
            <div className={`flex gap-[6vw]`}>
              <div className={`flex flex-col`}>
                <span
                  className={`${
                    theme === "dark" ? "text-[#9f9f9f]" : " text-zinc-400"
                  }`}
                >
                  Number of Tokens
                </span>
                {chatAgent?.total_tokens}
              </div>
              <div className={`flex flex-col ml-[2.2vw]`}>
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
            <div className="mt-[5vh]">
              <h3 className="text-red-500 text-[1.2vw]">Delete Chatbot</h3>
              <br />
              <span className="text-[.8vw]">
                We will immediately delete your chat bot details along with
                files used to create it. You will no longer be able to use the
                endpoints for this chatbot.
              </span>
              <br />
              <button
                onClick={handleDeleteClick}
                className="text-white mt-[3vh] bg-red-500 p-[1vh] "
              >
                Delete Your Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        cancelClass={"border-[.2vw] border-[#702963] hover:border-opacity-[.8]"}
      />
    </div>
  );
};

export default General;
