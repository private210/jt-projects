"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ContactData {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  whatsapp?: string;
}

interface MarketplaceData {
  tokopedia?: string;
  shopee?: string;
  tiktokshop?: string;
}

export default function SocialMedia() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [marketplace, setMarketplace] = useState<MarketplaceData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactRes, marketplaceRes] = await Promise.all([fetch("/api/contacts"), fetch("/api/marketplaces")]);

        const contactData = await contactRes.json();
        const marketplaceData = await marketplaceRes.json();

        setContact(contactData);
        setMarketplace(marketplaceData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    fetchData();
  }, []);

  const socialMediaLinks = [
    {
      name: "Instagram",
      link: contact?.instagram,
      logo: "/assets/Instagram.png",
      bg: "from-pink-500 via-red-500 to-yellow-500", // gradient khas Instagram
    },
    {
      name: "Facebook",
      link: contact?.facebook,
      logo: "/assets/Facebook.png",
      bg: "bg-[#1877F2]",
    },
    {
      name: "TikTok",
      link: contact?.tiktok,
      logo: "/assets/Tiktok.png",
      bg: "bg-[#010101]",
    },
    {
      name: "Whatsapp",
      link: contact?.whatsapp,
      logo: "/assets/Whatsapp.png",
      bg: "bg-[#25D366]",
    },
    {
      name: "YouTube",
      link: contact?.youtube,
      logo: "/assets/Youtube.png",
      bg: "bg-[#FF0000]",
    },
  ].filter((item) => item.link);

  const marketplaceLinks = [
    {
      name: "Tokopedia",
      link: marketplace?.tokopedia,
      logo: "/assets/tokped.png",
      bg: "bg-[#03AC0E]",
    },
    {
      name: "Shopee",
      link: marketplace?.shopee,
      logo: "/assets/Shopee.png",
      bg: "bg-[#EE4D2D]",
    },
    {
      name: "TikTok Shop",
      link: marketplace?.tiktokshop,
      logo: "/assets/tiktokshop.png",
      bg: "bg-[#000000]",
    },
  ].filter((item) => item.link);

  return (
    <motion.div className="bg-white shadow-md rounded-lg p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {socialMediaLinks.length > 0 && (
        <>
          <h2 className="font-semibold mb-4">Sosial Media Kami</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {socialMediaLinks.map((link) => (
              <a key={link.name} href={link.link} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${link.bg} hover:scale-105 transition-transform shadow-md`}>
                <Image src={link.logo} alt={link.name} width={24} height={24} className="invert brightness-0 saturate-200" />
              </a>
            ))}
          </div>
        </>
      )}

      {marketplaceLinks.length > 0 && (
        <>
          <h2 className="font-semibold mb-4">Marketplace Kami</h2>
          <div className="flex flex-wrap gap-4">
            {marketplaceLinks.map((link) => (
              <a key={link.name} href={link.link} target="_blank" rel="noopener noreferrer" className={`w-16 h-16 rounded-full flex items-center justify-center ${link.bg} hover:scale-105 transition-transform shadow-md`}>
                <Image src={link.logo} alt={link.name} width={50} height={50} className="invert brightness-0 saturate-200" /> 
              </a>
            ))}
          </div>
        </>
      )}

    </motion.div>
  );
}
