import USERS_ACTIONS from './Users.actions';

export default function UsersReducer(state = [], action) {
  switch (action.type) {
    // new user if current does not exist
    case USERS_ACTIONS.USERS_ADD:
      //user with specific ID notfound
      if (!state.filter((user) => user.id === action.data.userId).length > 0) {
        return [...state, action.data];
      }
      return state;
    default:
      return state;
  }
}