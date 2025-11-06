"use client";
import { Difficulty } from "@/types/question";

interface DifficultyFilterProps {
  selected: Difficulty | "All";
  onFilterChange: (difficulty: Difficulty | "All") => void;
}

export default function DifficultyFilter({ selected, onFilterChange }: DifficultyFilterProps) {
  const difficulties: Array<Difficulty | "All"> = ["All", "Beginner", "Intermediate", "Advanced"];

  const getColor = (difficulty: Difficulty | "All") => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-300 hover:bg-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-300 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onFilterChange(difficulty)}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
            selected === difficulty
              ? `${getColor(difficulty)} shadow-lg scale-105`
              : `${getColor(difficulty)} opacity-70`
          }`}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}

