"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SocialMedia() {
  const socialMediaLinks = [
    { name: "Instagram", link: "https://www.instagram.com/joyotech.id/", Logo: "/assets/Instagram.png" },
    { name: "Facebook", link: "https://www.facebook.com/joyotech.id", Logo: "/assets/Facebook.png" },
    { name: "Tiktok", link: "https://www.tiktok.com/@joyotech.id", Logo: "/assets/Tiktok.png" },
  ];

  return (
    <motion.div className="bg-white shadow-md rounded-lg p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="font-semibold mb-4">Sosial Media Kami</h2>
      <div className="flex gap-4">
        {socialMediaLinks.map((link) => (
          <a key={link.name} href={link.link} target="_blank" rel="noopener noreferrer">
            <Image src={link.Logo} alt={link.name} width={32} height={32} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
