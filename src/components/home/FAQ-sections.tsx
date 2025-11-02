'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
  isActive: boolean;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch("/api/faq");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (faqs.length === 0) {
    return null; // Don't show section if no FAQs
  }

  return (
    <section className="py-20 bg-gray-200">
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan yang Sering Ditanyakan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Temukan jawaban untuk pertanyaan yang paling sering diajukan tentang produk dan layanan kami</p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-5 text-left flex justify-between items-center gap-4">
                  <span className="font-semibold text-gray-900 flex-1">{faq.pertanyaan}</span>
                  <div className="flex-shrink-0">{openIndex === index ? <ChevronUp className="w-5 h-5 text-red-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}</div>
                </button>

                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-5">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.jawaban}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
