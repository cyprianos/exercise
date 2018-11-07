import React from "react";
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import './Wall.scss';

import {fetchPosts} from './Wall.model';
import {increment} from "../Counter/Counter.reducer";

class Wall extends React.Component {
  state = {
    searchString: ''
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchPosts('https://jsonplaceholder.typicode.com/posts')
  }

  static match = (object, property, phrase) => {
    if(phrase) {
      return object[property].toLowerCase().includes(phrase.toLowerCase());
    }
    return true;

  };

  searchStringFilter = (post) => {
    return Wall.match(post, 'body', this.state.searchString) || Wall.match(post, 'title', this.state.searchString)
  };

  handleChange(e) {
    this.setState({
      searchString: e.target.value
    });
  }

  render() {
    const {searchString} = this.state;


    return (
      <div className="wall">
        <div className="">
          <h3>Counter</h3>
          <div>{this.props.counter.value}</div>
          <button onClick={this.props.onIncrementCounter}>increment</button>
        </div>
        <input id="search" name="search" value={searchString} onChange={this.handleChange}/>
        <div className="wall__container">
          {this.props.posts.filter(this.searchStringFilter).map(post => (
            <Link to={`/details/${post.id}`} className="wall__post" key={post.id}>
              <h3 className="wall__user">{post.username}</h3>
              <div className="wall__title">
                {post.title}
              </div>
            </Link>

          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(increment()),
    fetchPosts: (url) => dispatch(fetchPosts(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wall);