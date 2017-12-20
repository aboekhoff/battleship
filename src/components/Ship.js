import React from 'react'
import { connect } from 'react-redux'
import { ASSETS, BOARD, DESKTOP } from '../redux/constants'
const { assign } = Object

export class DisconnectedShip extends React.Component {
  render() {
    const { ship, deviceType } = this.props
    const { name, size, position, rotation } = ship
    const cellSize = deviceType === DESKTOP ? BOARD.CELL_SIZE : BOARD.MOBILE_CELL_SIZE
    
    const width = cellSize * size + 1
    const height = cellSize

    const style = {
      width,
      height,
      backgroundSize: `${width}px ${height}px`,
      backgroundImage: `url(${ASSETS[name]})`
    }

    if (position) {
      style.transform = `translate(${(position.x + 1) * cellSize}px, ${position.y * cellSize}px)`
      style.position = 'absolute'
      style.left = 0
      style.top = 0
      style.transformOrigin = '0 0'
    }

    if (rotation === 1) {
      style.transform = `translate(${(position.x + 2) * cellSize}px, ${position.y * cellSize}px) rotate(90deg) `
      style.transformOrign = '0 0'
    }

    return (
      <div className='ship' style={style} />
    )
  }
}

const mapStateToProps = state => ({ deviceType: state.deviceType })

export const Ship = connect(mapStateToProps)(DisconnectedShip)
