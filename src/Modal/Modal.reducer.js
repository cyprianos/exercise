import MODAL_ACTIONS from './Modal.actions';

const initialState = {error: false, message: ''};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.MODAL_ERROR:

      return {
        error: true,
        message: action.message
      };
    case MODAL_ACTIONS.MODAL_OK:
      return initialState;
    default:
      return state;
  }
};

export default ModalReducer;