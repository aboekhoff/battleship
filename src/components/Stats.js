import React from 'react'
import { connect } from 'react-redux'
import { ASSETS, SCREENS, BOARD, MOBILE } from '../redux/constants'

const { keys } = Object

export class DisconnectedStats extends React.Component {
  renderSection(id) {
    const { activeId, ships, names, hitPoints } = this.props
    const active = activeId === id

    const shipStyle = {
      width: 128,
      height: 32,
    }

    const shipStats = keys(ships[id]).map(key => {
      const data = ships[id][key]
      return (
        <div className='ship-status'>
          <img style={shipStyle} src={ASSETS[data.name]} />
          {data.hitPoints}
        </div>
      )
    })

    const pos = id === 0 ? 'left' : 'right'

    return (
      <div className={`section ${pos} ${active ? 'active' : ''}`}>
        <div>{names[id]}</div>
        {shipStats}
      </div>
    )
  }

  render() {
    const { deviceType } = this.props
    // const cellSize = deviceType === MOBILE ? BOARD.MOBILE_CELL_SIZE : BOARD.CELL_SIZE
    // const style = { width: cellSize * (BOARD.WIDTH + 1) }
    const className = 'stats'

    return (
      <div className={className}>
        {this.renderSection(0)}
        {this.renderSection(1)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    playerId, opponentId, ships, names, hitPoints, screen, deviceType
  } = state

  const activeId = screen === SCREENS.PLAY ? 0 : 1

  return {
    playerId,
    opponentId,
    names,
    ships,
    hitPoints,
    activeId,
    deviceType: deviceType.toLowerCase()
  }
}

export const Stats = connect(mapStateToProps)(DisconnectedStats)
