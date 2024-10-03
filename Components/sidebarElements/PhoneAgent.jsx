"use client"
import React, { useEffect, useRef, useState } from 'react'
import GradientButton from '../buttons/GradientButton'
import { useDispatch, useSelector } from 'react-redux'
import { setphoneAgentName, setphoneAgentPurpose, setcompanyName, setcompanyBusiness, setcompanyServices, setPrompt } from '../../store/reducers/phoneAgentSlice'
import { useRouter } from 'next/navigation'
import useTheme from "next-theme";
import TickIcon from '../Icons/TickIcon'
import { TiArrowSortedDown } from "react-icons/ti";

const InputField = ({ label, description, value, onChange, placeholder, isTextarea = false, height, append, width }) => (
  <div className={`w-full mt-0 flex relative left-[13vw] items-start gap-[6vw] mb-[1vw] ${height} ${append}`}>
    <div className={`w-[15vw] ${append}`}>
      <h1 className={`capitalize text-[1vw] mb-[.8vh] ${append}`}>{label}</h1>
      <i><h6 className='capitalize text-[.725vw] text-zinc-400'>{description}</h6></i>
    </div>
    {isTextarea ? (
      <textarea
        onChange={onChange}
        value={value}
        className={`text-[.95vw] mt-0 box-border border-[0.052vw] overflow-hidden border-zinc-300 px-[1vw] w-[${width}vw] pt-[1vw] pb-[3vw] resize-y rounded-[0.417vw] ${append}`}
        placeholder={placeholder}
      />
    ) : (
      <input
        onChange={onChange}
        value={value}
        type="text"
        className={`text-[.95vw] mt-0 border-[0.052vw] border-zinc-300 px-[1vw] ${height} w-[${width}vw] py-[.7vw] rounded-[0.417vw] ${append}`}
        placeholder={placeholder}
      />
    )}
  </div>
)

const PhoneAgent = () => {
  const dispatch = useDispatch()
  const { theme, setTheme } = useTheme()
  const { phoneAgentName, phoneAgentPurpose, companyName, companyBusiness, companyServices, prompt } = useSelector((state) => state.phoneAgent)
  const router = useRouter();
  const promptRef = useRef();
  const [err, setErr] = useState('');
  const [progress, setprogress] = useState(false)
  const [openAccordion01, setOpenAccordion01] = useState(true)
  const [openAccordion02, setOpenAccordion02] = useState(false)
  const [openAccordion03, setOpenAccordion03] = useState(false)
  const [promptText, setPromptText] = useState('')
  const [promptHeight, setPromptHeight] = useState(200)
  const [phoneAgentPurposeText, setPhoneAgentPurposeText] = useState('')
  const [phoneAgentPurposeHeight, setPhoneAgentPurposeHeight] = useState(240)
  const [companyBusinessHeight, setCompanyBusinessHeight] = useState(100)
  const [companyServiceHeight, setCompanyServiceHeight] = useState(100)

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const promptHandler = (e) => {
    const text = e.target.value;
    setPromptText(text);
    //dispatch(setPrompt(text));  // Update Redux store on change
    if (e.target.tagName === 'TEXTAREA') {
        autoResizeTextarea(e.target); 
        setPromptHeight(e.target.scrollHeight + 70);
    }
  };
  const phoneAgentPurposeHandler = (e) => {
    const text = e.target.value;
    setPhoneAgentPurposeText(text);
    dispatch(setphoneAgentPurpose(text));  // Update Redux store on change
    if (e.target.tagName === 'TEXTAREA') {
        autoResizeTextarea(e.target);
        setPhoneAgentPurposeHeight(e.target.scrollHeight + 130);
    }
  };

  const companyBusinessHandler = (e) => {
    const text = e.target.value;
    dispatch(setcompanyBusiness(text))  // Update Redux store on change
    if (e.target.tagName === 'TEXTAREA') {
        autoResizeTextarea(e.target);
        setCompanyBusinessHeight(e.target.scrollHeight);
    }
  };

  const companyServiceHandler = (e) => {
    const text = e.target.value;
    dispatch(setcompanyServices(text))  // Update Redux store on change
    if (e.target.tagName === 'TEXTAREA') {
        autoResizeTextarea(e.target);
        setCompanyServiceHeight(e.target.scrollHeight);
    }
  };

  const accordion1Handler = () => {
    setOpenAccordion01(!openAccordion01)
    setOpenAccordion02(false)
    setOpenAccordion03(false)
  }
  const accordion2Handler = () => {
    setOpenAccordion02(!openAccordion02)
    setOpenAccordion01(false)
    setOpenAccordion03(false)
  }
  const accordion3Handler = () => {
    setOpenAccordion03(!openAccordion03)
    setOpenAccordion01(false)
    setOpenAccordion02(false)
  }

  const prevHandler = () => {
    router.push('/workspace/agents')
  }

  const nextHandler = () => {
    if (phoneAgentName === '' || phoneAgentPurpose === '' || companyName === '') {
      setErr("Enter the data")
      setprogress(false)
    }
    else {
      router.push('/workspace/agents/phone/toolcreation')
      setprogress(true)
    }
  }
  
  return (
    <div className={`flex text-[.9vw] w-full h-screen relative ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-[#F2F4F7] text-black'}`}>
      <div className='flex flex-col w-full'>
        <div className={`w-full relative top-0 left-[50%] translate-x-[-50%] border-b-[.1vw] border-zinc-300 p-[1.5vw] h-[6vh] flex justify-center items-center ${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}>
          <div className='w-[75%] h-full flex items-center justify-center gap-[1vw]'>
            <div className='h-full flex items-center justify-start gap-[.5vw]'>
              <div className='circle text-blue-400  w-[2vw] h-[2vw] border-cyan-500 border-[.2vw] rounded-full flex justify-center items-center'>
                {progress ? <TickIcon /> : 1}
              </div>
              <h2 className='capitalize font-medium text-[.9vw]'>phonebot creation</h2>
            </div>

            <div className='h-[1px] w-[3vw] bg-zinc-300 '></div>

            <div className='h-full flex items-center justify-start gap-[.5vw] opacity-[.4]'>
              <div className='circle text-blue-400  w-[2vw] h-[2vw] rounded-full border-cyan-500 border-[.2vw] flex justify-center items-center'>
                2
              </div>
              <h2 className='capitalize font-medium text-[.9vw]'>tool creation</h2>
            </div>
              
              <div className='h-[1px] w-[3vw] bg-zinc-300 '></div>

            <div className='h-full flex items-center justify-start gap-[.5vw] opacity-[.4]'>
              <div className='circle text-blue-400 w-[2vw] h-[2vw] rounded-full border-cyan-500 border-[.2vw] flex justify-center items-center'>
                3
              </div>
              <h2 className='capitalize font-medium text-[.9vw]'>voice setting</h2>
            </div>
              
            <div className='h-[1px] w-[3vw] bg-zinc-300 '></div>
              
            <div className='h-full flex items-center justify-start gap-[.5vw] opacity-[.4]'>
              <div className='circle text-blue-400 w-[2vw] h-[2vw] rounded-full border-cyan-500 border-[.2vw] flex justify-center items-center'>
                4
              </div>
              <h2 className='capitalize font-medium text-[.9vw]'>deployment</h2>
            </div>
          </div>
        </div>

        <h1 className='text-[1.3vw] font-semibold py-[.5vw] px-[3vw]'>Phone Agent</h1>

        <div className='flex w-full h-[77vh] pb-[3vw] justify-center items-start overflow-y-scroll'>
          <div className='flex flex-col w-full items-center justify-start gap-[2vw]'>
            <div className={`overflow-hidden w-[75vw] rounded-[0.625vw] transition-all duration-500 relative ${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}>
              <div className='top h-fit w-full flex flex-col transition-all duration-1000'>
                <div className={`${openAccordion01 && theme === "dark" ? 'bg-[#1F222A]' : openAccordion01 && 'bg-[#F2F4F7]'} transition-all duration-1000 flex justify-between items-center py-[1vw] px-[2vw]`}>
                  <h1 className='text-[1.1vw] capitalize'>Agent Settings</h1>
                  <div className='p-[.3vw] flex items-center gap-[1vw]' onClick={accordion1Handler}>
                    {(!openAccordion01 && err && phoneAgentName === '') || (!openAccordion01 && err && phoneAgentPurpose === '') ? (
                      <span className="text-red-900 capitalize Hsm font-medium transition-all duration-700">*Data Required</span>
                    ) : (
                      <></>
                    )}
                    <TiArrowSortedDown className={`${theme === "dark" ? 'text-white' : 'text-black'} ${openAccordion01 ? '-rotate-180' : ''} transition-all duration-700 text-[2vw] cursor-pointer`} />
                  </div>
                </div>

                <div 
                  className={`relative w-full px-[2vw] overflow-hidden transition-all duration-1000 ${!openAccordion01 ? 'pointer-events-none h-[0vw]' : 'h-[30vh]'}`}
                  style={{height: `${openAccordion01 ? `${phoneAgentPurposeHeight}px` : '0'}`}}
                >
                  <div className={`absolute w-full flex flex-col transition-all duration-1000 ${openAccordion01 ? 'pb-[2vw] top-[1vw]' : 'top-[-20vw]'}`}>
                    <div className='flex flex-col mb-[1vw]'>
                      {err && phoneAgentName === '' && (
                        <span className="text-red-900 capitalize Hsm font-medium ml-[46%] ">
                            *Enter the data
                        </span>)}
                      <InputField
                        label='Phone Agent Name*'
                        height='h-1/4'
                        width={35}
                        description='Name of your phone agent to be called'
                        value={phoneAgentName}
                        onChange={(e) => dispatch(setphoneAgentName(e.target.value))}
                        placeholder='Phone Agent Name'
                        append={`${theme === "dark" ? 'bg-[#1A1C21] text-white text-semibold' : 'text-semibold bg-white text-black'}`}
                      />
                    </div>
                    <div className='flex flex-col'>
                      {err && phoneAgentPurpose === '' && (
                        <span className="text-red-900 capitalize Hsm font-medium ml-[46%] ">
                            *Enter the data
                        </span>)}
                      <InputField
                        label='Phone Agent Purpose*'
                        description="Agent's goal to achieve"
                        style={{ height: '15vh' }}
                        width={35}
                        value={phoneAgentPurposeText}
                        isTextarea
                        onChange={phoneAgentPurposeHandler}
                        placeholder='Phone Agent Purpose'
                        append={`${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`overflow-hidden w-[75vw] rounded-[0.625vw] transition-all duration-500  relative ${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}>
              <div className=' h-fit w-full'>
                <div className={`${openAccordion02 && theme === "dark" ? 'bg-[#1F222A]' : openAccordion02 && 'bg-[#F2F4F7]'} transition-all duration-1000 flex items-center justify-between py-[1vw] px-[2vw]`}>
                  <h1 className='text-[1.25vw] capitalize'>Agent Business Settings</h1>
                  <div className='p-[.3vw] flex items-center gap-[1vw]' onClick={accordion2Handler}>
                    {(!openAccordion02 && err && companyName === '') ? (
                      <span className="text-red-900 capitalize Hsm font-medium transition-all duration-700">*Data Required</span>
                    ) : (
                      <></>
                    )}
                    <TiArrowSortedDown className={`${theme === "dark" ? 'text-white' : 'text-black'} ${openAccordion02 ? '-rotate-180' : ''} transition-all duration-700 text-[2vw] cursor-pointer`} />
                  </div>
                </div>
                <div 
                  className={`relative w-full px-[2vw] overflow-hidden transition-all duration-1000 ${!openAccordion02 ? 'pointer-events-none h-[0vw]' : ''}`}
                  style={{height: `${openAccordion02 ? `${companyBusinessHeight + companyServiceHeight + 150}px` : '0'}`}}
                >
                  <div className={`absolute w-full flex flex-col transition-all duration-1000 ${openAccordion02 ? 'pb-[2vw] top-[1vw]' : 'top-[-20vw]'}`}>
                    <div className='flex flex-col'>
                      {err && companyName === '' && (
                        <span className="text-red-900 capitalize Hsm font-medium ml-[46%] ">
                            *Enter the data
                        </span>)}
                      <InputField
                        label="Company's Name*"
                        description='Brand or company or name which agent represents'
                        height='h-1/4'
                        width={35}
                        value={companyName}
                        onChange={(e) => dispatch(setcompanyName(e.target.value))}
                        placeholder="Company's Name"
                        append={`${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}
                      />
                    </div>
                    <InputField
                      label="Company's Business"
                      description="Brand\'s business, enter the details of business this agent will operate"
                      height='min-h-1/4'
                      value={companyBusiness}
                      onChange={companyBusinessHandler}
                      placeholder="Company's Business"
                      width={35}
                      isTextarea
                      append={`${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}
                    />
                    <InputField
                      label="Company's Product Services"
                      description='Enter your services, offers or solutions or products this brand provides that this phone agent can accomplish selling or generating clients.'
                      value={companyServices}
                      height='min-h-1/3'
                      width={35}
                      onChange={companyServiceHandler}
                      placeholder="Company's Services"
                      isTextarea
                      append={`${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`overflow-hidden w-[75vw] rounded-[0.625vw] transition-all duration-500 relative ${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}>
              <div className='top h-fit w-full flex flex-col transition-all duration-1000'>
                <div className={`${openAccordion03 && theme === "dark" ? 'bg-[#1F222A]' : openAccordion03 && 'bg-[#F2F4F7]'} transition-all duration-1000 flex justify-between items-center py-[1vw] px-[2vw]`}>
                  <h1 className='text-[1.25vw] capitalize'>Prompt</h1>
                  <div className='p-[.3vw]' onClick={accordion3Handler}>
                    <TiArrowSortedDown className={`${theme === "dark" ? 'text-white' : 'text-black'} ${openAccordion03 ? '-rotate-180' : ''} transition-all duration-700 text-[2vw] cursor-pointer`} />
                  </div>
                </div>
                <div
                  className={`relative w-full px-[2vw] overflow-hidden transition-all duration-1000 ${!openAccordion03 ? 'pointer-events-none h-[0vw]' : 'h-[30vh]'}`}
                  style={{height: `${openAccordion03 ? `${promptHeight}px` : '0'}`}}
                >
                  <div className={`absolute w-full flex flex-col transition-all duration-1000  ${openAccordion03 ? 'pb-[2vw] top-[1vw]' : 'top-[-20vw]'}`}>
                    <div className='flex flex-col'>
                      {/*err && prompt === '' && (
                        <span className="text-red-900 capitalize Hsm font-medium ml-[46%] ">
                            *Enter the data
                        </span>)*/}
                      <InputField
                        label='Prompt'
                        width={35}
                        description='Give some prompt'
                        value={promptText}
                        onChange={promptHandler}
                        isTextarea
                        style={{ height: '15vh' }}
                        placeholder='Prompt'
                        append={`${theme === "dark" ? 'bg-[#1A1C21] text-white text-semibold' : 'text-semibold bg-white text-black'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-full absolute bottom-0 h-[6.5vh] ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}>
          <div className='w-full h-full flex justify-end items-center gap-[2vw] px-[3vw] '>
            <GradientButton
              text='cancel'
              onClick={prevHandler}
            />
            <GradientButton
              text='continue'
              onClick={nextHandler}
              className='bg-[#702963] hover:bg-[#702963] hover:bg-opacity-[0.85] text-white py-[.3vw] '
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneAgent
