import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SCREENS } from '../redux/constants'
import { Modal } from './Modal'
import { PlayScreen } from './PlayScreen'
import { TitleScreen } from './TitleScreen'
import { WaitScreen } from './WaitScreen'

export class DisconnectedApp extends Component {
  render() {
    const { CurrentScreen, status, deviceType } = this.props

    return (
      <div className={`app ${deviceType}`}>
        <div className="status-bar">
          {status.toUpperCase()}
        </div>
        <Modal />
        <CurrentScreen />   
      </div>
    )
  }
}

const screenComponents = {
  [SCREENS.TITLE]: TitleScreen,
  [SCREENS.PLAY]: PlayScreen,
  [SCREENS.WAIT]: WaitScreen,
}

const mapStateToProps = state => ({
  CurrentScreen: screenComponents[state.screen],
  status: state.status,
  deviceType: state.deviceType.toLowerCase()
})

export const App = connect(mapStateToProps)(DisconnectedApp);
