"use client"
import React, { useRef } from 'react';

const PieIcon = ({isActive,className}) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/pqirzoux.json"
      trigger="hover"
      colors={`primary:${!isActive ? '#737791' : '#f8fafc'}`}
      target={`.${className}`}
      style={{ width: '1.5vw', height: '3vh',}}
    />
  );
};

export default PieIcon;
// `${className}`