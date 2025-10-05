export default function AboutSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Tentang Kami</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Joyo Tech ID adalah perusahaan teknologi yang berfokus pada penyediaan solusi elektronik dan jasa teknologi berkualitas tinggi. Kami berdedikasi untuk memberikan produk terbaik dengan harga yang kompetitif, serta layanan pelanggan yang unggul.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-2">Visi Kami</h3>
                            <p className="text-gray-600">
                                Menjadi penyedia solusi teknologi terkemuka yang diandalkan oleh pelanggan di seluruh Indonesia.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-2">Misi Kami</h3>
                            <p className="text-gray-600">
                                Menyediakan produk elektronik berkualitas tinggi dan layanan teknologi yang inovatif untuk memenuhi kebutuhan pelanggan kami.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-2">Nilai Kami</h3>
                            <p className="text-gray-600">
                                Integritas, inovasi, dan komitmen terhadap kepuasan pelanggan adalah inti dari setiap tindakan kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}