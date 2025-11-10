"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface ContactData {
  email?: string;
  nomor_wa?: string;
  alamat?: string;
  jam_operasional?: string;
}

export default function ContactInfo() {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        setContact(data);
      } catch (error) {
        console.error("Error loading contact:", error);
      } 
    }

    fetchContact();
  }, []);



  const infoItems = [
    { icon: <MapPin className="w-4 h-4 text-red-600" />, label: "Alamat", value: contact?.alamat },
    { icon: <Clock className="w-4 h-4 text-red-600" />, label: "Jam Operasional", value: contact?.jam_operasional },
    { icon: <Mail className="w-4 h-4 text-red-600" />, label: "Email", value: contact?.email },
    { icon: <Phone className="w-4 h-4 text-red-600" />, label: "Telepon / WhatsApp", value: contact?.nomor_wa },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-semibold mb-4 text-lg text-gray-800">Informasi Kontak</h2>
      <ul className="space-y-3 text-sm">
        {infoItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="flex items-center w-48 min-w-[150px] font-medium text-gray-700">
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}:
              </span>
            </div>
            <span className="text-gray-600 warp-break-words">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
