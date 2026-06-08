import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockComments } from '../../mocks/mockData';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ postId }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      postId,
      comments: mockComments[postId] || [],
    };
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByPostId: {},
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsByPostId[action.payload.postId] = action.payload.comments;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectCommentsByPostId = (state) => state.comments.commentsByPostId;
export const selectCommentsLoading = (state) => state.comments.isLoading;
export default commentsSlice.reducer;