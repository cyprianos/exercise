import {modalError, modalOK, MODAL_ACTIONS} from './Modal.actions';

describe('Modal suite', () => {
  it('should create action to modal error', () => {
    const message = 'huge error';
    const expectedAction = {
      type: MODAL_ACTIONS.MODAL_ERROR,
      message: message
    };
    expect(modalError(message)).toEqual(expectedAction);
  });

  it('should create action to modal ok', () => {
    const expectedAction = {
      type: MODAL_ACTIONS.MODAL_OK
    };
    expect(modalOK()).toEqual(expectedAction);
  })
});