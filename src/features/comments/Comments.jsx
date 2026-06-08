import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectCommentsByPostId, selectCommentsLoading } from './commentsSlice';
import ReactMarkdown from 'react-markdown';

const Comments = ({ postId, subreddit }) => {
  const dispatch = useDispatch();
  const commentsByPostId = useSelector(selectCommentsByPostId);
  const isLoading = useSelector(selectCommentsLoading);
  const comments = commentsByPostId[postId];

  useEffect(() => {
    if (!comments) {
      dispatch(fetchComments({ postId, subreddit }));
    }
  }, [postId]);

  if (isLoading) return <div className='comments-loading'>carregando comentários...</div>;

  if (!comments || comments.length === 0) {
    return <div className='comments-empty'>nenhum comentário ainda.</div>;
  }

  return (
    <div className='comments-container'>
      {comments.slice(0, 5).map((comment) => (
        comment.body && (
          <div key={comment.id} className='comment'>
            <span className='comment-author'>u/{comment.author}</span>
            <ReactMarkdown className='comment-body'>
              {comment.body}
            </ReactMarkdown>
          </div>
        )
      ))}
    </div>
  );
};

export default Comments;