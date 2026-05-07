import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CollegeDetail from './pages/CollegeDetail';
import Compare from './pages/Compare';
import Saved from './pages/Saved';
import Predictor from './pages/Predictor';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/college/:id" element={<CollegeDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/predictor" element={<Predictor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
