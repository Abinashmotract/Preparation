"use client";
import CodeBlock from "./CodeBlock";
import { useState, useEffect } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/auth";
import { Difficulty } from "@/types/question";

interface Props {
    id: number;
    question: string;
    answer: string;
    code?: string;
    difficulty: Difficulty;
    category: string;
    topic?: string;
    tags?: string[];
    source?: string;
    sourceUrl?: string;
}

export default function QuestionCard({ id, question, answer, code, difficulty, category, topic, tags, source, sourceUrl }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        setBookmarked(isBookmarked(id));
    }, [id]);

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleBookmark(id);
        setBookmarked(!bookmarked);
    };

    const getDifficultyColor = () => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-100 text-green-700 border-green-300";
            case "Intermediate":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "Advanced":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <div 
            className="p-6 mb-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 relative overflow-hidden group animate-fade-in"
            style={{ animationDelay: `${Math.random() * 0.3}s` }}
        >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-100 rounded-full transform group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            
            <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor()}`}>
                            {difficulty}
                        </span>
                        {topic && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {topic}
                            </span>
                        )}
                    </div>
                    <h3 
                        className="font-semibold text-lg cursor-pointer text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {question}
                    </h3>
                </div>
                <div className="flex items-center gap-2 ml-4">
                    <button
                        onClick={handleBookmark}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        title={bookmarked ? "Remove bookmark" : "Bookmark"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${bookmarked ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                    </button>
                    <span 
                        className={`text-blue-500 transform transition-transform duration-300 cursor-pointer ${isExpanded ? 'rotate-180' : ''}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>

            {source && (
                <div className="mb-3 relative z-10">
                    <span className="text-xs text-gray-500">
                        Source:{" "}
                        {sourceUrl ? (
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                {source}
                            </a>
                        ) : (
                            <span className="text-gray-600">{source}</span>
                        )}
                    </span>
                </div>
            )}

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 relative z-10">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 rounded text-xs bg-blue-50 text-blue-600"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            
            {isExpanded && (
                <div className="mt-4 animate-slide-down relative z-10">
                    <div className="prose max-w-none">
                        <p className="text-gray-700 mb-4 leading-relaxed">{answer}</p>
                        {code && <CodeBlock code={code} />}
                    </div>
                </div>
            )}
        </div>
    );
}