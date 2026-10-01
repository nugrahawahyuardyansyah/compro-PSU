import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Struktural from './pages/Struktural';
import Mitra from './pages/Mitra';
import Sertifikasi from './pages/Sertifikasi';
import Artikel from './pages/Artikel';
import Kontak from './pages/Kontak';
 
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang-kami/profile" element={<Profile />} />
          <Route path="/tentang-kami/struktural" element={<Struktural />} />
          <Route path="/mitra" element={<Mitra />} />
          <Route path="/sertifikasi" element={<Sertifikasi />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </main>
    </>
  );
}
 
export default App;