import React from "react";

import './Wall.scss';
import Chance from 'chance'

import {Link} from 'react-router-dom';

const chance = new Chance();

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      posts: [],
      searchString: ''
    }
  }
  //generator delays post
  static postGenerator = async function*(posts) {
    for (let i = 0; i < posts.length; i++) {
      await Wall.promiseTimeout(1000);
      yield posts[i];
    }
  };

  static promiseTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount() {

    const self = this;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => data.concat().sort((a, b) => b.id - a.id))
      .then(posts => {
        //setup random (but not persistent) users
        const users = new Set(posts.map(post => post.userId));
        const usernames = new Map();
        for (let [key, value] of users.entries()) {
          usernames.set(value, chance.name());
        }
        self.setState({users: usernames});

        return posts.map(post => {
          return {
            ...post,
            username: usernames.get(post.userId)
          }
        });
      })
      .then(async (posts) => {
        for await (const post of Wall.postGenerator(posts)) {
          //update posts collection based on previous state
          self.setState((state, props)=>{
            return {
              posts: [...state.posts, post]
            }
          });
        }
      })
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
    const {posts, searchString} = this.state;


    return (
      <div className="wall">
        <input id="search" name="search" value={this.state.searchString} onChange={this.handleChange}/>
        <div className="wall__container">
          {posts.filter(this.searchStringFilter).map(post => (
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