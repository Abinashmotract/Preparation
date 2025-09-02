"use client";
import CodeBlock from "./CodeBlock";
import { useState } from "react";

interface Props {
    question: string;
    answer: string;
    code?: string;
}

export default function QuestionCard({ question, answer, code }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            className="p-6 mb-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 relative overflow-hidden group animate-fade-in"
            style={{ animationDelay: `${Math.random() * 0.3}s` }}
        >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-100 rounded-full transform group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            
            <h3 
                className="font-semibold text-lg cursor-pointer flex justify-between items-center relative z-10"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className="text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{question}</span>
                <span className={`text-blue-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </h3>
            
            {isExpanded && (
                <div className="mt-4 animate-slide-down relative z-10">
                    <p className="text-gray-700">{answer}</p>
                    {code && <CodeBlock code={code} />}
                </div>
            )}
        </div>
    );
}