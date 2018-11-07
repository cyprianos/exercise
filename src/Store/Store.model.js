import {combineReducers} from 'redux';


// import AuthReducer from '../Auth/Auth.model';
import UsersReducer from '../Users/Users.reducer';
import PostsReducer from '../Posts/Posts.reducer';

export const RootReducer = combineReducers({
  // auth:AuthReducer,
  posts: PostsReducer,
  users: UsersReducer
});


export default RootReducer;