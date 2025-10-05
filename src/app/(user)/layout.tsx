import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Navbar/>
        {children}
        <Footer/>
        </main>
    </div>
  );
}
