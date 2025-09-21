import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { FaNpm } from "react-icons/fa";

export default function Header() {
    return (
        <header className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                    >
                        <FaNpm className="text-2xl" />
                        <span className="text-xl font-bold">NPM Registry</span>
                    </Link>

                    {/* Search Input */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <SearchInput />
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/search"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            Browse
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
