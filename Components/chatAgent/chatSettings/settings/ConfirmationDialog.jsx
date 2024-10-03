import React, { useState } from 'react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, cancelClass }) => {
    const [text,setText]=useState('');
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-4">We will immediately delete your chat bot details along with files used to create it. 
                    <br />
                    You will no longer be able to use the endpoints for this chatbot.</p>
                    <span> To verify, type "delete my bot" below:</span>
                    <br />
                    <input className='border w-[100%] p-[1vh]' type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
                <div className="flex mt-[1vh] justify-end gap-4">
                    <button onClick={onClose} className={`px-4 py-2 rounded ${cancelClass}`}>Cancel</button>
                    <button disabled={text!=='delete my bot'} onClick={onConfirm} className={`px-4 py-2 ${text==='delete my bot'?'bg-red-500':'bg-red-300'}  text-white rounded`}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;