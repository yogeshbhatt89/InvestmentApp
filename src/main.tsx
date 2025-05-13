import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider } from '@mui/material/styles'
import { initializeUserActivityListeners } from './utils/userActivityTracker'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './app/store'
import App from './App'
import theme from './theme'
import './index.css'
import DemoComponent from './features/DemoComponent'

initializeUserActivityListeners()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <DemoComponent />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  } as any // Type assertion needed until React Router v7 types are updated
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider future={{ v7_startTransition: true }} router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
)
