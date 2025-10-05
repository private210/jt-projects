import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion"

export default function ProductCard({ product }) {
  const inStock = product.inStock; // pastikan ini boolean atau jumlah stok

  // Tentukan teks dan kelas warna berdasarkan stok
  const stockText = inStock ? "Tersedia" : "Habis";
  const stockClasses = inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  // Potong description menjadi 8 kata saja
  const shortDescription = product.description ? product.description.split(" ").slice(0, 8).join(" ") + (product.description.split(" ").length > 8 ? "..." : "") : "";

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }} // mulai 50px di bawah
      whileInView={{ y:0, opacity: 2 }} // masuk ke posisi normal
      transition={{ duration: 0.8, ease: "easeOut" }} // durasi lebih smooth
      viewport={{ once: false }}
    >
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <Image className="p-8" src={product.imageUrl} alt={product.name} width={500} height={500} />
        </a>

        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <h4>{product.price}</h4>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{product.rating} ★</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${stockClasses} ml-3`}>{stockText}</span>
          </div>
          <p>{shortDescription}</p>
          <div className="flex items-center justify-between mt-3">
            <Button variant="outline" className="border-joyo-red text-joyo-red hover:bg-joyo-red/10">
              <Link href="#" className="text-sm font-medium text-joyo-red">
                Lihat Produk
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
