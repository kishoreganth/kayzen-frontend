import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  botName: '',
  description: '',
  prompt: '',
  loading: true,
};

const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    setBotName: (state, action) => {
      state.botName = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});



export const { setBotName, setDescription, setPrompt, setLoading } = botSlice.actions;
export default botSlice.reducer;
