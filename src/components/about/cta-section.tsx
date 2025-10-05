import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Hubungi Kami</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Jika Anda memiliki pertanyaan, saran, atau masukan, silakan hubungi kami melalui kontak di bawah ini.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 ml-6">
                        <Button size="lg" className="bg-joyo-red hover:bg-joyo-red/60 hover:text-white">
                            Kontak Kami
                        </Button>
                        <Button size="lg" variant="outline" className="text-joyo-black/40 border-joyo-white">
                            Konsultasikan Dengan Kami
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}