import React from 'react'
import { connect } from 'react-redux'
import { BOARD, ASSETS, HIT, MISS, MOBILE } from '../redux/constants'
import { Ship } from './Ship'

const { keys } = Object

export class DisconnectedGrid extends React.Component {
  handleClick = (cell) => {
    if (this.props.handleClick) {
      this.props.handleClick(cell)
    }
  }

  renderShips(ships) {
    if (ships == null) { return null }

    return keys(ships).map(key => {
      const ship = ships[key]
      return <Ship key={key} ship={ship} />
    })
  }

  renderCell(cell) {
    const { state, x, y } = cell
    const { cellSize, deviceType, grid } = this.props

    const width = cellSize
    const height = cellSize

    const imageWidth = Math.floor(width + width * 0.1)
    const imageHeight = Math.floor(height + height * 0.1)

    const offsetX = Math.floor(width * 0.05)
    const offsetY = Math.floor(height * 0.05)

    const key = grid.length * y + x

    const imageStyle = {
      position: 'absolute',
      width: imageWidth,
      height: imageHeight,
      left: -offsetX,
      top: -offsetY,
      margin: 0,
      padding: 0
    }

    const style = {
      position: 'relative',
      overflow: 'hidden',
      zIndex: 2,
      display: 'inline-block',
      width: width,
      height: height,
      borderRight: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: y === grid.length - 1 ? '1px solid black' : '1px solid white',
      borderLeft: x === 0 ? '1px solid black' : '1px solid white',
      margin: 0,
      padding: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    }

    if (state === HIT) {
      return (
        <div style={style} key={key}>
          <img style={imageStyle} src={deviceType === MOBILE ? ASSETS.HIT_SMALL : ASSETS.HIT} alt={state}/>
        </div>
      )
    } else if (state === MISS) {
      return (
        <div style={style} key={key}>
          <img style={imageStyle} src={deviceType === MOBILE ? ASSETS.MISS_SMALL : ASSETS.MISS} alt={state} />
        </div>
      )
    } else {
      return (
        <div
          key={key}
          style={style}
          className={`cell ${state || 'empty'}`}
          onClick={() => this.handleClick(cell)}
        />
      )
    }
  }

  renderRow(row, key) {
    const { cellSize } = this.props
    const style = {
      margin: 0,
      padding: 0,
      height: cellSize,
    }

    return (
      <div key={key} style={style} className='row'>
        {row.map(data => this.renderCell(data))}
      </div>
    )
  }

  render() {
    const { grid, ships, cellSize } = this.props

    const style = {
      width: cellSize * (BOARD.WIDTH + 1)
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
