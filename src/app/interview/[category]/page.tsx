"use client";
import { fetchQuestionsFromAPI } from "@/lib/getQuestions";
import QuestionCard from "@/components/QuestionCard";
import SearchBar from "@/components/SearchBar";
import DifficultyFilter from "@/components/DifficultyFilter";
import { useState, useEffect, useMemo } from "react";
import { Difficulty, Question } from "@/types/question";

export default function CategoryPage({ params }: { params: { category: string } }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load initial data from APIs only
    useEffect(() => {
        loadQuestions();
    }, [params.category, selectedDifficulty]);

    const loadQuestions = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const apiQuestions = await fetchQuestionsFromAPI(params.category, {
                difficulty: selectedDifficulty !== "All" ? selectedDifficulty : undefined,
                limit: 50, // Increased to get more from multiple API sources
            });
            
            if (apiQuestions.length > 0) {
                setQuestions(apiQuestions);
            } else {
                setError("No questions found from API sources. Please try again later or check your API configuration.");
            }
        } catch (err) {
            console.error("Error loading questions:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to load questions from APIs";
            setError(`Error: ${errorMessage}. Please check your API configuration or try again later.`);
        } finally {
            setLoading(false);
        }
    };

    // Filter questions by search query
    const filteredQuestions = useMemo(() => {
        if (!searchQuery) return questions;
        
        const searchLower = searchQuery.toLowerCase();
        return questions.filter(
            (q) =>
                q.question.toLowerCase().includes(searchLower) ||
                q.answer.toLowerCase().includes(searchLower) ||
                q.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
        );
    }, [questions, searchQuery]);

    const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1).replace(/-/g, " ");

    return (
        <div className="pt-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {categoryName} Interview Questions
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Prepare for your interviews with curated questions and detailed answers
                </p>
                <p className="text-sm text-blue-600 mt-2">
                    🔄 Fetching from multiple API sources (Stack Overflow, Google, LeetCode, GitHub...)
                </p>
            </div>

            <SearchBar 
                onSearch={setSearchQuery}
                placeholder={`Search ${categoryName} questions...`}
            />

            <DifficultyFilter 
                selected={selectedDifficulty}
                onFilterChange={setSelectedDifficulty}
            />

            <div className="mb-6 text-center">
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <p className="text-gray-600">Loading questions...</p>
                    </div>
                ) : (
                    <p className="text-gray-600">
                        Found <span className="font-bold text-blue-600">{filteredQuestions.length}</span> question{filteredQuestions.length !== 1 ? 's' : ''}
                        {questions.some(q => q.source) && (
                            <span className="text-sm text-gray-500 ml-2">
                                (from {Array.from(new Set(questions.map(q => q.source))).filter(Boolean).join(", ")})
                            </span>
                        )}
                    </p>
                )}
            </div>

            {error && (
                <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">{error}</p>
                    <p className="text-red-600 text-xs mt-2">
                        💡 Tip: Make sure API keys are configured in your environment variables. See API_SETUP.md for details.
                    </p>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading questions from multiple sources...</p>
                    </div>
                ) : filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            id={question.id}
                            question={question.question}
                            answer={question.answer}
                            code={question.code}
                            difficulty={question.difficulty}
                            category={question.category}
                            topic={question.topic}
                            tags={question.tags}
                            source={question.source}
                            sourceUrl={question.sourceUrl}
                        />
                    ))
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No questions found</h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
