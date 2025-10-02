import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolios" element={<Portfolio />} />
        </Routes>
      </div>
    </div>
  )
}

export default App