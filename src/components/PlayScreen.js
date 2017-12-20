import React from 'react'
import { connect } from 'react-redux'
import { Grid } from './Grid'
import { Stats } from './Stats'
import { Screen } from './Screen'
import { MISS, HIT, DURATION } from '../redux/constants'
import { gameOver, updateGrid, swapPlayers } from '../redux/actionCreators'

export const DisconnectedPlayScreen = props => {
  const { opponentGrid } = props

  const handleClick = (cell) => {
    const { state } = cell
    const { opponentId, opponentHitPoints, updateGrid, gameOver, swapPlayers } = props

    if (state === MISS) {
      return
    }

    let nextAction = swapPlayers

    if (state === null) {
      updateGrid(opponentId, cell, MISS)
    } else {
      updateGrid(opponentId, cell, HIT)
      if (opponentHitPoints === 1) { nextAction = gameOver }
    }

    setTimeout(nextAction, DURATION / 2)
  }

  return (
    <Screen>
      <Grid
        grid={opponentGrid}
        handleClick={handleClick}
      />
      <Stats />
    </Screen>
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
  swapPlayers
}

export const PlayScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedPlayScreen)
