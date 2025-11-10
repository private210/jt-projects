"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Alamat",
      content: (
        <>
          Jl. Ontorejo No.32 <br />
          Ponorogo, Jawa Timur 63419
        </>
      ),
    },
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "Telepon",
      content: (
        <>
          +62 812-3456-7890 <br />
          +62 851-2345-6789
        </>
      ),
    },
    {
      icon: <Mail className="w-8 h-8 text-white" />,
      title: "Email",
      content: (
        <>
          info@joyotechid.com <br />
          support@joyotechid.com
        </>
      ),
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Jam Operasional",
      content: (
        <>
          Senin - Minggu <br />
          08.00 - 21.00 WIB
        </>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white min-h-screen">
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">✨ Informasi Kontak ✨</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Jangan ragu untuk menghubungi kami. Tim support kami siap membantu Anda dengan senang hati.</p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-12">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="bg-red-300 w-16 h-16 flex items-center justify-center rounded-full mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Google Maps */}
          <div className="w-full h-100 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.1751210755924!2d111.4661535750877!3d-7.876737692145585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e799f303b1ebb31%3A0xf1869ea0f32a2068!2sJoyo%20Tech!5e0!3m2!1sen!2sid!4v1759633957960!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
