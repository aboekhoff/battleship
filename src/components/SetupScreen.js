import React from 'react'
import { connect } from 'react-redux'
import { Grid } from './Grid'
import { Ship } from './Ship'
import { takeShip, dropShip, rotateShip, endSetup } from '../redux/actionCreators'

const { keys } = Object

export class DisconnectedSetupScreen extends React.Component {
  renderShip(ship) {
    if (ship.position != null) { return null }

    return (
      <Ship ship={ship} />
    )
  }

  renderDock(ships) {
    return (
      <div className='dock'>
        {keys(ships).map(key => this.renderShip(ships[key]))}
      </div>
    )
  }

  render() {
    const { grid, ships } = this.props
    return (
      <div className='screen-container'>
        <div className='overlay' />
        <div className='dock'>
        { this.renderDock(ships) }
        </div>
        <Grid grid={grid} ships={ships}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { playerId, grid, ships } = state
  return { grid: grid[playerId], ships: ships[playerId] }
}

const mapDispatchToProps = {
  takeShip, dropShip, rotateShip, endSetup
}

export const SetupScreen = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSetupScreen)
