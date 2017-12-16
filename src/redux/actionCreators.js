import {
  SHIPS, SET_SCREEN, SET_GRID, SET_CELL, SET_SHIPS, SET_NAMES, SET_HITPOINTS, REMOVE_HITPOINT,
  SWAP_PLAYERS, RESET_PLAYERS, BOARD, HIT, MISS, SET_DEVICE_TYPE, DESKTOP, MOBILE,
  SCREENS
} from './constants'

const { assign, keys } = Object

const makeEmptyBoard = () => {
  const rows = []
  for (let i = 0; i < BOARD.HEIGHT; i++) {
    const row = []
    rows.push(row)
    for (let j = 0; j < BOARD.WIDTH; j++) {
      row.push(null)
    }
  }
  return rows
}

const setPosition = (ship, position, rotation) => {
  return assign({}, ship, { position, rotation })
}

const shipsToHitPoints = (ships) => {
  return keys(ships).reduce((a, k) => a + ships[k].size, 0)
}

const makeDefaultShips = () => ({
  CARRIER: setPosition(SHIPS.CARRIER, { x: 0, y: 0 }, 0),
  BATTLESHIP: setPosition(SHIPS.BATTLESHIP, { x: 2, y: 2 }, 1),
  CRUISER: setPosition(SHIPS.CRUISER, { x: 4, y: 5 }, 0),
  SUBMARINE: setPosition(SHIPS.SUBMARINE, { x: 6, y: 7 }, 1)
})

const makeBoardFromShips = (ships) => {
  const board = makeEmptyBoard()

  keys(ships).forEach(key => {
    const ship = ships[key]
    const dim = ship.rotation === 0 ? 0 : 1
    let { x, y } = ship.position

    for (let i = 0; i < ship.size; i++) {
      board[y][x] = ship.name
      if (dim === 0) { x++ } else { y++ }
    }
  })

  return board
}

export function startGame() {
  return function(dispatch, getState) {
    dispatch({ type: RESET_PLAYERS })
    dispatch({ type: SET_SHIPS, payload: { 0: SHIPS, 1: SHIPS } })
    dispatch({ type: SET_GRID, payload: { 0: makeEmptyBoard(), 1: makeEmptyBoard() } })
    dispatch({ type: SET_NAMES, payload: { 0: 'PLAYER 1', 1: 'PLAYER 2' }})
    dispatch({ type: SET_HITPOINTS, payload: { 0: shipsToHitPoints(SHIPS), 1: shipsToHitPoints(SHIPS) }})
    dispatch({ type: SET_SCREEN, payload: SCREENS.SETUP })
  }
}

export function startDefaultGame() {
  return function(dispatch, getState) {
    dispatch({ type: RESET_PLAYERS })
    dispatch({ type: SET_SHIPS, payload: { 0: makeDefaultShips(), 1: makeDefaultShips() } })
    dispatch({ type: SET_GRID, payload: { 0: makeBoardFromShips(makeDefaultShips()), 1: makeBoardFromShips(makeDefaultShips()) } })
    dispatch({ type: SET_NAMES, payload: { 0: 'PLAYER 1', 1: 'PLAYER 2' }})
    dispatch({ type: SET_HITPOINTS, payload: { 0: shipsToHitPoints(makeDefaultShips()), 1: shipsToHitPoints(makeDefaultShips()) }})
    dispatch({ type: SET_SCREEN, payload: SCREENS.PLAY })
  }
}

export function updateGrid(playerId, x, y, state, target) {
  return function(dispatch, getState) {
    dispatch({ type: SET_CELL, payload: { id: playerId, x, y, state } })

    if (state === HIT) {
      dispatch({ type: REMOVE_HITPOINT, payload: { id: playerId, target } })
    }

    // dispatch({ type: SWAP_PLAYERS })
  }
}

export function handleResize() {
  return function(dispatch) {
    const width = window.innerWidth
    const deviceType = width < 800 ? MOBILE : DESKTOP
    dispatch({
      type: SET_DEVICE_TYPE,
      payload: deviceType
    })
  }
}

export function gameOver() {
  return ({
    type: SET_SCREEN,
    payload: SCREENS.GAMEOVER
  })
}

export function playAgain() {
  return startDefaultGame()
}

export function titleScreen() {
  return {
    type: SET_SCREEN,
    payload: SCREENS.TITLE
  }
}

export function takeShip() {}
export function dropShip() {}
export function rotateShip() {}
export function endSetup() {}
