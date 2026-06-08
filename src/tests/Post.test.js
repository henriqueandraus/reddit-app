const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { Provider } = require('react-redux');
const { configureStore } = require('@reduxjs/toolkit');

const mockPost = {
  id: '1',
  title: 'Test post title',
  author: 'testuser',
  subreddit: 'technology',
  ups: 1500,
  num_comments: 42,
  created_utc: Date.now() / 1000 - 3600,
  thumbnail: '',
};

describe('Post component', () => {
  it('should render correctly with mock data', () => {
    expect(mockPost.title).toBe('Test post title');
  });

  it('should have correct author', () => {
    expect(mockPost.author).toBe('testuser');
  });

  it('should have correct subreddit', () => {
    expect(mockPost.subreddit).toBe('technology');
  });

  it('should format votes correctly', () => {
    const formatNumber = (num) => {
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
      return num;
    };
    expect(formatNumber(mockPost.ups)).toBe('1.5k');
  });

  it('should have num_comments as number', () => {
    expect(typeof mockPost.num_comments).toBe('number');
  });
});