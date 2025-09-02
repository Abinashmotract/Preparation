"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Interview", href: "/interview" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "py-2 bg-white/90 backdrop-blur-md shadow-md" : "py-4 bg-transparent"}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        IP
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        InterviewPrep
                    </span>
                </Link>

                <div className="hidden md:flex space-x-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-100">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 animate-fade-in ${pathname === item.href
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                : "text-gray-600 hover:text-blue-600"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <button className="md:hidden p-2 rounded-lg bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}