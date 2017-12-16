import React from 'react'
import { connect } from 'react-redux'
import { ASSETS } from '../redux/constants'

const { keys } = Object

export class DisconnectedStats extends React.Component {
  renderSection(id) {
    const { playerId, ships, names, hitPoints } = this.props
    const active = playerId === id

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

    return (
      <div className={`section ${active ? 'active' : ''}`}>
        <div>{names[id]}</div>
        {shipStats}
      </div>
    )
  }

  render() {
    return (
      <div className="stats">
        {this.renderSection(0)}
        {this.renderSection(1)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    playerId, opponentId, ships, names, hitPoints
  } = state

  return {
    playerId,
    opponentId,
    names,
    ships,
    hitPoints
  }
}

export const Stats = connect(mapStateToProps)(DisconnectedStats)
