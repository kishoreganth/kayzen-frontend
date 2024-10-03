import useTheme from 'next-theme';
import { useRouter } from 'next/navigation';
import React from 'react'

const AgentList = (key,agent) => {
    const router = useRouter();
    const {theme} = useTheme
    const replaceHandler = () => {
        router.push(`/workspace/agents/chats/chatsetting/playground/?chatId=${key?.agent?.id}`)
    };
    return (
        <div key={key?.agent?.id} className={`cursor-pointer text-[#737791] relative min-w-[10vw] max-w-[10vw] overflow-hidden min-h-[10vw] max-h-[10vw] border-[0.052vw] border-black rounded-[1.5vw] hover:shadow-2xl ${theme === "dark" ? 'text-[#9f9f9f]' : ' text-black'}`} onClick={replaceHandler}>
            <div className='h-[85%] w-full pl-[2vw] pr-[4vw] pt-[2vh] overflow-hidden'>
                <h3 className=' mb-[1vw] font-bold text-[1.2vw] text-[#737791]'>{key?.agent?.bot_name}</h3>
                <span className='text[.5vw] font-normal'>
                    {key?.agent?.description}
                </span>
                <p className='text-[.7vw] font-normal mt-[4vw] text-[#6d6e78]'>{key?.agent?.id}</p>
            </div>
        </div>
    )
}

export default AgentList