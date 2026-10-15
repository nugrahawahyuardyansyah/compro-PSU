import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import WaFloat from './components/WaFloat';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Struktur from './pages/Struktur';
import Client from './pages/Client';
import ClientProductCertification from './pages/client/ClientProductCertification';
import ClientTesting from './pages/client/ClientTesting';
import ClientCalibration from './pages/client/ClientCalibration';
import ClientManagementSystemCertification from './pages/client/ClientManagementSystemCertification';
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
import CalibrationFees from './pages/layanan/kalibrasi/Biaya_penawaran_kalibrasi';
import ManagementLegalitas from './pages/layanan/sertifikasi-sistem-manajemen/Legalitas_sertif_sistem';
import ManagementScope from './pages/layanan/sertifikasi-sistem-manajemen/Ruang_lingkup_sertif_sistem';
import ManagementProcess from './pages/layanan/sertifikasi-sistem-manajemen/Proses_sertif_sistem';
import ManagementComplaints from './pages/layanan/sertifikasi-sistem-manajemen/Keluhan_banding_sertif_sistem';
import ManagementClientRights from './pages/layanan/sertifikasi-sistem-manajemen/Hak_kewajiban_klien_sertif_sistem';
import ManagementFees from './pages/layanan/sertifikasi-sistem-manajemen/Biaya_penawaran_sertif_sistem';
import GeneralTraining from './pages/layanan/pelatihan/General_training';
import InhouseTraining from './pages/layanan/pelatihan/Inhouse_training';
import ExhouseTraining from './pages/layanan/pelatihan/Exhouse_training';
import Pertanian from './pages/sectors/Pertanian';
import Tanaman from './pages/sectors/Tanaman';
import Pangan from './pages/sectors/Pangan';
import Kimia from './pages/sectors/Kimia';
import JasaLainnya from './pages/sectors/JasaLainnya';

function App() {
  return (
    <LanguageProvider>
      <div className="app-layout">
        <ScrollToTop />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pertanian" element={<Pertanian />} />
            <Route path="/tanaman" element={<Tanaman />} />
            <Route path="/pangan" element={<Pangan />} />
            <Route path="/kimia" element={<Kimia />} />
            <Route path="/jasa-lainnya" element={<JasaLainnya />} />

            {/* Tentang Kami */}
            <Route path="/about" element={<Navigate to="/about/profile" replace />} />
            <Route path="/about/profile" element={<Profile />} />
            <Route path="/about/struktur-organisasi" element={<Struktur />} />

            {/* Client */}
            <Route path="/client" element={<Client />} />
            <Route path="/client/sertifikasi-produk" element={<ClientProductCertification />} />
            <Route path="/client/pengujian" element={<ClientTesting />} />
            <Route path="/client/kalibrasi" element={<ClientCalibration />} />
            <Route path="/client/sertifikasi-sistem-manajemen" element={<ClientManagementSystemCertification />} />

            {/* Halaman Umum */}
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/login" element={<Login />} />

            {/* Induk Layanan (Redirect ke sub halaman pertama agar link breadcrumb selalu aktif) */}
            <Route path="/layanan" element={<Navigate to="/layanan/sertif-produk/legalitas" replace />} />
            <Route path="/layanan/sertif-produk" element={<Navigate to="/layanan/sertif-produk/legalitas" replace />} />
            <Route path="/layanan/sertif-produk/proses" element={<Navigate to="/layanan/sertif-produk/tipe-1b" replace />} />
            <Route path="/layanan/penguji" element={<Navigate to="/layanan/penguji/legalitas" replace />} />
            <Route path="/layanan/kalibrasi" element={<Navigate to="/layanan/kalibrasi/legalitas" replace />} />
            <Route path="/layanan/kalibrasi/ruang-lingkup" element={<Navigate to="/layanan/kalibrasi/ruang-lingkup/alat-kesehatan" replace />} />
            <Route path="/layanan/sertif-manajemen" element={<Navigate to="/layanan/sertif-manajemen/legalitas" replace />} />
            <Route path="/layanan/pelatihan" element={<Navigate to="/layanan/pelatihan/general-training" replace />} />

            {/* Sub Halaman Layanan */}
            <Route path="/layanan/sertif-produk/legalitas" element={<ProductLegalitas />} />
            <Route path="/layanan/sertif-produk/ruang-lingkup" element={<ProductScope />} />
            <Route path="/layanan/sertif-produk/permohonan-sertifikasi" element={<ProductApplication />} />
            <Route path="/layanan/sertif-produk/tipe-1b" element={<ProductType1B />} />
            <Route path="/layanan/sertif-produk/tipe-5" element={<ProductType5 />} />
            <Route path="/layanan/sertif-produk/penggunaan-sni" element={<ProductSniRules />} />
            <Route path="/layanan/sertif-produk/keluhan-banding" element={<ProductComplaints />} />
            <Route path="/layanan/sertif-produk/hak-kewajiban-klien" element={<ProductClientRights />} />
            <Route path="/layanan/sertif-produk/biaya-sertif" element={<ProductFees />} />
            <Route path="/layanan/penguji/legalitas" element={<TestingLegalitas />} />
            <Route path="/layanan/penguji/ruang-lingkup" element={<TestingScope />} />
            <Route path="/layanan/kalibrasi/ruang-lingkup/alat-kesehatan" element={<KalibrasiAlatKesehatan />} />
            <Route path="/layanan/penguji/proses-pengujian" element={<TestingProcess />} />
            <Route path="/layanan/penguji/biaya-sertif" element={<TestingFees />} />
            <Route path="/layanan/kalibrasi/legalitas" element={<CalibrationLegalitas />} />
            <Route path="/layanan/kalibrasi/biaya-sertif" element={<CalibrationFees />} />
            <Route path="/layanan/sertif-manajemen/legalitas" element={<ManagementLegalitas />} />
            <Route path="/layanan/sertif-manajemen/ruang-lingkup" element={<ManagementScope />} />
            <Route path="/layanan/sertif-manajemen/proses-sertifikasi" element={<ManagementProcess />} />
            <Route path="/layanan/sertif-manajemen/keluhan-banding" element={<ManagementComplaints />} />
            <Route path="/layanan/sertif-manajemen/hak-kewajiban-klien" element={<ManagementClientRights />} />
            <Route path="/layanan/sertif-manajemen/biaya-sertif" element={<ManagementFees />} />
            <Route path="/layanan/pelatihan/general-training" element={<GeneralTraining />} />
            <Route path="/layanan/pelatihan/inhouse-training" element={<InhouseTraining />} />
            <Route path="/layanan/pelatihan/exhouse-training" element={<ExhouseTraining />} />
          </Routes>
        </main>
        <WaFloat />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
