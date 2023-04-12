import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";
import selectedListingSlice from "./selectedListingSlice";
// import selectedConvoSlice from "./selectedChatHistory";
import selectedConvoSlice from "./selectedConvoSlice";
import favListingsSlice from "./favListingSlice";
import selectedChatHistory from "./selectedChatHistory";
import conversationSlice from "./conversationSlice";
import selectedForumPostsSlice from "./selectedForumPostsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    allMessages: messagesReducer,
    conversations: conversationSlice,
    selectedListing: selectedListingSlice,
    selectedConvo: selectedConvoSlice,
    favListings: favListingsSlice,
    selectedChatHistory: selectedChatHistory,
    selectedForumPosts: selectedForumPostsSlice
  },
});
