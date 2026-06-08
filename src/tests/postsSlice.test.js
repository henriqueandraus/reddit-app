import postsReducer, {
  setSubreddit,
} from '../features/posts/postsSlice';

describe('postsSlice', () => {
  const initialState = {
    posts: [],
    isLoading: false,
    hasError: false,
    selectedSubreddit: 'popular',
  };

  it('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set the selected subreddit', () => {
    const newState = postsReducer(initialState, setSubreddit('gaming'));
    expect(newState.selectedSubreddit).toBe('gaming');
  });

  it('should set isLoading to true when fetchPosts is pending', () => {
    const action = { type: 'posts/fetchPosts/pending' };
    const newState = postsReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.hasError).toBe(false);
  });

  it('should set posts when fetchPosts is fulfilled', () => {
    const mockPosts = [{ id: '1', title: 'Test post' }];
    const action = { type: 'posts/fetchPosts/fulfilled', payload: mockPosts };
    const newState = postsReducer(initialState, action);
    expect(newState.posts).toEqual(mockPosts);
    expect(newState.isLoading).toBe(false);
  });

  it('should set hasError to true when fetchPosts is rejected', () => {
    const action = { type: 'posts/fetchPosts/rejected' };
    const newState = postsReducer(initialState, action);
    expect(newState.hasError).toBe(true);
    expect(newState.isLoading).toBe(false);
  });
});
