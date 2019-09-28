import React, { useState, useEffect } from 'react';
import client from '../components/Client/Client';

export const BlogContext = React.createContext();

const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetch = await client
        .getEntries({ content_type: 'post', order: 'sys.createdAt' })
        .then(response => {
          setPosts(response.items);
        });
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return <BlogContext.Provider value={posts}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
