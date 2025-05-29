import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-center py-6 px-4 border-t border-ribello-gold/30 mt-auto">
      <div className="flex justify-center items-center space-x-6 mb-4">
        <a
          href="https://www.instagram.com/ribellobistro/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ribello-gold hover:text-white transition-colors"
        >
          <FaInstagram className="text-2xl" />
        </a>
        <a
          href="https://www.facebook.com/share/15MXKDEPHd/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ribello-gold hover:text-white transition-colors"
        >
          <FaFacebookF className="text-2xl" />
        </a>
        <a
          href="https://www.tiktok.com/@ribello.bistro?_t=ZS-8wlROGP5fxx&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ribello-gold hover:text-white transition-colors"
        >
          <FaTiktok className="text-2xl" />
        </a>
        <a
          href="https://wa.me/573163517627"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ribello-gold hover:text-white transition-colors"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>
      <p className="text-ribello-gold text-sm">
        Contáctanos:{" "}
        <span className="font-semibold">(+57) 316 351 7627</span>
      </p>
    </footer>
  );
}
