import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sejarah from './pages/Sejarah';
import VisiMisi from './pages/VisiMisi';
import Legalitas from './pages/Legalitas';
import Struktur from './pages/Struktur';
import Client from './pages/Client';
import Portofolio from './pages/Portofolio';
import Sertifikasi from './pages/Sertifikasi';
import Artikel from './pages/Artikel';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
 
function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/sejarah" element={<Sejarah />} />
          <Route path="/about/visi-misi" element={<VisiMisi />} />
          <Route path="/about/legalitas" element={<Legalitas />} />
          <Route path="/about/struktur-organisasi" element={<Struktur />} />
          <Route path="/client" element={<Client />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/sertifikasi" element={<Sertifikasi />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
 
export default App;