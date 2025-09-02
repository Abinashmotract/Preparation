import { getQuestions } from "@/lib/getQuestions";
import QuestionCard from "@/components/QuestionCard";

export default function CategoryPage({ params }: { params: { category: string } }) {
    return (
        <div>
            <h1 className="text-xl font-bold capitalize mb-4">
                {params.category} Overview
            </h1>
            <p>Select a topic from the sidebar.</p>
        </div>
    );
}
