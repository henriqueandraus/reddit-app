import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from '../features/search/searchSlice';

const Navbar = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearSearchTerm());
  };

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <span className='logo-circle'></span>
        Threadly
      </div>

      <div className='navbar-search'>
        <input
          type='text'
          placeholder='buscar posts...'
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button onClick={handleClear} className='clear-btn'>✕</button>
        )}
      </div>

      <div className='navbar-right'>
        <button
          className='dark-mode-btn'
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;