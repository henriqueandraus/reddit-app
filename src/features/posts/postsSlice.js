import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockPosts } from '../../mocks/mockData';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'popular') => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (subreddit === 'popular') return mockPosts;
    return mockPosts.filter(post => post.subreddit === subreddit);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
    selectedSubreddit: 'popular',
  },
  reducers: {
    setSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { setSubreddit } = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectHasError = (state) => state.posts.hasError;
export const selectSubreddit = (state) => state.posts.selectedSubreddit;
export default postsSlice.reducer;