import React from 'react'
import { connect } from 'react-redux'
import { Screen } from './Screen'
import { startGame, startDefaultGame } from '../redux/actionCreators'

export class DisconnectedTitleScreen extends React.Component {
  handleStart = (e) => {
    this.props.startGame()
    e.stopPropagation()
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleStart)
    window.addEventListener('click', this.handleStart)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleStart)
    window.removeEventListener('click', this.handleStart)
  }

  render() {
    return (
      <Screen>
        <h1>PRESS ANY KEY TO PLAY</h1>
      </Screen>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = { startGame: startDefaultGame }

export const TitleScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTitleScreen)
