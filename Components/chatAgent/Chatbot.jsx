"use client"
import useTheme from 'next-theme';
import { useState, useRef, useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import { v4 } from 'uuid';
import { BsRobot } from "react-icons/bs";

const Chatbot = ({ height,chatAgentId,loading }) => {
  // State to store the messages
  const [messages, setMessages] = useState([
    { text: "Here's a link to our portfolio showcasing various projects we've completed.", sender: "bot" },
  ]);
  const [sessionUUID, setSessionUUID] = useState('');
  const Cookie = useCookies()
  const [includesMessage, setIncludesMessage] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const urlFetch = process.env.url;

  const [chatAgent, setChatAgent] = useState(null);

  // Retrieve chat agent from local storage
  useEffect(() => {
   
      const agent = localStorage.getItem('current_agent');
      if (agent) {
          setChatAgent(JSON.parse(agent));
      }
  }, []);

  useEffect(() => {
    let uuid = Cookie.get('sessionUUID')
    if (!uuid) {
      uuid = v4()
      Cookie.set('sessionUUID', uuid);
    }
    setSessionUUID(uuid);
  }, [])

  const messageEndRef = useRef(null)

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const clearMessages = () => {
    setMessages(useState([]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input || input === null) return
    setMessages((prevChatLog) => [...prevChatLog, { sender: 'user', text: input }])
    setInput('')
    const textInput=input;
    const formData = new FormData();
    formData.append('user_input', textInput);
    formData.append('conversation_id', sessionUUID);
    formData.append('chat_agent_id', chatAgentId)
    await fetch(`${urlFetch}/tester/chat`, {
      mode: 'cors',
      method: 'POST',
      headers: new Headers({
        "ngrok-skip-browser-warning": 'true',
      }),
      body: formData
    })
      .then((res) => res.text())
      .then((res) => { setMessages((pre) => [...pre, { sender: 'bot', text: res }]);})
  }

  // State for the current input
  const [input, setInput] = useState("");
  const { theme } = useTheme()

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput(""); // Clear input after sending

      // Simulate bot response (this is just an example, replace with real logic)
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "Thanks for your message! We’ll get back to you shortly.", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className={` w-[30vw] border-[1px] border-zinc-300  rounded-xl overflow-hidden flex flex-col  shadow-xl ${loading? 'opacity-55 select-none ':''} ${theme === "dark" ? 'text-[#9f9f9f] bg-[#1F222A]' : ' text-black bg-white'}`} style={{ height: height }}>
      {/* Header */}
      <div className='w-full h-[9vh] border-b border-zinc-300 flex items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <div className='w-[50px] h-[50px] flex items-center justify-center rounded-full overflow-hidden'>
           <BsRobot className='text-[1.8vw]' />
          </div>
          <h6 className={`text-xl font-semibold ${theme === "dark" ? 'text-[#9f9f9f]' : ' text-black'}`}>{chatAgent?.bot_name}</h6>
        </div>
        <button className='cursor-pointer w-10' onClick={clearMessages}>
          <lord-icon
            src="https://cdn.lordicon.com/ogkflacg.json"
            trigger="hover"
            colors={` ${theme === "dark" ? '#fff' : '#000'}`}
            style={{ height: '20px', width: '20px' }}>
          </lord-icon>
        </button>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[15vw] w-fit chat-item ${message.sender === "user"
              ? "bg-gray-200 text-gray-800 ml-auto chat-item2"
              : "bg-[#702963] text-white mr-auto chat-item1"
              }`}
          >
            {message.text}
          </div>
        ))}
        {/* Add a div with ref to scroll into view */}
        <div ref={messageEndRef} />
      </div>

      {/* Input Section */}
      <div className='h-[9vh] w-full flex items-center border-t border-zinc-300 px-4'>
        <input
          type="text"
          placeholder="Type a message..."
          className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${theme === "dark" ? 'text-[#9f9f9f]' : ' text-black'}`}
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          type="button"
          className='ml-2 bg-[#702963] text-white px-4 py-2 rounded-lg'>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
