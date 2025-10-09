import { Button } from "@/components/ui/button";

export default function MessageForm() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-semibold mb-4">Kirim Pesan</h2>
      <form className="space-y-4">
        {/* Input otomatis full width di mobile */}
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Nama Lengkap" className="flex-1 border p-2 rounded" />
          <input type="email" placeholder="Email" className="flex-1 border p-2 rounded" />
        </div>
        <input type="text" placeholder="Subjek" className="w-full border p-2 rounded" />
        <textarea placeholder="Pesan" className="w-full border p-2 rounded h-32"></textarea>
        <Button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full md:w-auto">
          Kirim Pesan
        </Button>
      </form>
    </div>
  );
}
