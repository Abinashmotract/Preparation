"use client";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function CodeBlock({ code }: { code: string }) {
    const [isCopied, setIsCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
        setIsVisible(true);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className={`mt-4 rounded-xl overflow-hidden shadow-md transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-xs text-gray-300">
                <span>Code Example</span>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
                >
                    {isCopied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 bg-gray-900 text-white text-sm overflow-x-auto">
                <code className="language-js">{code}</code>
            </pre>
        </div>
    );
}