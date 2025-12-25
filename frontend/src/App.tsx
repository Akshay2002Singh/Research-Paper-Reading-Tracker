import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Library from './pages/Library';
import AddPaper from './pages/AddPaper';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/library" replace />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add-paper" element={<AddPaper />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
