import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setSubreddit, selectSubreddit } from '../features/posts/postsSlice';

const subreddits = [
  'popular',
  'technology',
  'science',
  'gaming',
  'worldnews',
  'movies',
  'music',
  'sports',
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(selectSubreddit);

  const handleSubredditClick = (subreddit) => {
    dispatch(setSubreddit(subreddit));
    dispatch(fetchPosts(subreddit));
  };

  return (
    <aside className='sidebar'>
      <h3 className='sidebar-title'>subreddits</h3>
      <ul className='sidebar-list'>
        {subreddits.map((subreddit) => (
          <li
            key={subreddit}
            className={`sidebar-item ${selectedSubreddit === subreddit ? 'active' : ''}`}
            onClick={() => handleSubredditClick(subreddit)}
          >
            <span className='sidebar-dot'></span>
            r/{subreddit}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;