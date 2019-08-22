import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import client from '../../components/Client/Client';
import BlogPost from './BlogPost';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetch = await client.getEntries({ content_type: 'post', 'order':'sys.createdAt' }).then(response => {
        console.log('response', response)
        setPosts(response.items);
      });
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const postsList = loading ? <div>Loading ...</div> : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {currentPosts.map((post, index) => {
          return (
            <div className="col s12 l6 blogpost-column-wrapper">
              <BlogPost key={index} post={post} posts={posts} />
            </div>
          );
        })}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );

  return (
    <div>
      <NavBar />
      <Title headline="Blog" />
      <div className="row">{postsList}</div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Blog;
