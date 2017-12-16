import React from 'react'
import { connect } from 'react-redux'
import { startGame, startDefaultGame } from '../redux/actionCreators'

export class DisconnectedTitleScreen extends React.Component {
  handleStart = () => {
    this.props.startGame()
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
      <div className='screen-container'>
        <div className='overlay'/>
        <h1>PRESS ANY KEY TO PLAY</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = { startGame: startDefaultGame }

export const TitleScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTitleScreen)
