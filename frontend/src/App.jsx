import './App.css'
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom'
import LandingPage from './pages/landing.jsx'

function App() {
  return (
   <div className='App'>
      <Router>
        <Routes>
          {/* <Route path="/home" element= /> */}
          <Route path="/" element={<LandingPage />}/>
          <Route path="/auth" element={<Authentication />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
