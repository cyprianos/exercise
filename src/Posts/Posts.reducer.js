import POSTS_ACTIONS from './Posts.actions';

const PostsReducer = (state = [], action) => {
  switch (action.type) {
    case POSTS_ACTIONS.POSTS_ADD:
      if (!state.filter((post) => post.id === action.data.id).length > 0) {
        return [...state, action.data];
      }
      return state;
    default:
      return state;
  }
};

export default PostsReducer;