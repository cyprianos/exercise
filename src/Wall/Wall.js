import React from "react";

import './Wall.scss';
import Chance from 'chance'

const chance = new Chance();

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {

    //setupRandomNames
    const self = this;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => data.concat().sort((a, b) => b.id - a.id))
      .then(data => {

        const users = new Set(data.map(post=>post.userId));

        const usernames = new Map();
        for(let [key,value] of users.entries()) {
          usernames.set(value,chance.name());
        }
        self.setState({users: usernames});


        return data.map(post=>{
          return {
            ...post,
            username:usernames.get(post.userId)
          }
        })
      })
      .then(data => self.setState({posts: data}));

    //delaying

  }

  render() {
    const {posts} = this.state;

    return (
      <div className="wall">

        <div className="wall__container">
          {posts.map(post => (
            <div className="wall__post" key={post.id}>
              <h3 className="wall__user">{post.username}</h3>
              <div className="wall__title">{post.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}