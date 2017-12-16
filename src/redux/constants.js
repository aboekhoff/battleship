import Aircraft from '../assets/AircraftShape.png'
import Battleship from '../assets/BattleshipShape.png'
import Carrier from '../assets/CarrierShape.png'
import Cruiser from '../assets/CruiserShape.png'
import Submarine from '../assets/SubmarineShape.png'
import Hit from '../assets/Hit.png'
import HitSmall from '../assets/HitSmall.png'
import Miss from '../assets/Miss.png'
import MissSmall from '../assets/MissSmall.png'
import Logo from '../assets/logo.svg'

export const BOARD = {
  WIDTH: 10,
  HEIGHT: 10,
  CELL_SIZE: 70,
  MOBILE_CELL_SIZE: 36
}

export const ASSETS = {
  AIRCRAFT: Aircraft,
  BATTLESHIP: Battleship,
  CARRIER: Carrier,
  CRUISER: Cruiser,
  SUBMARINE: Submarine,
  HIT: Hit,
  HIT_SMALL: HitSmall,
  MISS: Miss,
  MISS_SMALL: MissSmall,
  LOGO: Logo,
}

export const SHIPS = {
  BATTLESHIP: { name: 'BATTLESHIP', size: 4, hitPoints: 4, position: null, rotation: 0 },
  CARRIER: { name: 'CARRIER', size: 5, hitPoints: 5, position: null, rotation: 0 },
  CRUISER: { name: 'CRUISER', size: 3, hitPoints: 3, position: null, rotation: 0 },
  SUBMARINE: { name: 'SUBMARINE', size: 3, hitPoints: 3, position: null, rotation: 0 },
}

export const SCREENS = {
  TITLE: 'TITLE',
  SETUP: 'SETUP',
  PLAY: 'PLAY',
  GAMEOVER: 'GAMEOVER',
}

export const SWAP_PLAYERS = 'SWAP_PLAYERS'
export const RESET_PLAYERS = 'RESET_PLAYERS'
export const SET_SCREEN = 'SET_SCREEN'
export const SET_GRID = 'SET_GRID'
export const SET_CELL = 'SET_CELL'
export const SET_SHIPS = 'SET_SHIPS'
export const SET_NAMES = 'SET_NAMES'
export const UPDATE_SHIPS = 'UPDATE_SHIPS'
export const SET_HITPOINTS = 'SET_HITPOINTS'
export const REMOVE_HITPOINT = 'REMOVE_HITPOINT'
export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE'

export const HIT = 'HIT'
export const MISS = 'MISS'

export const DESKTOP = 'DESKTOP'
export const MOBILE = 'MOBILE'
