import { createSlice } from "@reduxjs/toolkit";

const selectedForumPosts = createSlice({
  name: "selectedForumPosts",
  initialState: null,
  reducers: {
    setSelectedForumPosts(state, action) {
      console.log("Payload inside FORUM POSTS reducer: ", action.payload);
      state = action.payload;
      return state;
    },
    addMessageToForumPosts(state,action){
      console.log('Inside addMessageToForumPosts 🔴🔴')
      // if (state.length && state[0].forum === action.payload.forum){
        console.log('Inside addMessageToForumPostssss IFFFFFFF🔴🔴IFFFFFFF🔴🔴')
        state.push(action.payload)
      // }
      return state
    },
    removeForumPost(state, action){
      state = state.filter((post) => post.id !== action.payload);
      return state
    }
  },
});

export const { setSelectedForumPosts, addMessageToForumPosts, removeForumPost} = selectedForumPosts.actions;
export default selectedForumPosts.reducer;
