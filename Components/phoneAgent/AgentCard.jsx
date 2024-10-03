import { useRouter } from 'next/navigation';
import React from 'react';

const AgentList = ({ key, agent }) => {
    const router = useRouter();
    console.log(agent)
    const replaceHandler = () => {
        router.push(`/workspace/agents/phone/phonesetting/playground/?chatId=${key?.agent?.id}`);
    };

    return (
        <div key={agent?.id} className='hover:shadow-2xl bg-[#FFFFFF] text-[#737791] relative cursor-pointer min-w-[10vw] max-w-[10vw] overflow-hidden min-h-[10vw] max-h-[10vw] border-[0.052vw] border-black rounded-[1.5vw]'
        onClick={replaceHandler}
        >
            <div className='h-[85%] w-full pl-[1vw] pr-[4vw] pt-[6vh] overflow-hidden'>
                <h3 className='mb-[1vw] font-bold H2 text-[#737791]'>{agent?.company_name}</h3>
                <span className='Hsm font-normal'>{agent?.conversation_purpose}</span>
            </div>
        </div>
    );
};

export default AgentList;
