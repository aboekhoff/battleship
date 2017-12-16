import React from 'react'
import { connect } from 'react-redux'
import { BOARD, ASSETS, HIT, MISS, MOBILE } from '../redux/constants'
import { Ship } from './Ship'

const { keys } = Object

export class DisconnectedGrid extends React.Component {
  handleMouseEnter = (x, y, state) => {
    if (this.props.handleMouseEnter) {
      this.props.handleMouseEnter(x, y, state)
    }
  }

  handleClick = (x, y, target) => {
    if (this.props.handleClick) {
      this.props.handleClick(x, y, target)
    }
  }

  renderShips(ships) {
    if (ships == null) { return null }

    return keys(ships).map(key => {
      const ship = ships[key]
      return <Ship ship={ship} />
    })
  }

  renderCell(state, rowIndex, colIndex) {
    const { cellSize, deviceType, grid } = this.props

    const width = cellSize
    const height = cellSize

    const style = {
      zIndex: 2,
      display: 'inline-block',
      width: width,
      height: height,
      borderRight: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: rowIndex === grid.length - 1 ? '1px solid black' : '1px solid white',
      borderLeft: colIndex === 0 ? '1px solid black' : '1px solid white',
      margin: 0,
      padding: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    }

    if (state === HIT) {
      return (
        <img style={style} src={deviceType === MOBILE ? ASSETS.HIT_SMALL : ASSETS.HIT} />
      )
    } else if (state === MISS) {
      return (
        <img style={style} src={deviceType === MOBILE ? ASSETS.MISS_SMALL : ASSETS.MISS} />
      )
    } else {
      return (
        <div
          style={style}
          className={`cell ${state || 'empty'}`}
          handleMouseEnter={() => this.handleMouseEnter(colIndex, rowIndex, state)}
          onClick={() => this.handleClick(colIndex, rowIndex, state)}
        />
      )
    }
  }

  renderRow(row, rowIndex) {
    const { cellSize } = this.props
    const style = {
      margin: 0,
      padding: 0,
      height: cellSize,
    }

    return (
      <div style={style} className='row'>
        {row.map((state, colIndex) => this.renderCell(state, rowIndex, colIndex))}
      </div>
    )
  }

  render() {
    const { grid, ships, cellSize } = this.props

    const style = {
      width: cellSize * (BOARD.WIDTH + 1),
      margin: '0 auto',
      position: 'relative',
      marginTop: 8,
    }

    return (
      <div style={style} className='grid'>
        {this.renderShips(ships)}
        {grid.map((row, rowIndex) => this.renderRow(row, rowIndex))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    deviceType: state.deviceType,
    cellSize: state.deviceType === MOBILE ? BOARD.MOBILE_CELL_SIZE : BOARD.CELL_SIZE
  }
}

export const Grid = connect(mapStateToProps)(DisconnectedGrid)
