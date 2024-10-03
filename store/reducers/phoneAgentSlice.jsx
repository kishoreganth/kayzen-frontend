import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    phoneAgentName: '',
    phoneAgentPurpose: '',
    companyName: '',
    companyBusiness: '',
    companyServices: '',
    prompt: '',
    meetingSchedular: '',
    senderMail: '',
    priceInquiry: '',
    countryCode: '+91',
    previewNumber: '',
    createdActions: [],
}

const phoneAgentslice = createSlice({
    name: 'phoneAgent',
    initialState,
    reducers: {
        setphoneAgentName: (state, action) =>{
            state.phoneAgentName = action.payload
        },
        setphoneAgentPurpose: (state, action) =>{
            state.phoneAgentPurpose = action.payload
        },
        setcompanyName: (state, action) =>{
            state.companyName = action.payload
        },
        setcompanyBusiness: (state, action) =>{
            state.companyBusiness = action.payload
        },
        setcompanyServices: (state, action) =>{
            state.companyServices = action.payload
        },
        setPrompt: (state, action) =>{
            state.prompt = action.payload
        },
        setmeetingSchedular: (state, action) =>{
            state.meetingSchedular = action.payload
        },
        setsenderMail: (state, action) =>{
            state.senderMail = action.payload
        },
        setpriceInquiry: (state, action) =>{
            state.priceInquiry = action.payload
        },
        setCountryCode: (state, action)=>{
            state.countryCode = action.payload
        },
        setPreviewNumber: (state, action)=>{
            state.previewNumber = action.payload
        },
        upsertAction: (state, action) => {
            const { id } = action.payload; // Assume the action payload includes an id
            const existingIndex = state.createdActions.findIndex(item => item.id === id);
            
            if (existingIndex >= 0) {
                // If found, update the existing action
                state.createdActions[existingIndex] = action.payload;
            } else {
                // If not found, add a new action
                state.createdActions.push(action.payload);
            }
        },
        removeAction: (state, action) => {
            console.log("Current actions before removal:", state.createdActions);
            console.log("ID to remove:", action.payload, "Type:", typeof action.payload);

            // Filter actions to remove the one with the matching ID
            const updatedActions = state.createdActions.filter(item => item.id !== action.payload);

            // Log the updated actions to see if the removal worked
            console.log("Actions after removal:", updatedActions);

            // Update the state with the new array (ensure you are not mutating)
            state.createdActions = updatedActions; 
        },
    }
})

export const {setphoneAgentName, setphoneAgentPurpose, setcompanyName, setcompanyBusiness, setcompanyServices, setmeetingSchedular, setsenderMail, setpriceInquiry, setCountryCode, setPreviewNumber} = phoneAgentslice.actions
export default phoneAgentslice.reducer