"use client"
import React, { useState, useEffect } from 'react';
import GradientButton from './buttons/GradientButton';
import GradientButton2 from './buttons/GradientButton2';
import Link from 'next/link';
import PieIcon from './Icons/LordIcon';
import MessageIcon from './Icons/MessageIcon';
import PhoneIcon from './Icons/PhoneIcon';
import EmailIcon from './Icons/EmailIcon';
import SettingIcon from './Icons/SettingIcon';
import TeamIcon from './Icons/TeamIcon';
import { useSelector } from 'react-redux';
import useTheme from 'next-theme';
import { motion } from "framer-motion"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoMoonOutline, IoSunny } from 'react-icons/io5';
import { getCookie,deleteCookie } from 'cookies-next';


const variants = {
  open: { opacity: 1, width: '15vw' },
  closed: { opacity: 1, width: '6vw' }
}

const textVariants = {
  open: { opacity: 1, display: 'block' },
  closed: { opacity: 0, display: 'none' }
}

const Sidebar = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [activeButton, setActiveButton] = useState('dashboard');
  const { profilePicture, displayName } = useSelector((state) => state.profile)
  const { theme, setTheme } = useTheme();
  const [isOpen, setisOpen] = useState(true)
  const url=process.env.url;
  useEffect(() => {
    import('@lordicon/element').then(({ defineElement }) => {
      import('lottie-web').then((lottie) => {
        defineElement(lottie.loadAnimation);
      });
    });
  }, []);

  //sidebar collapse on chatsettings
  useEffect(() => {
    isSidebarCollapsed === true ? setisOpen(false) : setisOpen(true)
    console.log(isSidebarCollapsed);
  }, [isSidebarCollapsed])
  
  const handleButtonClick = async (index, button) => {
    if(button.text==='logout'){
      const session_id=getCookie("session_id")
      // const refresh_token=getCookie("refresh_token")
      const reqData=JSON.stringify({'session_id':session_id})
      console.log(reqData,JSON.parse(reqData).session_id);
      const response = await fetch(`${url}/auth/signout`,
        {
          mode:'cors',
          method:'POST',
          body:reqData,
          headers: new Headers({
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": 'true',
          }),
        }
      );
      const data = await response.text();
      if(data){
        localStorage.removeItem(`phoneList_${session_id}`);
        localStorage.removeItem(`agentList_${session_id}`)
        deleteCookie('session_id')
      }
    }
    setActiveButton(button.text);
  };


  const navButtons = [
    { Icon: PieIcon, text: 'dashboard', path: '/',className: 'Pie first', color: 'primary', },
    { Icon: MessageIcon, text: 'workspace', path: '/workspace', className: 'Message second', color: 'primary' },
    //{ Icon: MessageIcon, text: 'chat agent', path: '/chats', className: 'Message second', color: 'primary' },
    //{ Icon: PhoneIcon, text: 'phone agent', path: '/phone', className: 'Phone third', color: 'primary' },
    { Icon: EmailIcon, text: 'email', path: '/email', className: 'Email fourth', color: 'primary' },
    { Icon: TeamIcon, text: 'team', path: '/team', className: 'Team fifth', color: 'primary' },
    { Icon: SettingIcon, text: 'settings', path: '/settings', padding: 'pr-[5vw]', className: 'Setting sixth', color: 'primary' },
    { Icon: FiLogOut, text: 'logout', path: '/register', padding: 'pr-[5vw] py-[.6vw]', className: 'Logout eighth', color: 'primary' },
    { Icon: profilePicture, text: displayName, path: '/profile', padding: 'pr-[vw]', className: 'Profile ' },

  ];

   const profileButton = navButtons.find(button => button.text === displayName)
   
  return (
    <motion.div animate={isOpen ? 'open' : 'closed'} variants={variants}
      className={`w-[15vw] relative overflow-hidden h-screen flex flex-col items-center border-r-[.1vw] border-zinc-300 shadow-xl ${theme === 'dark' ? 'bg-[#1A1C22] text-[#737791]' : 'bg-white text-[#737791]'}`}>
      <div className={`flex items-center justify-center gap-[.6vw] h-[7.5vh] pb-[2vh] w-full ${isOpen ? 'flex mt-[.5vw] pr-[.5vw]' : 'flex-col mt-[2vw] gap-[1vw] mb-[2vw] -pr-[.8vw]'} `}>
        <div className={`uppercase   text-center justify-self-center H5 font-bold flex justify-center items-center w-[10vw] h-fit ${isOpen ? ' ml-[0vw] ' : '-ml-[3.5vw mt-[1vw '}`}>
          <img src="/images/logo.svg" alt="Logo" className='w-[4vw] h-[6vh]' />
          {isOpen && <h1 className='H5 mt-[.5vh] text-center text-[#8B008B] '>Kayzen</h1>}
        </div>

        <div className={`w-[2.2vw] relative h-[4vh] mt-[.5vh]  bg-zinc-200 px-[0.2vw] py-[0.5vw] rounded-[.7vw] flex justify-center items-center cursor-pointer`} onClick={() => setisOpen(isOpen => !isOpen)}>
          {isOpen ? <FaAngleDoubleLeft size='1.1vw' color='#737791' /> : <FaAngleDoubleRight size="1.1vw" />}
        </div>


      </div>

      <div className='flex flex-col items-center h-full relative border-t pt-[2vh] border-zinc-300  '>
        <div className='w-full h-1/2 flex flex-col items-center gap-[.6vw] relative'>
          {navButtons.slice(0, 4).map((button, index) => (
            <Link href={button.path} className='w-full flex justify-center' key={index}>
              <GradientButton
                Icon={button.Icon}
                text={button.text}
                isActive={activeButton === button.text}
                onClick={() => handleButtonClick(index, button)}
                className={`w-full ${button.padding}
                ${activeButton === button.text ? '' : button.color}
                ${button.width}
                ${activeButton === button.text ? `${button.className}` : ``}
                ${isOpen ? 'inline-block' : 'hidden'} `}
              />
              <div>
                <GradientButton
                  Icon={button.Icon}
                  isActive={activeButton === button.text}
                  onClick={() => handleButtonClick(index, button)}
                  className={`${activeButton === button.text ? '' : button.color}
                  ${activeButton === button.text ? `${button.className}` : ``}
                  ${isOpen ? 'hidden' : 'inline-block'} `}>
                    <button.Icon className={`flex flex-col ${isOpen ? 'inline-block' : 'hidden'}`} />
                </GradientButton>
              </div>
              <motion.span
                animate={isOpen ? 'open' : 'closed'}
                variants={textVariants}
                transition={{duration: .6, ease: 'easeInOut'}}
                className={` ${isOpen ? 'inline-block' : 'hidden'}`}>
              </motion.span>
            </Link>
          ))}
        </div>
        <div className='w-full pt-[1vh] flex flex-col items-center justify-end gap-[.5vw] mt-auto bg-red- border-t border-zinc-300'>
          {navButtons.slice(4, 6).map((button, index) => (
            <Link href={button.path} className='w-fit' key={index}>
              <GradientButton
                Icon={button.Icon}
                text={button.text}
                isActive={activeButton === button.text}
                onClick={() => handleButtonClick(index, button)}
                className={` w-full ${button.padding}
                ${activeButton === button.text ? '' : button.color}
                ${activeButton === button.text ? `${button.className}` : ``}
                ${button.text === 'logout' ? 'H3' : ''}
                ${isOpen ? 'inline-block' : 'hidden'} Hmd`}
              />
              <div>
                <GradientButton
                  Icon={button.Icon}
                  isActive={activeButton === button.text}
                  onClick={() => handleButtonClick(index, button)}
                  className={ `${isOpen ? 'hidden' : 'inline-block'}
                    ${activeButton === button.text ? '' : button.color}
                    ${button.text === 'logout' ? 'H3' : ''}
                    ${activeButton === button.text ? `${button.className}` : ``}`}>
                  <button.Icon className={` w-full mr-2 flex flex-col ${isOpen ? 'inline-block' : 'hidden'}`} />
                </GradientButton>
              </div>
              <motion.span
                animate={isOpen ? 'open' : 'closed'}
                variants={textVariants}
                className={` ${isOpen ? 'inline-block' : 'hidden'} w-full Hmd`}>
              </motion.span>
            </Link>
          ))}
        </div>

        <div className='w-full h-[15vh] flex flex-col items-center  gap-[.5vw] py-[1vw] bg-red- border-t border-zinc-300'>
          <Link href={profileButton.path} className='w-[fit]' >
            <GradientButton
              Icon={profileButton.Icon}
              text={profileButton.text}
              isActive={activeButton === profileButton.text}
              onClick={() => handleProfileClick(profileButton)}
              className={`${profileButton.padding}
              ${activeButton === profileButton.text ? '' : profileButton.color}
              ${activeButton === profileButton.text ? `${profileButton.className}` : ``}
              ${isOpen ? 'inline-block' : 'hidden'} Hmd w-[12vw]`}
            />
            <div>
              <GradientButton
                Icon={profileButton.Icon}
                isActive={activeButton === profileButton.text}
                onClick={() => handleProfileClick(profileButton)}
                className={` w-full ${isOpen ? 'hidden' : 'inline-block'}
                ${activeButton === profileButton.text ? '' : profileButton.color}
                ${activeButton === profileButton.text ? `${profileButton.className}` : ``}`}>
                {/* <profileButton.Icon className={`mr-2 flex flex-col ${isOpen ? 'inline-block' : 'hidden'}`} /> */}
              </GradientButton>
            </div>
            <motion.span
              animate={isOpen ? 'open' : 'closed'}
              variants={textVariants}
              className={`w-full ${isOpen ? 'inline-block' : 'hidden'}`}>
            </motion.span>
          </Link>

          <div className={`sidebar flex justify-center items-center  bg-zinc-100 h-[4.5vh] rounded-[0.417vw] relative ${isOpen ? 'w-[11vw] h-[2vw]' : 'w-[4vw]'}`}>
            {isOpen ? (
              <>
                <GradientButton2
                  Icon={IoMoonOutline}
                  text="dark"
                  className={` toggle-mode w-[5.3vw] h-[90%]  Hmd sidebar-button rounded-[0.417vw]  ${theme === 'dark' ? 'dark' : ''}`}
                  onClick={()=>setTheme('dark')}
                />
                <GradientButton2
                  Icon={IoSunny}
                  text="light"
                  className={`w -full toggle-mode w-[5.3vw] h-[90%] Hmd sidebar-button rounded-[0.417vw]  ${!theme === 'dark' ? 'light' : ''}`}
                  onClick={()=>setTheme('light')}
                />
              </>
            ) : (
              <GradientButton2
                Icon={theme === 'dark' ? IoMoonOutline : IoSunny}
                text={isOpen ? (theme === 'dark' ? 'dark' : 'light') : ''}
                className={` toggle-mode primary w-[5.3vw]  sidebar-button rounded-[0.417vw] py-[.46vw] px-[.3vw] ${isOpen ? 'Hmd' : 'flex justify-center items-center w-[5vw] Hmd'} `}
                onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
              />
            )}
          </div>
        </div>

      </div>




    </motion.div>
  );
};

export default Sidebar;

