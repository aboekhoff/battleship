import React from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actionCreators'

export class DisconnectedModal extends React.Component {
  render() {
    const { active, deviceType, ContentComponent } = this.props

    return (
      <div 
        className={`modal-overlay ${active ? 'active' : ''}`}
        onClick={this.props.closeModal}
      >
        <div className={`modal-content ${deviceType}`} onClick={(e) => e.stopPropagation()}>
          {active && <ContentComponent />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ContentComponent: state.modalContent,
  active: !!state.modalContent,
  deviceType: state.deviceType.toLowerCase()
})

const mapDispatchToProps = {
  closeModal,
}

export const Modal = connect(mapStateToProps, mapDispatchToProps)(DisconnectedModal)