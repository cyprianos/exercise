import React from "react";
import {connect} from "react-redux";
import {modalOK} from './Modal.actions';

class Modal extends React.PureComponent {
  render() {
    return (
      <div className="modal">
        <div className="modal__window">
          <div className="modal__text">
            {this.props.message || 'noerror'}
          </div>
          <button className="modal__button" onClick={this.props.modalOK}>Close</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.modal.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    modalOK: () => dispatch(modalOK())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);