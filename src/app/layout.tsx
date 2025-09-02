import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-60 -left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse-slower"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-20 animate-ping-slow"></div>
        </div>
        <Navbar />
        <main className="container mx-auto p-4 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}