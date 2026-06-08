import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Posts from '../features/posts/Posts';

const App = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts('popular'));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className='app'>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className='layout'>
        <Sidebar />
        <main className='main'>
          <Posts />
        </main>
      </div>
    </div>
  );
};

export default App;