import {createUser} from '../Users/Users.actions';
import {createPost} from '../Posts/Posts.actions';

import {modalError} from '../Modal/Modal.actions';

const promiseTimeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const postGenerator = async function*(posts) {
  for (let i = 0; i < posts.length; i++) {
    await promiseTimeout(1000);
    yield posts[i];
  }
};

export function fetchPosts(url) {
  return (dispatch, getState) => {
    fetch(url)
      .then((response) => response.json())
      .then(posts => posts.concat().sort((a, b) => b.id - a.id))
      .then(posts=> {

        const userNumbers = new Set(posts.map(post => post.userId));

        for (let value of userNumbers) {
          dispatch(createUser(value));
        }


        //continue promise flow to prepare posts
        return posts.map(post => {
          return {
            ...post,
            username: getState().users.filter(user=>user.id===post.userId)[0].username
          }
        });
      })

      .then(async (posts) => {
        for await (const post of postGenerator(posts)) {
          //update posts collection based on previous state
          dispatch(createPost(post));
        }

        return posts;
      })
      .catch((err)=>{
        // console.log('err',typeof err.message)
        return dispatch(modalError(err.message));
      })
  };
}