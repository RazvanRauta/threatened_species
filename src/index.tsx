import './index.css'

import store, { persistor } from './store'

import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.Fragment>,
  document.querySelector('#root')
)
