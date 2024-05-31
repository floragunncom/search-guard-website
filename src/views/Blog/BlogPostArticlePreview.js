import React, {useEffect} from 'react';
import  { Redirect } from 'react-router-dom'
import { useState } from "react";
import { useParams } from "react-router-dom";
import BlogPostArticleContent from "../../components/BlogPost/BlogPostArticleContent";

const BlogPostArticlePreview = ({ match }) => {

  let params = useParams();
  
  const [postContent, setPostContent] = useState(null);
  const [error, setError] = useState(null);

  const fetchPost = async() => {

    const client = require('contentful').createClient({
      space: '95di84mqkkro',
      accessToken: '5c5c1b8657c1ff7356d0736bfa52dfc226d5617d4d50c992d9a6a21a64db86c6',
      host: 'preview.contentful.com',
    });

    // http://localhost:3000/preview/blogpost/kerberos-elasticsearch-searchguard-pt1/
    let posts = await client.getEntries({ content_type: 'post', "fields.slug": params.slug + "/"});

    if (posts && posts.items && posts.items.length > 0) {
      return posts.items[0];
    }
    throw new Error("Post not found.");
  }

  useEffect(() => {
    fetchPost()
        .then(response => {
          setPostContent(response);
        })
        .catch(err => {
          setError(err);
        });
  }, [])

  if (error) {
    return (<Redirect to="/404/" />);
  }

  if (!postContent) {
    return "";
  }

  return (
      <BlogPostArticleContent postContent={postContent}/>
  );
};

export default BlogPostArticlePreview;
