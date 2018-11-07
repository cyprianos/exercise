import React from "react";

import connect from "react-redux/es/connect/connect";

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.getPostId = this.getPostId.bind(this);
  }

  getPostId() {
    return this.props.match.params.id;
  }

  render() {
    const postId = parseInt(this.getPostId(), 10);
    const post = this.props.posts.filter((post) => post.id === postId)[0];
    return <div>
      {post && <div>
        <h2>{post.title || ''}</h2>
        <h4>{post.username || ''}</h4>
        <div>{post.body || ''}</div>
      </div>
      }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps)(Details);