import {combineReducers} from 'redux';


// import AuthReducer from '../Auth/Auth.model';
import UsersReducer from '../Users/Users.reducer';
import PostsReducer from '../Posts/Posts.reducer';
import ModalReducer from '../Modal/Modal.reducer';

export const RootReducer = combineReducers({
  // auth:AuthReducer,
  posts: PostsReducer,
  users: UsersReducer,
  modal: ModalReducer
});


export default RootReducer;