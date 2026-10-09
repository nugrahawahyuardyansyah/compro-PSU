import "./Kontak.css";

export default function Kontak() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Hubungi Kami</h2>
          <p>Silakan hubungi kami untuk mendapatkan informasi lebih lanjut.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Informasi Kontak</h3>

            <div className="contact-item">
              <h4>Alamat</h4>
              <p>
                Jalan Cipinang Muara 1 No. 21 RT.006 / RW.03 <br />
                Kel. Pondok Bambu, Kec. Duren Sawit Jakarta Timur – 13430
              </p>
            </div>

            <div className="contact-item">
              <h4>Informasi Kontak</h4>
              <p>
                <b>Telepon: </b>
                <a href="tel:0218602367">021 – 8602367</a>
              </p>

              <p>
                <b>WhatsApp: </b>
                <a href="https://wa.me/6281908344114" target="_blank" rel="noreferrer">
                  +62 819-0834-4114
                </a>
              </p>

              <p>
                <b>Email: </b>
                <a href="mailto:psuindonesia.info@gmail.com">
                  psuindonesia.info@gmail.com
                </a>
              </p>

              <p>
                <b>Instagram: </b>
                <a
                  href="https://www.instagram.com/penilaistandar.nasional"
                  target="_blank"
                  rel="noreferrer"
                >
                  @penilaistandarnasional
                </a>
              </p>
            </div>

            <div className="contact-item">
              <h4>Jam Kerja</h4>
              <p>
                Senin – Jumat <br />
                08.00 – 16.00 WIB
              </p>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2658698346027!2d106.89303129999999!3d-6.228636600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f343bb14576b%3A0x475a1b2302f2980d!2sPT.%20Penilai%20Standar%20Nasional%20(PSN)!5e0!3m2!1sid!2sid!4v1791116230106!5m2!1sid!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi PT Penilai Standar Uji"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
