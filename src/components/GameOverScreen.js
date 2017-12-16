import React from 'react'
import { connect } from 'react-redux'
import { playAgain, titleScreen } from '../redux/actionCreators'

export class DisconnectedGameOverScreen extends React.Component {
  playAgain = (e) => {
    this.props.playAgain()
    e.stopPropagation()
    return false
  }

  titleScreen = (e) => {
    this.props.titleScreen()
    e.stopPropagation()
    return false
  }

  render() {
    return (
      <div className='screen-container'>
        <div className='overlay active'>
          <div className='overlay-content'>
            <h1>{this.props.winner} WINS!</h1>
            <p>Play again?</p>
            <button onClick={this.playAgain}>Yes</button>
            <button onClick={this.titleScreen}>No</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { playerId, opponentId, names, hitPoints } = state
  const winnerId = hitPoints[playerId] === 0 ? opponentId : playerId
  return {
    winner: names[winnerId]
  }
}

const mapDispatchToProps = {
  playAgain,
  titleScreen
}

export const GameOverScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedGameOverScreen)
