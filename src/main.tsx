import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { initializeUserActivityListeners } from './utils/userActivityTracker'
import store from './app/store'
import App from './App'
import theme from './theme'

initializeUserActivityListeners()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
)
