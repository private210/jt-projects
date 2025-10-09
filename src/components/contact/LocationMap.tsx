export default function LocationMap() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-semibold mb-4">Lokasi Kami</h2>
      <div className="w-full aspect-video rounded-lg overflow-hidden">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!..." className="w-full h-full border-0" allowFullScreen loading="lazy"></iframe>
      </div>
    </div>
  );
}
