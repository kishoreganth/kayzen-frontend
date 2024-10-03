import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GradientButton from '../buttons/GradientButton';
import { updateProfile } from '../../store/reducers/profileSlice';
import useTheme from "next-theme";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, setTheme } = useTheme();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const saveHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setIsEditing(false);
    console.log('Settings saved', formData);
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  return (
    <div className={` Hmd p-[1.3vw] rounded-[0.417vw] shadow-md h-[55vh] w-[35vw] relative ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}>
      <form className={`flex flex-col justify-evenly items-start px-[2vw] gap-[1.5vw] ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}>
        <div className='flex w-full justify-between'>
          <h1 className='text-[2vw] font-bold'>Profile Settings</h1>
          <div className="mt-[1.5vh] text-white px-[2.3vw] py-[0.8vh] rounded-[0.417vw]">
            <div className={`gap-[.6vw] font-['Poppins'] flex justify-center items-center cursor-pointer rounded-lg px-[1.2vw] py-[.3vw] ${theme==="dark" ? 'bg-[#1A1C22] text-white' : 'bg-zinc-300 text-black'} ${isEditing ?'hidden':'flex'}`} onClick={editHandler}>
              {/* <lord-icon
               src="https://cdn.lordicon.com/wuvorxbv.json"
               trigger="hover"
               style={{width:'1.2vw',height:'1.2vw'}}
               
               className="hidden"
              >
              </lord-icon> */}
              <span className={`Hmd text-gray `}>Edit</span>
            </div>
          </div>
        </div>
        <div className="mb-[1.6vh]">
          <label htmlFor="displayName" className="block text-[1.042vw] text-gray-700 font-semibold mb-[.8vh]">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={changeHandler}
            disabled={!isEditing}
            className={`w-full text-zinc-400 pl-[1.7vw] pr-[3.5vw] py-[0.8vh]  ${isEditing ? 'border-[1.5px]' : 'border-0' } rounded-[0.417vw] focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}
          />
        </div>
        <div className="mb-[1.6vh]">
          <label htmlFor="email" className="block text-gray-700 text-[1.042vw] font-semibold mb-[.8vh]">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            disabled={!isEditing}
            className={`w-full text-zinc-400 pl-[1.6vw] pr-[3.5vw] py-[0.8vh]  ${isEditing ? 'border-[1.5px]' : 'border-0' } rounded-[0.417vw] focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}
          />
        </div>
        <div className="mb-[1.6vh]">
          <label htmlFor="phoneNumber" className="block text-[1.042vw] font-semibold text-gray-700  mb-[.8vh]">Phone Number</label>
          <div className="flex">
            <select
              name="countryCode"
              id="countryCode"
              value={formData.countryCode}
              onChange={changeHandler}
              disabled={!isEditing}
              className={` ${isEditing ? 'border-[1.5px]' : 'border-0' } rounded-l-[.4vw] px-[0.833vw] py-[0.8vh] ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}
            >
              <option className={`${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`} value="+91">+91</option>
              <option className={`${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`} value='+92'>+92</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={changeHandler}
              disabled={!isEditing}
              className={`w-full pl-[.7vw] text-zinc-400 py-[0.8vh] ${isEditing ? 'border-[1.5px]' : 'border-0' }  rounded-r-[.4vw] focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}
            />
          </div>
        </div>
        {isEditing && (
          <GradientButton
            text="Save"
            onClick={saveHandler}
            className="contentButton bg-gradient-to-r from-[#EB1CD6] to-[#F4A36F] text-white px-[2.3vw] text-center translate-x-[12vh]"
          />
        ) }
      </form>
    </div>
  );
};

export default PersonalDetails;
