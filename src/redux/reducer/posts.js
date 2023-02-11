import { fetchGetAuth } from "../../post";
import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  posts: [],
  error: "",
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", () => {
  return fetchGetAuth(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE
    }/all`
  ).then((data) => {
    return data.json.posts;
  });
});

const Posts = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    builder.addCase("UPDATE", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
  },
});

// const PostTest = (state = Posts.reducer, action)=>{
//   switch
// }
export default Posts.reducer;
