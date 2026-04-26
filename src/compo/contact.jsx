import { motion } from "framer-motion";
import { Phone, Mail, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ important
import logo from "../assets/images-removebg-preview.png";

export default function Contact() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Winner Art"
          className="w-40 h-40 object-contain mx-auto lg:mx-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        {/* Contact */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <h2 className="text-3xl font-extrabold text-orange-500 mb-6">
            Contactez-nous
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <Phone className="text-orange-500 w-5 h-5" /> +213 781 526 266
            </li>

            <li className="flex items-center gap-3">
              <Mail className="text-orange-500 w-5 h-5" /> winner.art.art@gmail.com
            </li>

            <li className="flex items-center gap-3">
              <MessageCircle className="text-green-500 w-5 h-5" /> WhatsApp: +213 781 526 266
            </li>

            {/* 🔥 SOCIAL LINKS FIXÉS */}
            <li className="flex gap-4 mt-4">
              <a 
                href="https://web.facebook.com/ArtsWinners"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <Facebook />
              </a>

              <a 
                href="https://www.instagram.com/ecolewinnerart/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <Instagram />
              </a>
            </li>
          </ul>

          {/* QUICK LINKS */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-orange-500 mb-4">
              Quick Links
            </h3>

            <div className="flex flex-wrap gap-4 text-gray-600">
              
              {/* 🔥 navigation pages */}
              <Link to="/" className="hover:text-orange-500 transition">
                Accueil
              </Link>

              <Link to="/a propos" className="hover:text-orange-500 transition">
                À propos
              </Link>

              <Link to="/noscours" className="hover:text-orange-500 transition">
                Nos cours
              </Link>

              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
