import React from 'react'
import { connect } from 'react-redux'
import { ASSETS, BOARD, DESKTOP } from '../redux/constants'

export class DisconnectedShip extends React.Component {
  render() {
    const { ship, deviceType } = this.props
    const { name, size, position, rotation } = ship
    const cellSize = deviceType === DESKTOP ? BOARD.CELL_SIZE : BOARD.MOBILE_CELL_SIZE
    
    const width = cellSize * size + 1
    const height = cellSize

    const xshift = deviceType === DESKTOP ? 1 : 0.9

    const style = {
      width,
      height,
      backgroundSize: `${width}px ${height}px`,
      backgroundImage: `url(${ASSETS[name]})`
    }

    if (position) {
      style.position = 'absolute'
      style.left = 0
      style.top = 0
      style.transformOrigin = 'top left'

      if (rotation === 0) {
        style.transform = `translate(${(position.x + 1) * cellSize}px, ${position.y * cellSize}px)`
      }

      if (rotation === 1) {
        style.transform = `translate(${(position.x + 1.5) * cellSize * xshift}px, ${position.y * cellSize}px) rotate(90deg) `
      }
    }

    return (
      <div className='ship' style={style} />
    )
  }
}

const mapStateToProps = state => ({ deviceType: state.deviceType })

export const Ship = connect(mapStateToProps)(DisconnectedShip)
