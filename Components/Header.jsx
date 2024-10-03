"use client"
import React, { useEffect, useState } from 'react';
import BellIcon from './Icons/BellIcon';
import SearchIcon from './Icons/SearchIcon';
import { getCookie } from 'cookies-next';

const Header = () => {
  const [input, setInput] = useState();
  const url=process.env.url;
  useEffect(() => {
    const getAgentList = async () => {
        try {
            const session_id = getCookie("session_id");
            const cacheKey = `agentList_${session_id}`;
            const cachedData = localStorage.getItem(cacheKey);
            if (!cachedData) {
                const reqData = JSON.stringify({ session_id });
                const response = await fetch(`${url}/public/chat_agent/get_agents`, {
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
                localStorage.setItem(cacheKey, JSON.stringify(data[0] || []));
            }
        } catch (error) {
            console.error("Error fetching agent list:", error);
        }
    };
    getAgentList();
}, [url]);
useEffect(() => {
  const getAgentList = async () => {
      try {
          const session_id = getCookie("session_id");
          const cacheKey = `phoneList_${session_id}`;
          const cachedData = localStorage.getItem(cacheKey);

          if (!cachedData) {
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
              localStorage.setItem(cacheKey, JSON.stringify(data[0] || []));
          }
      } catch (error) {
          console.error("Error fetching agent list:", error);
      }
  };
  getAgentList();
}, [url]);
  return (
    <div className="flex items-center justify-between p-[1vw] px-[3vw] h-[9.6vh]">
      <h1></h1>
      <div className='relative flex w-1/3 h-[1.92vh] items-center'>
        <div className="absolute flex justify-center items-center left-[1.5vw] bottom-[2.2vh">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full p-[.6vw] pl-[3vw] rounded-[.75vw] border-t-[.1vw] border-gray-300 text-black Hmd"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="relative cursor-pointer flex justify-center items-center w-[3vw] h-[3vw] bg-white rounded-[0.7vw]">
        <BellIcon  />
        <div className="absolute top-[.3vh] right-[0.3vw] w-[.7vw] h-[.7vw] bg-red-600 rounded-[.7vw]"></div>
      </div>
    </div>
  );
};

export default Header;
