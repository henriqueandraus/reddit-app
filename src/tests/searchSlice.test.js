import searchReducer, {
  setSearchTerm,
  clearSearchTerm,
} from '../features/search/searchSlice';

describe('searchSlice', () => {
  const initialState = { searchTerm: '' };

  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  it('should set the search term', () => {
    const newState = searchReducer(initialState, setSearchTerm('React'));
    expect(newState.searchTerm).toBe('React');
  });

  it('should clear the search term', () => {
    const stateWithTerm = { searchTerm: 'React' };
    const newState = searchReducer(stateWithTerm, clearSearchTerm());
    expect(newState.searchTerm).toBe('');
  });
});