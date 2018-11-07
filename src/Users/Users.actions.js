import Chance from 'chance';
const chance = new Chance();


const USERS_ACTIONS = {
  USERS_ADD: 'USERS_ADD'
};

export function createUser (id) {
  return {
    type: USERS_ACTIONS.USERS_ADD,
    data: {
      id:id,
      username: chance.name()
    }
  }
}


export default USERS_ACTIONS;