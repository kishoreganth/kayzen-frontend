"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "next-theme";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  setelevenlabskey,
  setopenaikey,
  settwilioauthtoken,
  settwiliosid,
  setworkspacename,
} from "@/store/reducers/workspaceSlice";
import Modal from "../Modal";
import { getCookie } from "cookies-next";
import { GrFormEdit } from "react-icons/gr";

const CreateWorkspace = () => {
  const dispatch = useDispatch();
  const {
    workspacename,
    twilioauthtoken,
    twiliosid,
    elevenlabskey,
    openaikey,
  } = useSelector((state) => state.workspace);
  const navigate = useRouter();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const workspace_id = searchParams.get("workspaceId");
  const session_id = getCookie("session_id");
  const [modal, setModal] = useState(false);
  const [workspace, setWorkspace] = useState({});
  const [filteredWorkspace, setFilteredWorkspace] = useState({});
  const [err, setErr] = useState("");
  const formdata = new FormData();
  formdata.append("session_id", session_id);
  formdata.append("workspace_id", workspace_id);
  formdata.append("workspace_name", workspacename);
  formdata.append("twilio_SSID", twiliosid);
  formdata.append("twilio_auth_token", twilioauthtoken);
  formdata.append("elevenlabs_api_key", elevenlabskey);
  formdata.append("openai_api_key", openaikey);
  const url = process.env.url;

  useEffect(() => {
    const getWorkspaceList = async () => {
      try {
        const cacheKey = `workspaceList_${session_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setWorkspace(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const reqData = JSON.stringify({ session_id });
          const response = await fetch(
            `${url}/public/workspace/get_workspace`,
            {
              mode: "cors",
              method: "POST",
              body: reqData,
              headers: new Headers({
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json",
              }),
              cache: "no-cache",
            }
          );
          const data = await response.json();
          setWorkspace(data[0] || []);
          setLoading(false);
          localStorage.setItem(cacheKey, JSON.stringify(data[0] || []));
          console.log("Updated agentList:", data[0][1]);
        }
      } catch (error) {
        console.log("Error fetching workspace list:", error);
      }
    };
    getWorkspaceList();
  }, [url]);

  useEffect(() => {
    if (workspace.length > 0 && workspace_id) {
      // Filter out the object that matches the route id
      const matchedId = workspace.find((item) => item.id === workspace_id);
      setFilteredWorkspace(matchedId);
      console.log(matchedId);
    }
  }, [workspace, workspace_id]);

  useEffect(() => {
    if (filteredWorkspace) {
      dispatch(setworkspacename(filteredWorkspace?.workspace_name || ""));
      dispatch(settwiliosid(filteredWorkspace?.twilio_SSID || ""));
      dispatch(settwilioauthtoken(filteredWorkspace?.twilio_auth_token || ""));
      dispatch(setelevenlabskey(filteredWorkspace?.elevenlabs_api_key || ""));
      dispatch(setopenaikey(filteredWorkspace?.openai_api_key || ""));
    }
  }, [filteredWorkspace, dispatch]); // Add dispatch as a dependency

  const saveHandler = async () => {
    if (openaikey === "") {
      setErr("API Key required");
    } else if (workspace.find((item) => item.id === workspace_id)) {
      if (
        filteredWorkspace?.twilio_SSID !== twiliosid ||
        filteredWorkspace?.twilio_auth_token !== twilioauthtoken ||
        filteredWorkspace?.elevenlabs_api_key !== elevenlabskey ||
        filteredWorkspace?.openai_api_key !== openaikey
      ) {
        console.log(twilioauthtoken);

        // Send updated data to the server
        const response = await fetch(`${url}/public/workspace/update`, {
          mode: "cors",
          method: "POST",
          headers: new Headers({
            "ngrok-skip-browser-warning": "true",
          }),
          body: formdata,
        });

        navigate.push("/workspace");
      }
    } else {
      const response = await fetch(`${url}/public/workspace/create_test`, {
        mode: "cors",
        method: "POST",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
        body: formdata,
      });

      navigate.push("/workspace");
    }
  };

  return (
    <div
      className={`w-full Hmd h-screen relative flex justify-between ${
        theme === "dark" ? "bg-[#1F222A] text-white" : "bg-[#F2F4F7] text-black"
      }`}
    >
      <div className="h-full w-full flex flex-col justify-start items-start  px-[2vw]">
        <div className="flex items-center justify-between gap-[1vw]">
          <input
            type="text"
            onChange={(e) => dispatch(setworkspacename(e.target.value))}
            value={workspacename}
            className={`${
              theme === "dark" ? " text-white" : " text-black"
            } bg-transparent capitalize font-semibold text-[1.4vw] pl-[2vw] py-[1vw] outline-none text-start w-[10vw] max-w-[20vw]`}
          >
            
          </input>

          <GrFormEdit
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } text-[2.5vw] hover:scale-[.9]`}
          />
        </div>

        <div className="flex w-full h-[90vh] pb-[3vw] overflow-hidden ">
          <div
            className={`flex flex-col w-full items-start justify-start gap-[4vw] mx-[5vw] p-[2vw] pb-[3vw] overflow-y-scroll scrollBar ${
              theme === "dark" ? "scrollbar-dark" : "scrollbar-light"
            }`}
          >
            <div
              className={`flex flex-col min-w-[80%] max-w-[80%] shadow-xl rounded-lg p-[3vw]`}
            >
              <div
                className={`flex flex-col gap-[1.5vw] items-start justify-center`}
              >
                <div>
                  <h5 className={`font-bold text-[1.1vw]`}>
                    Twilio integration - optional
                  </h5>
                  <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                    Setup your twilio account
                  </p>
                </div>
                <div className={`flex gap-[4vw] w-full`}>
                  <div className="flex flex-col gap-[.3vw] w-[50%]">
                    <h4 className={`font-bold text-[1.1vw]`}>SSID</h4>
                    <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                      Paste your twilio account SSID
                    </p>
                    <input
                      type="text"
                      onChange={(e) => dispatch(settwiliosid(e.target.value))}
                      value={twiliosid}
                      className={`${
                        theme === "dark"
                          ? "bg-[#1A1C22] text-white"
                          : "bg-white text-black"
                      } h-[2.5vw] p-[1vw] outline-none rounded-lg`}
                    />
                  </div>
                  <div className="flex flex-col gap-[.3vw] w-[50%]">
                    <h4 className={`font-bold text-[1.1vw]`}>AUTH TOKEN</h4>
                    <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                      Paste your twilio AUTH TOKEN
                    </p>
                    <input
                      type="text"
                      onChange={(e) =>
                        dispatch(settwilioauthtoken(e.target.value))
                      }
                      value={twilioauthtoken}
                      className={`${
                        theme === "dark"
                          ? "bg-[#1A1C22] text-white"
                          : "bg-white text-black"
                      } h-[2.5vw] p-[1vw] outline-none rounded-lg`}
                    />
                  </div>
                </div>
                <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                  To be able to assign our agents to a phone number you'll need
                  a twilio account. if you don't have a twilio account, you can{" "}
                  <Link
                    href={""}
                    className={`underline text-[#702963] hover:text-opacity-[0.85]`}
                  >
                    sign-up
                  </Link>{" "}
                  for a free trial. [No credit card or monthly commitments
                  required ]
                </p>
              </div>

              <div className={`w-full h-[.1vw] bg-zinc-300 my-[3vw]`} />

              <div
                className={`flex flex-col gap-[1.5vw] items-start justify-center`}
              >
                <div>
                  <h5 className={`font-bold text-[1.1vw]`}>
                    Elevenlabs integration - optional
                  </h5>
                  <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                    Connect your elevenlabs account to import your voices
                  </p>
                </div>

                <div className="flex flex-col gap-[.3vw] w-[100%]">
                  <h4 className={`font-bold text-[1.1vw]`}>API Key</h4>
                  <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                    Insert your elevenlabs API
                  </p>
                  <input
                    type="text"
                    onChange={(e) => dispatch(setelevenlabskey(e.target.value))}
                    value={elevenlabskey}
                    className={`${
                      theme === "dark"
                        ? "bg-[#1A1C22] text-white"
                        : "bg-white text-black"
                    } h-[2.5vw] p-[1vw] outline-none rounded-lg`}
                  />
                </div>
                <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                  Don't have an Elevenlabs account?{" "}
                  <Link
                    href={""}
                    className={`underline text-[#702963] hover:text-opacity-[0.85]`}
                  >
                    Sign-up here
                  </Link>{" "}
                  for a free account and import your voices instantly into{" "}
                  <br /> Kayzen
                </p>
              </div>

              <div className={`w-full h-[.1vw] bg-zinc-300 my-[3vw]`} />

              <div
                className={`flex flex-col gap-[1.5vw] items-start justify-center`}
              >
                <div>
                  <h5 className={`font-bold text-[1.1vw]`}>
                    OpenAI integration
                  </h5>
                  <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                    Insert your own openAI key here to use a different model
                    than the default [3.5-turbo] inside your agents.
                  </p>
                </div>

                <div className="flex flex-col gap-[.3vw] w-[100%]">
                  <div className="flex gap-[.5vw]">
                    <h4 className={`font-bold text-[1.1vw]`}>API Key</h4>
                    {err && openaikey === "" && (
                      <span className="text-red-500 capitalize Hsm font-medium">
                        *API Key required
                      </span>
                    )}
                  </div>
                  <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                    Insert your OpenAI Key below
                  </p>
                  <input
                    type="text"
                    onChange={(e) => dispatch(setopenaikey(e.target.value))}
                    value={openaikey}
                    className={`${
                      theme === "dark"
                        ? "bg-[#1A1C22] text-white"
                        : "bg-white text-black"
                    } h-[2.5vw] p-[1vw] outline-none rounded-lg`}
                  />
                </div>
                <div>
                  <button
                    onClick={saveHandler}
                    className={`bg-[#702963] hover:bg-[#702963] hover:bg-opacity-[0.85] font-semibold text-[1vw] px-[1vw] py-[.5vw] rounded-lg text-white`}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-[2vw] items-start justify-center max-w-[80%] min-w-[80%] shadow-xl rounded-lg p-[3vw]`}
            >
              <div className="flex flex-col gap-[.3vw] w-[100%]">
                <h4 className={`font-bold text-[1vw]`}>Delete workspace</h4>
                <p className={`text-[#9f9f9f] text-[.9vw] font-semibold`}>
                  Delete this workspace and all of its data and configuration
                </p>
                <div>
                  <button
                    onClick={() => setModal(true)}
                    className={`bg-[#702963] hover:bg-[#702963] hover:bg-opacity-[0.85] font-semibold text-[1vw] px-[1vw] py-[.5vw] rounded-lg text-white`}
                  >
                    Permenantly Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modal && (
          <Modal open={modal}>
            <div
              className={`flex flex-col gap-[2vw] rounded-lg items-center w-[20vw]`}
            >
              <div className={`flex flex-col gap-[.5vw] items-center`}>
                <h4 className="text-[1.1vw] font-bold">
                  Are your sure you want to Delete?
                </h4>
                <p className="text-[.9vw] font-medium text-center text-[#9f9f9f]">
                  this workspace and all of its data and configuration will be
                  deleted
                </p>
              </div>
              <div className="flex items-center gap-[2vw]">
                <button
                  onClick={() => setModal(false)}
                  className="text-[1.1vw] font-bold"
                >
                  Cancel
                </button>
                <button
                  //onClick={}
                  className="bg-red-500 hover:bg-opacity-[0.8] text-white text-[1.1vw] font-bold px-[.5vw] py-[.25vw] rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CreateWorkspace;
