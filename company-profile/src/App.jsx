import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
 import LbgSertifProduk from './pages/lbg_sertif_produk';
import LbgPenguji from './pages/lbg_penguji';
import LbgKalibrasi from './pages/lbg_kalibrasi';
import LbgSertifSistem from './pages/lbg_sertif_sistem';
import LbgPelatihan from './pages/lbg_pelatihan';

function App() {
  return (
    <div className="app-layout">
      <ScrollToTop />
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
          <Route path="/layanan/sertifikasi-produk" element={<LbgSertifProduk />} />
          <Route path="/layanan/pengujian" element={<LbgPenguji />} />
          <Route path="/layanan/kalibrasi" element={<LbgKalibrasi />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen" element={<LbgSertifSistem />} />
          <Route path="/layanan/pelatihan" element={<LbgPelatihan />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
 
export default App;