import useTheme from 'next-theme'
import React from 'react'

const Skeleton = () => {
    const { theme } = useTheme()

  return (
    <div className={`w-[10vw] overflow-hidden h-[10vw] rounded-[1.5vw] skeleton ${theme === "dark" ? 'skeleton-dark before:opacity-[0.2]' : 'skeleton-light before:opacity-[0.25]'}`}>
        <div className='h-[85%] w-full pl-[1vw] pr-[4vw] pt-[6vh] overflow-hidden'>
            <div className={`${theme === "dark" ? 'skeleton-dark' : 'skeleton-light before:opacity-[0.7]'} mb-[1vw] skeleton w-full h-[2vh]`}/>
            <div className={`${theme === "dark" ? 'skeleton-dark' : 'skeleton-light before:opacity-[0.7]'} skeleton w-full h-[2vh]`}/>
        </div>
        <div className='flex h-[15%] items-center'>
            <div className='flex flex-1 justify-center px-[1vw] py-[1.1vh] cursor-pointer h-full'>
                <div className={`${theme === "dark" ? 'skeleton-dark' : 'skeleton-light before:opacity-[0.7]'} mt-[.5vh] cursor-pointer skeleton w-full`}/>
            </div>
            <div className='flex flex-1 justify-center px-[1vw] py-[1.1vh] cursor-pointer h-full' >
                <div className={`${theme === "dark" ? 'skeleton-dark' : 'skeleton-light before:opacity-[0.7]'} mt-[.5vh] cursor-pointer skeleton w-full`}/>
            </div>
        </div>
    </div>
  )
}

export default Skeleton