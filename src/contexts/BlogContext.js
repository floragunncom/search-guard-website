import React, { useState, useEffect } from 'react';
import client from '../components/Client/Client';

export const BlogContext = React.createContext();

const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await client
        .getEntries({ content_type: 'post', order: '-fields.date' })
        .then(response => {
          setPosts(response.items);
        });
    };
    fetchPosts();
  }, []);

  return <BlogContext.Provider value={posts}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
