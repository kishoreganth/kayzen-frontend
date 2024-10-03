"use client"

import React, { useState } from 'react';
import { setmeetingSchedular, setsenderMail, setpriceInquiry, settwilioauthtoken, settwiliosid, settwilionumber  } from '../../store/reducers/phoneAgentSlice';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from "next-theme";
import { useRouter } from 'next/navigation';
import GradientButton from '../buttons/GradientButton';
import TickIcon from '../Icons/TickIcon';
import { TiArrowSortedDown } from "react-icons/ti";
import ActionForm from './ActionForm';
import { removeAction, upsertAction  } from '@/store/reducers/phoneAgentSlice'; 
import DeleteIcon from '../Icons/DeleteIcon';
import SettingIcon from '../Icons/SettingIcon';
import { v4 as uuidv4 } from 'uuid';


const ToolCreation = () => {
  const dispatch = useDispatch();
  const { meetingSchedular, senderMail, priceInquiry, twilioauthtoken, twiliosid, twilionumber } = useSelector((state) => state.phoneAgent);
  const navigate = useRouter();
  const { theme, setTheme } = useTheme()
  //const [progress, setprogress] = useState(false)
  //const [openAccordion01, setOpenAccordion01] = useState(true)
  //const [openAccordion02, setOpenAccordion02] = useState(false)

  const [showForm, setShowForm] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  
  // Retrieve created actions from the Redux store
  const createdActions = useSelector((state) => state.phoneAgent.createdActions);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      // If form is closing, reset selected action
      setSelectedAction(null);
    }
  };

  const handleDelete = (actionId) => {
    console.log("Attempting to delete action with ID:", actionId);
    dispatch(removeAction(actionId)); 
  };

  const handleCreateAction = (newAction) => {
    const actionWithId = { ...newAction, id: uuidv4() }; // Generate a unique ID
    console.log(actionWithId.id);
    dispatch(upsertAction(actionWithId));
  };

  const handleEditAction = (action) => {
    setSelectedAction(action); // Set the selected action for editing
    setShowForm(true); // Show the form for editing
  };

  const nextHandler = () => {
    navigate.push('/workspace/agents/phone/voicesetting')
    setprogress(true)
  }

  return (
    <div className={`w-full Hmd h-screen relative flex justify-between ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-[#F2F4F7] text-black'}`}>
      <div className='h-full w-full flex flex-col justify-center items-center  '>
        <div className={`w-full absolute top-0 left-[50%] translate-x-[-50%] border-b-[.1vw] border-zinc-300 p-[1.5vw] h-[6vh] flex justify-center items-center ${theme === "dark" ? 'bg-[#1A1C21] text-white' : 'bg-white text-black'}`}>
          <div className='w-[75%] h-full flex items-center justify-center gap-[1vw]'>
            <div className='h-full flex items-center justify-start gap-[.5vw]'>
              <div className='circle bg-green-600  w-[2vw] h-[2vw] rounded-full flex justify-center items-center'>
                <TickIcon/>
              </div>
              <h2 className='capitalize font-medium Hmd'>phonebot creation</h2>
            </div>
              
            <div className='h-[1px] w-[3vw] bg-zinc-300 '></div>

            <div className='h-full flex items-center justify-start gap-[.5vw]'>
              <div className='circle text-blue-400  w-[2vw] h-[2vw] rounded-full border-cyan-500 border-[.2vw] flex justify-center items-center'>
                2
              </div>
              <h2 className='capitalize font-medium Hmd'>tool creation</h2>
            </div>
            
            <div className='h-[1px] w-[3vw] bg-zinc-300 '></div>

            <div className='h-full flex items-center justify-start gap-[.5vw] opacity-[.4]'>
              <div className='circle text-blue-400 w-[2vw] h-[2vw] rounded-full border-cyan-500 border-[.2vw] flex justify-center items-center'>
                3
              </div>
              <h2 className='capitalize font-medium Hmd'>voice setting</h2>
            </div>
            
            <div className='h-[1px] w-[3vw] bg-zinc-300 '></div>

            <div className='h-full flex items-center justify-start gap-[.5vw] opacity-[.4]'>
              <div className='circle text-blue-400 w-[2vw] h-[2vw] rounded-full border-cyan-500 border-[.2vw] flex justify-center items-center'>
                4
              </div>
              <h2 className='capitalize font-medium Hmd'>deployment</h2>
            </div>
          </div>
        </div>
        
        <h1 className='absolute H5 capitalize font-semibold top-[10vh] left-[4.167vw] z-[8] '>phone agent</h1>

        <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Actions</h1>
        <p className="mb-4 text-center">
          Instruct your agent to perform different actions during calls.
        </p>
        <p className="mb-6 text-center">
          Welcome to your actions page, looks like you have no actions.
          Click the button below to create one.
        </p>

        {/* Render Created Actions */}
        <div className="mt-6 w-[40vw]">
          {createdActions?.length === 0 ? (
            <p className='text-center mb-4'>No actions created yet.</p>
          ) : (
            createdActions?.map((action) => (
              <div key={action.id} className="border rounded-md p-4 mb-4 bg-gray-100 flex justify-between items-center">
                <p>Action Type: {action.type}</p>
                <div className='flex'>
                  <button 
                    onClick={() => handleEditAction(action)} 
                    className="ml-4 flex items-center gap-[.5vw] border border-zinc-300 border-dashed text-sm text-black px-[1vw] py-[.3vw] rounded capitalize"
                  >
                    settings <SettingIcon />
                  </button>
                  <button 
                    onClick={() => handleDelete(action.id)} 
                    className="ml-4 border flex items-center gap-[.5vw] border-zinc-300 border-dashed text-sm text-black px-[1vw] py-[.3vw] rounded capitalize"
                  >
                    Delete <DeleteIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={toggleForm}
          className="bg--200 hover:bg-zinc-300 border-[1px] w-[40vw] h-[15vh] border-dashed border-zinc-400 font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : 'Add a new action'}
        </button>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/4 h-[80vh] rounded-lg shadow-lg">
              <ActionForm 
                show={showForm} 
                toggle={toggleForm} 
                handleCreateAction={handleCreateAction} 
                initialData={selectedAction} 
              />
            </div>
          </div>
        )}
      </div>

        <div className={`w-full absolute bottom-0 h-[6.5vh] ${theme === "dark" ? 'bg-[#1F222A] text-white' : 'bg-white text-black'}`}>
          <div className='w-full h-full flex justify-end items-center gap-[2vw] px-[3vw] '>
            <GradientButton
              text='back'
              onClick={() => navigate.push('/workspace/agents/phone/createagent')}
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
  );
};

export default ToolCreation;
