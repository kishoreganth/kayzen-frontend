"use client";
import React, { useEffect, useState } from "react";
import DeleteIcon from "../../Icons/DeleteIcon";
import useTheme from "next-theme";
import AddFile from "./AddFileUpdate";
import ChatSettingNav from "./ChatSettingNav";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { setFileWordCounts } from "@/store/reducers/fileSliceUpdate";
import { useRouter } from "next/navigation";

// Utility function to validate URL
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const Source = () => {
  const { theme } = useTheme();
  const router = useRouter()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pastedUrl, setPastedUrl] = useState([]);
  const [inputUrl, setInputUrl] = useState("");
  const [err, setErr] = useState("");
  const [rawWordCounts, setRawWordCounts] = useState(0);
  const [rawText, setRawText] = useState("");
  const [selectedSection, setSelectedSection] = useState(0);
  const [chatAgent, setChatAgent] = useState(null);
  const [update, setUpdate] = useState(false);
  const { fileWordCounts } = useSelector((state) => state.fileUpdate);
  const file = useSelector((state) => state.fileUpdate.file);
  const urlFetch = process.env.url;
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [existingFile, setExistingFile] = useState({});
  // Retrieve chat agent from local storage
  useEffect(() => {
    const agent = localStorage.getItem("current_agent");
    if (agent) {
      const newAgent = JSON.parse(agent);
      setChatAgent(newAgent);
      setPastedUrl(newAgent?.urls || []);
      setRawText(newAgent?.raw_text || "");
      setRawWordCounts(
        newAgent?.raw_text ? newAgent?.raw_text.split(" ").length : 0
      );
      const f = newAgent?.file_name?.reduce((acc, fi) => {
        acc[fi] = { name: fi };
        return acc;
      }, {});
      dispatch(setFileWordCounts(newAgent?.file_word_count));
      setExistingFile(newAgent?.file_word_count);
      setTotalWordCount(newAgent?.total_tokens);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let total = 0;
    if (fileWordCounts) {
      total =
        Object.values(fileWordCounts).reduce((acc, count) => acc + count, 0) +
        rawWordCounts;
    }
    setTotalWordCount(total);
  }, [rawWordCounts, fileWordCounts]);

  const DetectChanges = (urls) => {
    let change = 0;
    if (urls != chatAgent.urls) {
      change += 1;
    }
    if (existingFile != chatAgent.file_word_count) {
      change += 1;
    }
    if (rawText != chatAgent.raw_text) {
      change += 1;
    }
    return change;
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    const dict = {};
    var urls = "";
    var existingFiles = "";
    pastedUrl.forEach((url1, index) => {
      urls += url1 + ",";
      dict[url1] = 0;
    });
    Object.keys(existingFile).forEach((name, index) => {
      existingFiles += name + ",";
    });
    existingFiles = existingFiles.substring(0, existingFiles.length - 1);
    urls = urls.substring(0, urls.length - 1);
    file?.forEach((file, index) => {
      formData.append("new_files", file);
    });
    const changes = DetectChanges(urls, existingFiles);
    if (changes == 0) {
      setErr("No Changes Is Done");
      return;
    }
    setErr("");
    const session_id = getCookie("session_id");
    formData.append("session_id", session_id);
    formData.append("chat_agent_id", chatAgent?.id);
    formData.append("URLs", urls);
    formData.append("files", file);
    formData.append("raw_text", rawText);
    formData.append("existing_files", existingFiles);
    formData.append("url_word_count", JSON.stringify(dict));
    formData.append("file_word_count", JSON.stringify(fileWordCounts));
    formData.append("raw_text_word_count", rawWordCounts);
    const response = await fetch(`${urlFetch}/public/chat_agent/update_base`, {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
      }),
      body: formData,
    });
    const chatId = await response.text();
    const formDataUpdate = new FormData();
    formDataUpdate.append("session_id", session_id);
    formDataUpdate.append("chat_agent_id", chatId);
    const res = await fetch(`${urlFetch}/public/chat_agent/get_agent/by_id`, {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
      }),
      body: formData,
    });
    const data = await res.json();
    localStorage.setItem("current_agent", JSON.stringify(data[0] || []));
  };

  const urlHandler = (e) => {
    setInputUrl(e.target.value);
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const rawTextHandler = (e) => {
    const text = e.target.value;
    setRawText(text);
    setRawWordCounts(text.split(" ").length - 1); // Update word count
    if (e.target.tagName === "TEXTAREA") {
      autoResizeTextarea(e.target);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const keypressHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputUrl || inputUrl.trim() === "") {
        setErr("Error: URL is empty");
      } else if (!isValidURL(inputUrl)) {
        setErr("Error: Invalid URL format");
      } else if (pastedUrl.length < 3) {
        const updatedUrls = [...pastedUrl, inputUrl];
        setPastedUrl(updatedUrls);
        setInputUrl("");
        setErr("");
      } else {
        setErr("You can only add up to 3 URLs!");
      }
    }
  };

  const removeUrl = (index) => {
    const updatedUrl = pastedUrl.filter((_, i) => i !== index);
    setPastedUrl(updatedUrl);
  };

  const links = [{ label: "file" }, { label: "URLs" }, { label: "Raw Text" }];

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  if (loading) return <div>Loading...</div>;

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
        className={`flex items-start justify-start py-[2vw] gap-[2vw] pl-[8vw] pr-[3vw] w-full h-full`}
      >
        <div
          className={`flex flex-col justify-start min-h-full w-[80%] py-[2vw] px-[1vw] rounded-lg ${
            theme === "dark" ? "bg-[#1A1C22] text-white" : "bg-white text-black"
          }`}
        >
          <h1 className="px-[2.5vw] text-[1.3vw] font-semibold pb-[1vh]">
            Data Source
          </h1>
          <form
            className="flex flex-col gap-[1vw] px-[4vw]"
            onSubmit={handleFormSubmit}
          >
            <div className="flex justify-between items-start">
              <div className={`flex flex-col w-[15%] text-[1vw]`}>
                {links.map((link, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <div className={`bg-zinc-200 min-w-full min-h-[.1vw]`} />
                    )}
                    <button
                      onClick={() => handleSectionClick(index)}
                      className={`${
                        index === selectedSection
                          ? "bg-zinc-300 text-black"
                          : ""
                      } px-[.5vw] py-[.5vh] my-[.4vw] rounded-[0.25vw]`}
                    >
                      {link.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {selectedSection === 0 ? (
                <div className="w-[80%]">
                  {!loading && (
                    <AddFile
                      existingFile={existingFile}
                      setExistingFile={setExistingFile}
                    />
                  )}
                </div>
              ) : selectedSection === 1 ? (
                <div className="w-[80%] flex flex-col items-center justify-start">
                  <input
                    onChange={urlHandler}
                    onKeyDown={keypressHandler}
                    value={inputUrl}
                    type="url"
                    id="url"
                    className={`text-[1vw] border-[0.052vw] w-full border-zinc-300 px-[1.3vw] py-[.5vh] rounded-[.4vw] ${
                      theme === "dark"
                        ? "bg-[#1F222A] text-white"
                        : "bg-white text-black"
                    }`}
                    placeholder="Enter URLs"
                  />
                  <div className="flex flex-col gap-[.5vw] text-[1vw] mt-[2vh] w-[100%]">
                    {pastedUrl.length > 0 &&
                      pastedUrl.map((url, index) => (
                        <div
                          key={index}
                          className="h-[4vh] w-full border-[1px] border-zinc-300 px-[1vw] py-[.5vh] text-[.7vw] rounded-[.4vw] flex justify-between items-center"
                        >
                          <span className="text-black">{url}</span>
                          <button onClick={() => removeUrl(index)} className="">
                            <DeleteIcon />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <>
                  <span className="absolute left-[65vw] top-[26vh]">
                    Words count: {rawWordCounts}
                  </span>
                  <textarea
                    onChange={rawTextHandler}
                    value={rawText}
                    id="rawText"
                    className={`text-[1vw] border-[0.052vw] w-[35vw] border-zinc-300 px-[1.3vw] pb-[1.8vh] pt-[1.8vh] rounded-[.5vw] overflow-hidden ${
                      theme === "dark"
                        ? "bg-[#1F222A] text-white"
                        : "bg-white text-black"
                    }`}
                    placeholder="Enter raw text"
                    style={{ height: "auto", minHeight: "15vh" }}
                  ></textarea>
                </>
              )}
            </div>
          </form>
        </div>
        <div
          className={`flex flex-col gap-[1vw] justify-center items-center w-[20%] py-[4vh] px-[1vw] rounded-[.5vw] ${
            theme === "dark" ? "bg-[#1A1C22] text-white" : "bg-white text-black"
          }`}
        >
          <h5 className={`font-semibold text-[1vw]`}>Sources</h5>
          <h6 className={`font-semibold text-[.9vw] pt-[.7vw]`}>
            Total characters detected
          </h6>
          <p className={`text-[.8vw] pb-[.7vw]`}>
            <span className={`font-semibold`}>{totalWordCount}</span> /1,000,000
            limit
          </p>
          <span className="absolute top-[43vh] text-red-900 text-[.7vw]">
            *{err}
          </span>
          <button
            className={`text-white font-semibold text-[1vw] bg-[#702963] px-[1vw] py-[.6vh] rounded-md`}
            onClick={handleUpdate}
          >
            Retrain Chatbot
          </button>
        </div>
      </div>
    </div>
  );
};

export default Source;
