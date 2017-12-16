import React from 'react'
import { connect } from 'react-redux'
import { Grid } from './Grid'
import { Stats } from './Stats'
import { MISS, HIT } from '../redux/constants'
import { gameOver, updateGrid } from '../redux/actionCreators'

export const DisconnectedPlayScreen = props => {
  const { playerGrid, opponentGrid, playerShips } = props

  const handleClick = (x, y, target) => {
    const { opponentId, opponentHitPoints, updateGrid, gameOver } = props

    if (target === MISS) {
      return
    }

    if (target === null) {
      updateGrid(opponentId, x, y, MISS, null)
    }

    else {
      updateGrid(opponentId, x, y, HIT, target)
      if (opponentHitPoints === 1) {
        gameOver()
      }
    }
  }

  return (
    <div className='screen-container'>
      <div className='overlay' />
      <Stats />
      <Grid
        grid={opponentGrid}
        handleClick={handleClick}
      />
    </div>
  )
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
    opponentId: opponentId,
    playerGrid: grid[playerId],
    opponentGrid: grid[opponentId],
    playerShips: ships[playerId],
    opponentHitPoints: hitPoints[opponentId],
  }
}

const mapDispatchToProps = {
  updateGrid,
  gameOver,
}

export const PlayScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedPlayScreen)
