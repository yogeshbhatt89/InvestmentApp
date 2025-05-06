import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterComponent from './features/auth/RegisterComponent'
import LoginComponent from './features/auth/LoginComponent'
import HomePage from './features/HomePage'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginComponent />} />
        {/* needs work */}
      </Routes>
    </Router>
  )
}

export default App
