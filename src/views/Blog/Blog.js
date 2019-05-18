import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import client from '../../components/Client/Client';
import BlogPost from './BlogPost';

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    client.getEntries({content_type: 'post'}).then((response) => {
      this.setState({ posts: response.items });
    });
  };

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <div className="col s12 l6 blogpost-column-wrapper">
          <BlogPost key={index} post={post} relatedPosts={this.state.posts} />
        </div>
      );
    });

    return (
      <div>
        <NavBar />
        <Title headline="Blog" />
        <div className="row">{posts}</div>
        <PreFooter />
        <Footer />
      </div>
    );
  }
}

export default Blog;
