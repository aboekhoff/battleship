import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import { ASSETS, SCREENS } from '../redux/constants'
import { TitleScreen } from './TitleScreen'
import { SetupScreen } from './SetupScreen'
import { PlayScreen } from './PlayScreen'
import { GameOverScreen } from './GameOverScreen'

export class DisconnectedApp extends Component {
  render() {
    const { Screen } = this.props

    return (
      <div className="App">
        <div className="App-header">
          BATTLESHIP
        </div>
        <Screen/>
      </div>
    )
  }
}

const screenComponents = {
  [SCREENS.TITLE]: TitleScreen,
  [SCREENS.SETUP]: SetupScreen,
  [SCREENS.PLAY]: PlayScreen,
  [SCREENS.GAMEOVER]: GameOverScreen,
}

const mapStateToProps = state => ({
  Screen: screenComponents[state.screen]
})

export const App = connect(mapStateToProps)(DisconnectedApp);
