import React, { useState } from 'react';
import Comments from '../features/comments/Comments';

const Post = ({ post, viewMode }) => {
  const [showComments, setShowComments] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

  const timeAgo = (timestamp) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}min atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
    return `${Math.floor(seconds / 86400)}d atrás`;
  };

  return (
    <div className={`post-item ${viewMode === 'grid' ? 'grid' : ''}`}>
      <div className='post-votes'>
        <button className='vote-btn'>▲</button>
        <span className='vote-count'>{formatNumber(post.ups)}</span>
        <button className='vote-btn'>▼</button>
      </div>

      <div className='post-content'>
        <span className='post-tag'>r/{post.subreddit}</span>
        <h3 className='post-title'>{post.title}</h3>
        <div className='post-meta'>
          <span>u/{post.author}</span>
          <span>{timeAgo(post.created_utc)}</span>
          <button
            className='comments-btn'
            onClick={() => setShowComments(!showComments)}
          >
            💬 {formatNumber(post.num_comments)} comentários
          </button>
        </div>

        {showComments && (
          <Comments postId={post.id} subreddit={post.subreddit} />
        )}
      </div>

      {post.thumbnail && post.thumbnail.startsWith('http') && (
        <img
          className='post-thumb'
          src={post.thumbnail}
          alt={post.title}
        />
      )}
    </div>
  );
};

export default Post;