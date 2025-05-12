import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import RegisterComponent from './features/auth/RegisterComponent'
// import LoginComponent from './features/auth/LoginComponent'
// import HomePage from './features/HomePage'
// import LandingPage from './features/LandingPage';
import DemoComponent from './features/DemoComponent';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/demo" element={<DemoComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/home" element={<HomePage />} /> */}
        <Route path="/" element={<DemoComponent />} />
        {/* needs work */}
      </Routes>
    </Router>
  )
}

export default App
