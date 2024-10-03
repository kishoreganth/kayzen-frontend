"use client";

import useTheme from "next-theme";
import React, { useEffect, useState } from "react";
import ChatSettingNav from "../ChatSettingNav";
import SettingsNav from "../settings/SettingsNav";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const Ai = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [chatAgent, setChatAgent] = useState(null);
  const [botName, setBotName] = useState("");
  const [des, setDes] = useState("");
  const [promt, setPrompt] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const urlFetch = process.env.url;
  const router = useRouter()

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const descriptionHandler = (e) => {
    const text = e.target.value;
    setDes(text);
    //dispatch(setPrompt(text));  // Update Redux store on change
    if (e.target.tagName === "TEXTAREA") {
      autoResizeTextarea(e.target);
    }
  };

  const promptHandler = (e) => {
    const text = e.target.value;
    setPrompt(text);
    //dispatch(setPrompt(text));  // Update Redux store on change
    if (e.target.tagName === "TEXTAREA") {
      autoResizeTextarea(e.target);
    }
  };

  const updateDetails = async () => {
    const session_id = getCookie("session_id");
    const formData = new FormData();
    formData.append("session_id", session_id);
    formData.append("chat_agent_id", chatAgent?.id);
    formData.append("botname", botName);
    formData.append("description", des);
    formData.append("prompt", promt);
    const response = await fetch(`${urlFetch}/public/chat_agent/update`, {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
      }),
      body: formData,
    });
    const data = await response.text();
  };

  // Retrieve chat agent from local storage
  useEffect(() => {
    const agent = localStorage.getItem("current_agent");
    if (agent) {
      setChatAgent(JSON.parse(agent));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setBotName(chatAgent?.bot_name);
    setDes(chatAgent?.description);
    setPrompt(chatAgent?.prompts);
  }, [chatAgent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
          className={`flex flex-col w-[80%] h-full mx-[1vw] pb-[3vw] overflow-y-scroll rounded-lg border-[.15vw] border-zinc-300 ${
            theme === "dark" ? "bg-[#1A1C22]" : "bg-white"
          }`}
        >
          <div
            className={`${
              theme === "dark" ? "text-zinc-100" : "text-black"
            } flex flex-col gap-[.9vw]  py-[2vw] px-[3vw] w-full h-full  font-semibold text-[.9vw]`}
          >
            <h6 className={`font-bold text-[1.1vw] pb-[.5vw] `}>AI</h6>
            <form
              className="flex flex-col gap-[2vw] pb-[7vw]"
              onSubmit={handleFormSubmit}
            >
              <div className={`flex flex-col gap-[.3vw] pb-[2vw]`}>
                <div className={`flex items-center gap-[.5vw]`}>
                  <label
                    htmlFor="rawText"
                    className="text-[1.1vw] font-semibold"
                  >
                    Model
                  </label>
                  <span
                    className={`text-[.6vw] font-semibold text-purple-600 bg-purple-300 px-[.4vw] py-[.2vw] rounded-md`}
                  >
                    gpt-4o is now available
                  </span>
                </div>
                <select
                  className={`px-[.4vw] py-[.5vw] rounded-[.4vw] border-[.052vw] border-zinc-300 ${
                    theme === "dark" ? "bg-[#1A1C22]" : "bg-white"
                  }`}
                >
                  <option value="gpt-4o">
                    gpt-4o is the most advanced openAi model
                  </option>
                  <option value="gpt-4o">gpt-4o: 1 credit per response</option>
                  <option value="gpt-4-turbo">
                    gpt-4-turbo: 10 credits per response
                  </option>
                  <option value="gpt-4">gpt-4: 20 credits per response</option>
                  <option value="gpt-3.5-turbo">
                    gpt-3.5-turbo: 1 credit per response
                  </option>
                </select>
              </div>
              <div className={`flex gap-[1vw]`}>
                <div className={`flex flex-col w-[40%]`}>
                  <label
                    htmlFor="botname"
                    className="text-[1.1vw] font-semibold pt-[1vw]"
                  >
                    Bot Name
                  </label>
                  <span className={`text-[.7vw] font-normal text-zinc-300`}>
                    Enter yout Chatbot's name here <br /> eg: (Alex, Maya)
                  </span>
                </div>
                <input
                  // onChange={''}
                  // onKeyDown={''}
                  //value={''}
                  type="name"
                  id="url"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className={`text-[1vw] border-[0.052vw] w-[80%] border-zinc-300 px-[1.3vw] py-[.5vh] rounded-[.4vw] ${
                    theme === "dark"
                      ? "bg-[#1F222A] text-white"
                      : "bg-white text-black"
                  }`}
                  placeholder="Enter a name"
                />
              </div>
              <div className="flex gap-[1vw]">
                <div className="flex flex-col w-[40%]">
                  <label
                    htmlFor="description"
                    className="capitalize text-[1.1vw] font-semibold"
                  >
                    Description
                  </label>
                  {/*err && <span className='text-red-800 capitalize text-[.7vw] font-medium '>*{err}</span>*/}
                  <span
                    className={`text-[.7vw] break-words font-normal text-zinc-300`}
                  >
                    Enter your chatbot's description, including it main purpose
                    and tasks <br /> (eg: A customer support assistant that
                    answers FAQs and resolves issues, or a travel booking helper
                    that finds and books flights and hotels)
                  </span>
                </div>
                <textarea
                  onChange={descriptionHandler}
                  // onKeyDown={''}
                  value={des}
                  type="description"
                  id="url"
                  className={`text-[1vw] resize-none overflow-hidden border-[0.052vw] w-[80%] border-zinc-300 px-[1.3vw] pt-[1.8vh] pb-[8vh] rounded-[.4vw] ${
                    theme === "dark"
                      ? "bg-[#1F222A] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>
              <div className="flex gap-[1vw]">
                <div className={`flex flex-col w-[40%]`}>
                  <label
                    htmlFor="prompt"
                    className="text-[1.1vw] font-semibold"
                  >
                    Prompt
                  </label>
                  <span className={`text-[.7vw] font-normal text-zinc-300`}>
                    Enter a sample prompt for your chatbot, which is a typical
                    question or request it will handle. This helps define how
                    the chatbot should respond. <br /> For example, if your
                    chatbot assists with booking flights, you might use 'Can you
                    help me find a flight to New York?' or if it's a customer
                    support, 'I need help with a billing issue.' This will give
                    the chatbot a clear idea of the types of interactions it
                    should manage.
                  </span>
                </div>
                <textarea
                  onChange={promptHandler}
                  value={promt}
                  id="prompt"
                  className={`text-[1vw] overflow-hidden border-[0.052vw] w-[80%] border-zinc-300 px-[1.3vw] pb-[8vh] pt-[1.8vh] rounded-[.5vw] resize-none ${
                    theme === "dark"
                      ? "bg-[#1F222A] text-white"
                      : "bg-white text-black"
                  }`}
                  placeholder="Example: you are a sales agent, talk pursuasively and respond to the asnwers politely"
                ></textarea>
              </div>
              <div
                className={`relative flex flex-col w-full justify-center items-end`}
              >
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <button
                    type="submit"
                    className={`text-[.8vw] text-white bg-[#702963] hover:bg-opacity-[0.8] cursor-pointer px-[1.3vw] py-[.5vw] rounded-sm ${
                      chatAgent?.bot_name === botName &&
                      chatAgent?.description === des &&
                      chatAgent?.prompts === promt &&
                      "pointer-events-none opacity-[0.4]"
                    }`}
                    onClick={updateDetails}
                  >
                    Save
                  </button>
                </div>
                {chatAgent?.bot_name === botName &&
                  chatAgent?.description === des &&
                  chatAgent?.prompts === promt &&
                  isHovered && (
                    <span
                      className={`absolute pointer-events-none transition-all duration-1000 right-[10%] text-[.8vw] font-normal px-[.4vw] py-[.2vw] rounded-md ${
                        theme === "dark"
                          ? "text-white bg-[#1F222A]"
                          : "text-black bg-[#F3F4F7]"
                      }`}
                    >
                      No changes to save
                    </span>
                  )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
