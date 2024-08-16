import './App.css'
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom'
import LandingPage from './pages/landing.jsx'
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
   <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            {/* <Route path="/home" element= /> */}
            <Route path="/" element={<LandingPage />}/>
            <Route path="/auth" element={<Authentication />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
