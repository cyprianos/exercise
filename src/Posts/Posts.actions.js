const POSTS_ACTIONS = {
  POSTS_ADD: 'POSTS_ADD',
  POSTS_RESET: 'POSTS_RESET'
};

export default POSTS_ACTIONS;

export function createPost(post) {
  return {
    type: POSTS_ACTIONS.POSTS_ADD,
    data: post
  }
}