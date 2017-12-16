import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import './styles/index.css'
import { App } from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { reducers } from './redux/reducers'
import { handleResize } from './redux/actionCreators'

const store = createStore(reducers, applyMiddleware(ReduxThunk, Logger))

window.addEventListener('resize', () => {
  store.dispatch(handleResize())
})

store.dispatch(handleResize())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
