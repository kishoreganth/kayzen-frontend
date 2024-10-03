"use client"
import React from 'react';

const GradientButton2 = ({ Icon, text, isActive, onClick, className }) => {
  return (
    <button 
      type='button'
      className={` capitalize flex items-center gap-[.7vw] px-[0.933vw] text-[.9vw] text-start cursor-pointer  font-light rounded-[0.417vw] ${className} ${
        isActive
          ? 'w-fit bg-[#FAA0A0] text-white'
          : 'hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {text}
      {Icon && <Icon className='cursor-pointer' />}
    </button>
  );
};

export default GradientButton2;
