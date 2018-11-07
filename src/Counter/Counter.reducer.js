export const increment = () => {
  return {
    type: 'INCREMENT'
  };
};


const CounterReducer = (state = {value: 0}, action) => {
  if (action.type === 'INCREMENT') {
    return {value: state.value + 1};
  }
  return state;
};
export default CounterReducer;