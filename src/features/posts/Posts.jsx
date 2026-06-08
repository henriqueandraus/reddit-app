import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  selectPosts,
  selectIsLoading,
  selectHasError,
  selectSubreddit,
} from './postsSlice';
import { selectSearchTerm } from '../search/searchSlice';
import Post from '../../components/Post';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);
  const selectedSubreddit = useSelector(selectSubreddit);
  const searchTerm = useSelector(selectSearchTerm);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className='posts-loading'><p>carregando posts...</p></div>;

  if (hasError) {
    return (
      <div className='posts-error'>
        <p>não foi possível carregar os posts.</p>
        <button onClick={() => dispatch(fetchPosts(selectedSubreddit))}>
          tentar novamente
        </button>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return <div className='posts-empty'><p>nenhum post encontrado para "{searchTerm}".</p></div>;
  }

  return (
    <div>
      <div className='toolbar'>
        <span className='toolbar-label'>
          r/{selectedSubreddit}
        </span>
        <div className='view-toggle'>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            ☰ lista
          </button>
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            ⊞ grid
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'posts-grid' : 'posts-list'}>
        {filteredPosts.map(post => (
          <Post key={post.id} post={post} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default Posts;