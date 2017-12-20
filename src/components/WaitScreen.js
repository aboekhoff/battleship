import React from 'react'
import { connect } from 'react-redux'
import { Grid } from './Grid'
import { Stats } from './Stats'
import { Screen } from './Screen'
import { pretendToThink } from '../redux/actionCreators'

export class DisconnectedWaitScreen extends React.Component {
  
  componentDidMount() {
    this.props.pretendToThink()
  }
  
  render() {
    const { playerGrid, playerShips } = this.props
    
    return (
      <Screen>
        <Grid
          grid={playerGrid}
          ships={playerShips}
        />
        <Stats />
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  const {
    playerId,
    opponentId,
    grid,
    ships,
    hitPoints
  } = state

  return {
    playerId,
    playerGrid: grid[playerId],
    playerShips: ships[playerId],
    playerHitPoints: hitPoints[playerId],
    opponentHitPoints: hitPoints[opponentId],
  }
}

const mapDispatchToProps = {
  pretendToThink,
}

export const WaitScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedWaitScreen)
