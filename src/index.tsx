import './index.css'

import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import store from './store'
import theme from './theme'

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </React.Fragment>,
  document.querySelector('#root')
)
