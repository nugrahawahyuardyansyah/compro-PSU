import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import WaFloat from './components/WaFloat';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Struktur from './pages/Struktur';
import Client from './pages/Client';
import Portofolio from './pages/Portofolio';
import Sertifikasi from './pages/Sertifikasi';
import Artikel from './pages/Artikel';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
import KalibrasiAlatKesehatan from './pages/layanan/kalibrasi/Alat_kesehatan_kalibrasi';
import ProductLegalitas from './pages/layanan/sertifikasi-produk/Legalitas_sertif';
import ProductScope from './pages/layanan/sertifikasi-produk/Ruang_lingkup_sertif';
import ProductApplication from './pages/layanan/sertifikasi-produk/Permohonan_sertifikasi';
import ProductType1B from './pages/layanan/sertifikasi-produk/Tipe_1B';
import ProductType5 from './pages/layanan/sertifikasi-produk/Tipe_5';
import ProductSniRules from './pages/layanan/sertifikasi-produk/Ketentuan_penggunaan_SNI';
import ProductComplaints from './pages/layanan/sertifikasi-produk/Keluhan_banding_sertif';
import ProductClientRights from './pages/layanan/sertifikasi-produk/Hak_kewajiban_klien_sertif';
import ProductFees from './pages/layanan/sertifikasi-produk/Biaya_penawaran_sertif';
import TestingLegalitas from './pages/layanan/pengujian/Legalitas_penguji';
import TestingScope from './pages/layanan/pengujian/Ruang_lingkup_penguji';
import TestingProcess from './pages/layanan/pengujian/Proses_penguji';
import TestingFees from './pages/layanan/pengujian/Biaya_penawaran_penguji';
import CalibrationLegalitas from './pages/layanan/kalibrasi/Legalitas_kalibrasi';
import CalibrationScope from './pages/layanan/kalibrasi/Ruang_lingkup_kalibrasi';
import CalibrationFees from './pages/layanan/kalibrasi/Biaya_penawaran_kalibrasi';
import ManagementLegalitas from './pages/layanan/sertifikasi-sistem-manajemen/Legalitas_sertif_sistem';
import ManagementScope from './pages/layanan/sertifikasi-sistem-manajemen/Ruang_lingkup_sertif_sistem';
import ManagementProcess from './pages/layanan/sertifikasi-sistem-manajemen/Proses_sertif_sistem';
import ManagementComplaints from './pages/layanan/sertifikasi-sistem-manajemen/Keluhan_banding_sertif_sistem';
import ManagementClientRights from './pages/layanan/sertifikasi-sistem-manajemen/Hak_kewajiban_klien_sertif_sistem';
import ManagementFees from './pages/layanan/sertifikasi-sistem-manajemen/Biaya_penawaran_sertif_sistem';
import GeneralTraining from './pages/layanan/pelatihan/General_training';
import InhouseTraining from './pages/layanan/pelatihan/Inhouse_training';

function App() {
  return (
    <LanguageProvider>
      <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/profile" element={<Profile />} />
          <Route path="/about/struktur-organisasi" element={<Struktur />} />
          <Route path="/client" element={<Client />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/sertifikasi" element={<Sertifikasi />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/login" element={<Login />} />
          <Route path="/layanan/sertifikasi-produk/legalitas" element={<ProductLegalitas />} />
          <Route path="/layanan/sertifikasi-produk/ruang-lingkup" element={<ProductScope />} />
          <Route path="/layanan/sertifikasi-produk/permohonan-sertifikasi" element={<ProductApplication />} />
          <Route path="/layanan/sertifikasi-produk/tipe-1b" element={<ProductType1B />} />
          <Route path="/layanan/sertifikasi-produk/tipe-5" element={<ProductType5 />} />
          <Route path="/layanan/sertifikasi-produk/ketentuan-penggunaan-sni" element={<ProductSniRules />} />
          <Route path="/layanan/sertifikasi-produk/keluhan-banding" element={<ProductComplaints />} />
          <Route path="/layanan/sertifikasi-produk/hak-kewajiban-klien" element={<ProductClientRights />} />
          <Route path="/layanan/sertifikasi-produk/biaya-penawaran" element={<ProductFees />} />
          <Route path="/layanan/pengujian/legalitas" element={<TestingLegalitas />} />
          <Route path="/layanan/pengujian/ruang-lingkup" element={<TestingScope />} />
          <Route path="/layanan/kalibrasi/ruang-lingkup/alat-kesehatan" element={<KalibrasiAlatKesehatan />} />
          <Route path="/layanan/pengujian/proses-pengujian" element={<TestingProcess />} />
          <Route path="/layanan/pengujian/biaya-penawaran" element={<TestingFees />} />
          <Route path="/layanan/kalibrasi/legalitas" element={<CalibrationLegalitas />} />
          <Route path="/layanan/kalibrasi/ruang-lingkup" element={<CalibrationScope />} />
          <Route path="/layanan/kalibrasi/biaya-penawaran" element={<CalibrationFees />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen/legalitas" element={<ManagementLegalitas />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen/ruang-lingkup" element={<ManagementScope />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen/proses-sertifikasi" element={<ManagementProcess />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen/keluhan-banding" element={<ManagementComplaints />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen/hak-kewajiban-klien" element={<ManagementClientRights />} />
          <Route path="/layanan/sertifikasi-sistem-manajemen/biaya-penawaran" element={<ManagementFees />} />
          <Route path="/layanan/pelatihan/general-training" element={<GeneralTraining />} />
          <Route path="/layanan/pelatihan/inhouse-training" element={<InhouseTraining />} />
        </Routes>
      </main>
      <WaFloat />
      <Footer />
      </div>
    </LanguageProvider>
  );
}
 
export default App;