export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 text-white text-center py-12 mt-20 overflow-hidden">
            <div className="absolute -top-10 left-1/4 w-24 h-24 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-5 right-1/3 w-16 h-16 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-ping-slow"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        IP
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Interview Prep Portal</h3>
                    <p className="text-blue-200 max-w-md mx-auto mb-6">
                        The ultimate platform to prepare for your technical interviews and land your dream job.
                    </p>
                    <div className="flex space-x-4 mb-6">
                        {["Twitter", "LinkedIn", "GitHub"].map((social, index) => (
                            <div
                                key={social}
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300 hover:bg-blue-500 backdrop-blur-sm animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="text-sm font-semibold">{social[0]}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-blue-200 text-sm">
                        © {new Date().getFullYear()} Interview Prep Portal. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Developed by <span className="font-semibold text-gray-700">Abinash Sinha</span> — Fullstack Developer
                    </p>
                </div>
            </div>
        </footer>
    );
}