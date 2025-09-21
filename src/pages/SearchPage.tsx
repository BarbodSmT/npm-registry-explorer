import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaDownload, FaCalendarAlt, FaUser, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PackageInfo {
    name: string;
    description: string;
    version: string;
    author?: {
        name: string;
    };
    date: string;
    links: {
        npm: string;
        homepage?: string;
        repository?: string;
    };
    publisher: {
        username: string;
    };
    keywords?: string[];
}

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [packages, setPackages] = useState<PackageInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query) {
            searchPackages(query);
        } else {
            setPackages([]);
            setError(null);
            setLoading(false);
        }
    }, [query]);

    const searchPackages = async (searchQuery: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(searchQuery)}&size=20`);
            if (!response.ok) {
                throw new Error('Failed to fetch packages');
            }
            const data = await response.json();
            setPackages(data.objects.map((obj: any) => obj.package));
        } catch (err) {
            setError('Failed to search packages. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {query ? `Search Results for "${query}"` : 'Search Packages'}
                    </h1>
                    {!loading && packages.length > 0 && (
                        <p className="text-gray-600">
                            Found {packages.length} packages
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <FaSpinner className="animate-spin text-4xl text-red-600 mr-3" />
                        <span className="text-xl text-gray-600">Searching packages...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center">
                            <div className="text-red-600 mr-3">⚠️</div>
                            <div>
                                <h3 className="text-lg font-semibold text-red-800">Error</h3>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && query && packages.length === 0 && (
                    <div className="text-center py-12">
                        <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
                        <p className="text-gray-600">Try adjusting your search terms or browse popular packages.</p>
                    </div>
                )}

                {/* Search Results */}
                {!loading && packages.length > 0 && (
                    <div className="space-y-6">
                        {packages.map((pkg) => (
                            <div key={pkg.name} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <Link
                                                to={`/package/${pkg.name}`}
                                                className="text-xl font-semibold text-red-600 hover:text-red-700 transition-colors duration-200"
                                            >
                                                {pkg.name}
                                            </Link>
                                            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                                                v{pkg.version}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 mb-4 leading-relaxed">
                                            {pkg.description || 'No description available'}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            {pkg.author && (
                                                <div className="flex items-center">
                                                    <FaUser className="mr-1" />
                                                    <span>{pkg.author.name}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="mr-1" />
                                                <span>{new Date(pkg.date).toLocaleDateString()}</span>
                                            </div>
                                            {pkg.publisher && (
                                                <div className="flex items-center">
                                                    <span>Published by {pkg.publisher.username}</span>
                                                </div>
                                            )}
                                        </div>

                                        {pkg.keywords && pkg.keywords.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {pkg.keywords.slice(0, 5).map((keyword) => (
                                                    <span
                                                        key={keyword}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                                {pkg.keywords.length > 5 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        +{pkg.keywords.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="ml-6 flex flex-col space-y-2">
                                        <a
                                            href={pkg.links.npm}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
                                        >
                                            <FaDownload className="mr-2" />
                                            npm
                                        </a>
                                        {pkg.links.homepage && (
                                            <a
                                                href={pkg.links.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm"
                                            >
                                                <FaExternalLinkAlt className="mr-2" />
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State for no query */}
                {!query && !loading && (
                    <div className="text-center py-12">
                        <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Start searching</h3>
                        <p className="text-gray-600">Use the search bar above to find npm packages.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
