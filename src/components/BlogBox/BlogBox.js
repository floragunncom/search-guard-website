import React, { useEffect, useState, useContext} from 'react';
import BlogPost from '../../views/Blog/BlogPost';
import client from '../../components/Client/Client';
import Button from '../../components/Button/Button';
import { BlogContext } from '../../contexts/BlogContext';
import './BlogBox.scss';

const BlogBox = ({ intro, headline }) => {
    const posts = useContext(BlogContext);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const fetch = await client
  //       .getEntries({ content_type: 'post', order: 'sys.createdAt' })
  //       .then(response => {
  //         setPosts(response.items);
  //       });
  //   };
  //   fetchPosts();
  // }, []);

  let extraRow;

  if (intro) {
    extraRow = (
      <div>
        <div className="boxblog-posts">
          {posts.slice(3, 6).map((post, index) => {
            return <BlogPost key={index} post={post} />;
          })}
        </div>
        <div className="blogbox-button">
          <Button text="see more" link="/blog/" />
        </div>
      </div>
    );
  }

  return (
    <div className="boxblog-wrapper" id="blog">
      <div className={intro ? 'boxblog-headline-intro' : 'boxblog-headline'}>
        {headline}
      </div>
      <div className={intro ? 'boxblog-posts' : 'row boxblog-posts'}>
        {posts.slice(0, 3).map((post, index) => {
          return <BlogPost key={index} post={post} />;
        })}
      </div>
      {extraRow}
    </div>
  );
};

export default BlogBox;
