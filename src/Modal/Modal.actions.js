const MODAL_ACTIONS = {
  MODAL_ERROR: 'MODAL_ERROR',
  MODAL_OK: 'MODAL_OK'
};

export default MODAL_ACTIONS

export function modalError(message) {
  return {
    type: MODAL_ACTIONS.MODAL_ERROR,
    message: message
  };
}

export function modalOK(message) {
  return {
    type: MODAL_ACTIONS.MODAL_OK
  }
}