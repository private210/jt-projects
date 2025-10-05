"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const productImages = product?.image ? [product.image, product.image, product.image] : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Produk Tidak Ditemukan</h1>
          <p className="text-gray-600">Produk yang Anda cari tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <Image src={productImages[selectedImage] || "/images/product-placeholder.jpg"} alt={product.name} width={500} height={500} className=" object-cover rounded" />
            </div>
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`w-20 h-20 border-2 rounded overflow-hidden ${selectedImage === index ? "border-red-600" : "border-gray-300"}`}>
                  <Image src={image} alt={`${product.name} ${index + 1}`} width={500} height={500} className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(4.0) • 12 Ulasan</span>
            </div>

            <div className="text-3xl font-bold text-red-600 mb-6">{formatPrice(product.price)}</div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Jumlah:</span>
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-gray-600 hover:text-gray-800">
                  -
                </button>
                <span className="px-4 py-1 border-x">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-gray-600 hover:text-gray-800">
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button className="bg-red-600 hover:bg-red-700 flex-1 py-3 text-lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button variant="outline" size="icon" className="w-12">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="w-12">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-4 h-4 mr-2" />
                <span>Gratis ongkir wilayah Ponorogo</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2" />
                <span>Garansi resmi 1 tahun</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 mr-2" />
                <span>Bisa retur dalam 7 hari</span>
              </div>
            </div>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Informasi Tambahan</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Tersedia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stok:</span>
                    <span className="font-medium">15 unit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Deskripsi Produk</h2>
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <h3>Spesifikasi Teknis:</h3>
                <ul>
                  <li>Brand: {product.name.split(" ")[0]}</li>
                  <li>Kategori: {product.category}</li>
                  <li>Kondisi: Baru original</li>
                  <li>Garansi: 1 tahun resmi</li>
                </ul>
                <h3>Fitur Utama:</h3>
                <ul>
                  <li>Kualitas terjamin dan bergaransi</li>
                  <li>Support teknis 24/7</li>
                  <li>Gratis konsultasi produk</li>
                  <li>Bisa COD (Cash on Delivery)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
