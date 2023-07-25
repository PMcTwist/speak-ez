import './App.css';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={Home} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;