"use client";

import useTheme from "next-theme";
import React, { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";
import CreateButton from "../buttons/CreateButton";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import WorkspaceList from "../workspace/WorkspaceList";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { setworkspacename } from "@/store/reducers/workspaceSlice";
import { getCookie } from "cookies-next";
import SkeletonCard from "../SkeletonCard";

const WorkSpace = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { workspacename } = useSelector((state) => state.workspace);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const session_id = getCookie("session_id");
  const url = process.env.url;

  useEffect(() => {
    const getWorkspaceList = async () => {
      try {
        const cacheKey = `workspaceList_${session_id}`;

        const reqData = JSON.stringify({ session_id });
        const response = await fetch(`${url}/public/workspace/get_workspace`, {
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
        setWorkspaceList(data[0] || []);
        setLoading(false);
        localStorage.setItem(cacheKey, JSON.stringify(data[0] || []));
        const cachedData = localStorage.getItem(cacheKey);
        console.log("Updated agentList:", data[0][1]);
      } catch (error) {
        console.log("Error fetching workspace list:", error);
      }
    };
    getWorkspaceList();
  }, [url]);

  const replaceHandler = () => {
    router.push("/workspace/createworkspace");
  };

  const workspaceHandler = async (workspaceId) => {
    const formdata = new FormData();
    formdata.append("session_id", session_id);
    formdata.append("workspace_id", workspaceId);

    const cacheKey = `workspaceAgents_${session_id}`;

    const response = await fetch(`${url}/public/workspace/get_agents`, {
      mode: "cors",
      method: "POST",
      body: formdata,
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
      }),
      cache: "no-cache",
    });
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data || []));
    console.log(data);
    router.push(`/workspace/agents?workspaceId=${workspaceId}`);
  };

  return (
    <div className="h-[100vh] overflow-hidden">
      <div
        className={`w-[75vw] overflow-y-auto mx-auto h-[90vh] mt-[5vh] rounded-[.9vh] shadow-xl py-[3.5vh] px-[2.7vh] relative  ${
          theme === "dark" ? "bg-[#1F222A] text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`flex items-center justify-between w-full pt-[1vw] pb-[.9vw] px-[1.5vw] border-zinc-300 ${
            theme === "dark" ? "text-[#9f9f9f]" : " text-black"
          }`}
        >
          <h1 className="text-[1.5vw] font-bold">Workspace</h1>
          <button
            className={`bg-[#702963] flex items-center px-[.4vw] py-[.1vw] justify-end`}
          >
            <div
              className={`${
                theme === "dark" ? "text-white" : "text-white"
              } w-[1.1vw] h-[1.1vw]`}
            >
              <TfiReload />
            </div>
            <span className="font-bold text-white px-[.7vw] text-[1vw]">
              Reload
            </span>
          </button>
        </div>

        <div
          className={`flex justify-center h-[40vh] w-full overflow-hidden px-[5vw]`}
        >
          <div
            className={`flex flex-wrap items-center justify-start w-full overflow-y-scroll scrollbar pb-[3vh] gap-[3vw] ${
              theme === "dark" ? "scrollbar-dark" : "scrollbar-light"
            }`}
          >
            <CreateButton
              onClick={() => setModal(true)}
              Icon={FaPlus}
              className={`w-[10vw] min-h-[10vw] max-h-[10vw]`}
            />
            {isLoading ? (
              <>
                <SkeletonCard />
              </>
            ) : workspaceList?.length === 0 ? (
              <div
                className={`${
                  theme === "dark" ? " text-[#9f9f9f]" : " text-[#9f9f9f]"
                } font-bold text-[1.1vw] w-[12vw] h-[12vw] flex items-center justify-center`}
              >
                No Workspace Created
              </div>
            ) : (
              <>
                {workspaceList?.map((workspace, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer text-[#737791] relative min-w-[10vw] max-w-[10vw] overflow-hidden min-h-[10vw] max-h-[10vw] border-[0.052vw] border-black rounded-[1.5vw] hover:shadow-lg hover:scale-[1.01] transition-all duration-100 ${
                      theme === "dark" ? "text-[#9f9f9f]" : " text-black"
                    }`}
                    onClick={() => workspaceHandler(workspace.id)}
                  >
                    <div className="h-[85%] w-full pl-[1vw] pr-[1vw] pt-[2vh] overflow-hidden">
                      <h3 className=" mb-[1vw] font-bold text-[1vw] text-black overflow-hidden w-full">
                        {workspace.workspace_name}
                      </h3>
                      {/*<span className='text[.5vw] font-normal'>
                                            {key?.workspace?.description}
                                        </span>*/}
                      <div
                        className={`flex items-center absolute bottom-0 left-0 w-full z-50`}
                      >
                        <div className={`w-[50%] hover:text-opacity-[.8]`}>
                          <button
                            className={`w-full flex justify-center p-[.5vw] text-[1.3vw] text-[#702963] text-center font-semibold`}
                          >
                            <IoSettingsSharp
                              onClick={() =>
                                router.push(
                                  `/workspace/settings?workspaceId=${workspace.id}`
                                )
                              }
                              className="hover:scale-[1.3] transition-all duration-300"
                            />
                          </button>
                        </div>
                        <div className={`w-[50%] rounded-tl-[1.5vw]`}>
                          <button
                            className={`w-full flex justify-center p-[.5vw] text-[1.2vw] text-[#702963] text-center font-semibold`}
                          >
                            <RiDeleteBin6Fill className="hover:scale-[1.3] transition-all duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {modal && (
          <Modal open={modal} onClose={() => setModal(false)}>
            <div className={`flex flex-col gap-[1vw] w-[20vw]`}>
              <h6 className="font-semibold">Add new workspace</h6>
              <div>
                <p className="text-[.8vw] text-[#9f9f9f]">Workspace name</p>
                <input
                  type="text"
                  onChange={(e) => dispatch(setworkspacename(e.target.value))}
                  value={workspacename}
                  className={`${
                    theme === "dark"
                      ? "bg-black text-white border-white"
                      : "bg-white text-black border-black"
                  } border-b-[.1vw] outline-none w-full p-[.5vw]`}
                />
              </div>
              <button
                onClick={replaceHandler}
                className={`bg-[#702963] rounded-[.2vw] p-[.3vw] text-white text-[1vw] mt-[1vw]`}
              >
                Create
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default WorkSpace;
