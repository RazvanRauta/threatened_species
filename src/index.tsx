import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import App from './App'
import theme from './theme'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'

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
