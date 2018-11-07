import {combineReducers} from 'redux';


// import AuthReducer from '../Auth/Auth.model';
import UsersReducer from '../Users/Users.reducer';
import PostsReducer from '../Posts/Posts.reducer';
import CounterReducer from '../Counter/Counter.reducer';

export const RootReducer = combineReducers({
  // auth:AuthReducer,
  posts: PostsReducer,
  users: UsersReducer,
  counter: CounterReducer
});


export default RootReducer;