import React from 'react'
import { ASSETS, BOARD } from '../redux/constants'
const { assign } = Object

export class Ship extends React.Component {
  render() {
    const { name, size, position, rotation } = this.props.ship
    const style = {
      zIndex: 1,
      width: BOARD.CELL_SIZE * size,
      height: BOARD.CELL_SIZE / 4 * 3,
    }

    if (position) {
      style.position = 'absolute'
      style.left = position.x * BOARD.CELL_SIZE + (BOARD.CELL_SIZE / 2)
      style.top = position.y * BOARD.CELL_SIZE + (BOARD.CELL_SIZE / 8)
    }

    if (rotation === 1) {
      style.transformOrigin = 'top left'
      style.transform = 'rotate(90deg)'
    }

    return (
      <img className='ship' src={ASSETS[name]} style={style} />
    )
  }
}
