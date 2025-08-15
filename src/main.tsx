import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { initializeUserActivityListeners } from './utils/userActivityTracker'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './app/store'
import App from './App'
import theme from './theme'
import './index.css'
import DemoComponent from './demo/DemoComponent'
import LoginComponent from '@/features/auth/LoginComponent'
import RegisterComponent from '@/features/auth/RegisterComponent'
import HomePage from '@/features/HomePage'
import LandingPage from '@/features/LandingPage'

initializeUserActivityListeners()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <LandingPage />, // Add the LandingPage component
        },
        {
          path: 'demo',
          element: <DemoComponent />,
        },
        {
          path: 'login',
          element: <LoginComponent />,
        },
        {
          path: 'register',
          element: <RegisterComponent />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    } as any,
  },
)

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
