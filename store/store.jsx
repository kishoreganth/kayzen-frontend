import { configureStore } from '@reduxjs/toolkit';
import botReducer from './reducers/botSlice';
import fileReducer from './reducers/fileSlice'
import fileUpdateReducer from './reducers/fileSliceUpdate'
import dataSourceSlice from './reducers/dataSourceSlice';
import teamSlice from './reducers/teamSlice';
import profileSlice from './reducers/profileSlice';
import billingSlice from './reducers/billingSlice';
import phoneAgentSlice from './reducers/phoneAgentSlice';
import VoiceSettingSlice from './reducers/VoiceSettingSlice';
import embedCodeSlice from './reducers/embedCodeSlice';
import registerUserSlice from './reducers/registerUserSlice';
import workspaceSlice from './reducers/workspaceSlice';

const store = configureStore({
  reducer: {
    bot: botReducer,
    data: dataSourceSlice,
    file: fileReducer,
    fileUpdate: fileUpdateReducer,
    team: teamSlice,
    profile: profileSlice,
    billing: billingSlice,
    phoneAgent: phoneAgentSlice,
    voice: VoiceSettingSlice,
    embedCode: embedCodeSlice,
    user: registerUserSlice,
    workspace: workspaceSlice,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions: ['file/setFile', 'fileUpdate/setFileUpdate'],
        ignoredPaths: ['file.file', 'fileUpdate.file']
      }
    })
});

export default store;
