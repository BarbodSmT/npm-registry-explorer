import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
    const [term, setTerm] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (term.trim()) {
            navigate(`/search?query=${term}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search packages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 bg-white"
                />
                {term && (
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <div className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200">
                            Search
                        </div>
                    </button>
                )}
            </div>
        </form>
    )
}