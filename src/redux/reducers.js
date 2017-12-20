import { combineReducers } from 'redux'
import {
  SWAP_PLAYERS, RESET_PLAYERS, SET_SCREEN, SET_GRID, SET_CELL, SET_SHIPS, UPDATE_SHIPS, SCREENS,
  SET_NAMES, SET_HITPOINTS, REMOVE_HITPOINT, SET_DEVICE_TYPE, DESKTOP, STATUS, SHOW_MODAL, CLOSE_MODAL
} from './constants'

const { assign, keys } = Object

export const reducers = combineReducers({
  playerId(state = 0, { type, payload }) {
    switch(type) {
      case RESET_PLAYERS:
        return 0
      default:
        return state
    }
  },

  opponentId(state = 1, { type, payload }) {
    switch(type) {
      case RESET_PLAYERS:
        return 1
      default:
        return state
    }
  },

  names(state = { 0: 'PLAYER 1', 1: 'PLAYER 2' }, { type, payload }) {
    switch(type) {
      case SET_NAMES:
        return payload
      default:
        return state
    }
  },

  hitPoints(state = { 0: 0, 1: 0 }, { type, payload }) {
    switch(type) {
      case SET_HITPOINTS:
        return payload
      case REMOVE_HITPOINT:
        const { id } = payload
        const total = state[id]
        return assign({}, state, { [id]: total - 1 })
      default:
        return state
    }
  },

  screen(state = SCREENS.TITLE, { type, payload }) {
    switch(type) {
      case SET_SCREEN:
        return payload
      default:
        return state
    }
  },

  status(state = STATUS[SCREENS.TITLE], { type, payload }) {
    switch(type) {
      case SET_SCREEN:
        return STATUS[payload]
      default:
        return state
    }
  },

  grid(state = { 0: {}, 1: {} }, { type, payload }) {
    switch(type) {
      case SET_GRID:
        return payload
      case SET_CELL:
        const { id, x, y, nextState } = payload
        const grid = state[id].slice()
        const row = grid[y].slice()
        row[x].state = nextState
        grid[y] = row
        return assign({}, state, { [id]: grid })
      default:
        return state
    }
  },

  ships(state = { 0: {}, 1: {} }, { type, payload }) {
    switch(type) {
      case SET_SHIPS:
        return payload
      case UPDATE_SHIPS:
        return assign({}, state, payload)
      case REMOVE_HITPOINT:
        const { id, state: target } = payload
        const ship = state[id][target]
        const newShip = { ...ship, hitPoints: ship.hitPoints - 1 }
        return {
          ...state, [id]: { ...state[id], [target]: newShip }
        }
      default:
        return state
    }
  },

  deviceType(state = DESKTOP, { type, payload }) {
    switch(type) {
      case SET_DEVICE_TYPE:
        return payload
      default:
        return state
    }
  },

  modalContent(state = null, { type, payload }) {
    switch(type) {
      case SHOW_MODAL:
        return payload
      case CLOSE_MODAL:
        return null
      case SET_SCREEN:
        return null
      default:
        return state 
    }
  } 
})
