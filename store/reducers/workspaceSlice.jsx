import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    workspacename: '',
    twiliosid: '',
    twilioauthtoken: '',
    elevenlabskey: '',
    openaikey: '',
}

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setworkspaceid: (state, action) =>{
            state.workspacename = action.payload
        },
        setworkspacename: (state, action) =>{
            state.workspacename = action.payload
        },
        settwilioauthtoken: (state, action) =>{
            state.twilioauthtoken = action.payload
        },
        settwiliosid: (state, action) =>{
            state.twiliosid = action.payload
        },
        setelevenlabskey: (state, action) =>{
            state.elevenlabskey = action.payload
        },
        setopenaikey: (state, action) =>{
            state.openaikey = action.payload
        },
    }
})

export const {
    setworkspacename,
    settwilioauthtoken,
    settwiliosid,
    setelevenlabskey,
    setopenaikey,

} = workspaceSlice.actions
export default workspaceSlice.reducer