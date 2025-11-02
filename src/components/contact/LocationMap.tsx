"use client";

import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button"
import { MapPin } from "lucide-react";
import Link from "next/link";

interface ContactData {
  maps_link?: string;
}

export default function LocationMap() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        setContact(data);
      } catch (error) {
        console.error("Error loading contact:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-semibold mb-4">Lokasi Kami</h2>
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
        {contact?.maps_link ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.175121000638!2d111.4687285!3d-7.8767377000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e799f303b1ebb31%3A0xf1869ea0f32a2068!2sJoyo%20Tech!5e0!3m2!1sen!2sid!4v1761709544044!5m2!1sen!2sid"
            width="600"
            height="450"
            style={{ border: 0, width: "100%", height: "100%" }}
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div>
        <Button className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-joyo-red/50 hover:text-joyo-white mt-4 w-full">
          <MapPin className="w-8 h-8" />
          <Link href={contact?.maps_link ?? '#'} target="_blank" rel="noopener noreferrer">
            Lihat Lokasi
          </Link>
        </Button>
      </div>
    </div>
  );
}
