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

  componentDidMount() {

    const self = this;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => data.concat().sort((a, b) => b.id - a.id))
      .then(data => {
        //not persistent
        const users = new Set(data.map(post => post.userId));
        const usernames = new Map();
        for (let [key, value] of users.entries()) {
          usernames.set(value, chance.name());
        }
        self.setState({users: usernames});

        return data.map(post => {
          return {
            ...post,
            username: usernames.get(post.userId)
          }
        });
      })
      .then(data => self.setState({posts: data}));

    //delaying

  }

  match = (object, property, phrase) => {
    return object[property].toLowerCase().includes(phrase.toLowerCase());
  };

  searchStringFilter = (post) => {
    return this.match(post, 'body', this.state.searchString) || this.match(post, 'title', this.state.searchString)
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

            <div className="wall__post" key={post.id}>
              <h3 className="wall__user">{post.username}</h3>
              <Link to={`/details/${post.id}`} className="wall__title">
                {post.title}
              </Link>
            </div>

          ))}
        </div>
      </div>
    )
  }
}