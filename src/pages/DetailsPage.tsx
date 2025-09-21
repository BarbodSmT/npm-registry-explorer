import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaDownload, FaCalendarAlt, FaUser, FaGithub, FaBug, FaHome, FaSpinner, FaArrowLeft, FaTag, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PackageDetails {
    name: string;
    description: string;
    version: string;
    author?: {
        name: string;
        email?: string;
    };
    maintainers?: Array<{
        name: string;
        email?: string;
    }>;
    time: {
        created: string;
        modified: string;
        [version: string]: string;
    };
    homepage?: string;
    repository?: {
        type: string;
        url: string;
    };
    bugs?: {
        url: string;
    };
    license?: string;
    keywords?: string[];
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    readme?: string;
    versions: Record<string, any>;
}

export default function DetailsPage() {
    const params = useParams();
    const packageName = params['*'];
    const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (packageName) {
            fetchPackageDetails(packageName);
        }
    }, [packageName]);

    const fetchPackageDetails = async (name: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`);
            if (!response.ok) {
                throw new Error('Package not found');
            }
            const data = await response.json();
            setPackageDetails(data);
        } catch (err) {
            setError('Failed to load package details. Please try again.');
            console.error('Package details error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading package details...</p>
                </div>
            </div>
        );
    }

    if (error || !packageDetails) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        to="/search"
                        className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Search
                    </Link>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                        <div className="text-red-600 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-red-800 mb-2">Package Not Found</h2>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const latestVersion = packageDetails.version;
    const createdDate = new Date(packageDetails.time.created);
    const modifiedDate = new Date(packageDetails.time.modified);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    to="/search"
                    className="inline-flex items-center text-red-600 hover:text-red-700 mb-6 transition-colors duration-200"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Search
                </Link>

                {/* Package Header */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-4">
                                <h1 className="text-4xl font-bold text-gray-900">{packageDetails.name}</h1>
                                <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    v{latestVersion}
                                </span>
                            </div>

                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                {packageDetails.description || 'No description available'}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                                {packageDetails.author && (
                                    <div className="flex items-center">
                                        <FaUser className="mr-2 text-gray-400" />
                                        <span>{packageDetails.author.name}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-400" />
                                    <span>Created {createdDate.toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaTag className="mr-2 text-gray-400" />
                                    <span>Updated {modifiedDate.toLocaleDateString()}</span>
                                </div>
                                {packageDetails.license && (
                                    <div className="flex items-center">
                                        <FaCode className="mr-2 text-gray-400" />
                                        <span>{packageDetails.license}</span>
                                    </div>
                                )}
                            </div>

                            {packageDetails.keywords && packageDetails.keywords.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Keywords</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {packageDetails.keywords.map((keyword) => (
                                            <span
                                                key={keyword}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="lg:ml-8 flex flex-col space-y-3 mt-6 lg:mt-0">
                            <div className="bg-gray-900 text-white p-4 rounded-lg">
                                <div className="text-sm text-gray-300 mb-1">Install</div>
                                <code className="text-green-400 font-mono">npm install {packageDetails.name}</code>
                            </div>

                            <a
                                href={`https://www.npmjs.com/package/${packageDetails.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                                <FaDownload className="mr-2" />
                                View on npm
                            </a>

                            {packageDetails.homepage && (
                                <a
                                    href={packageDetails.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <FaHome className="mr-2" />
                                    Homepage
                                </a>
                            )}

                            {packageDetails.repository && (
                                <a
                                    href={packageDetails.repository.url.replace('git+', '').replace('.git', '')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <FaGithub className="mr-2" />
                                    Repository
                                </a>
                            )}

                            {packageDetails.bugs && (
                                <a
                                    href={packageDetails.bugs.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <FaBug className="mr-2" />
                                    Issues
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Package Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Dependencies */}
                    <div className="lg:col-span-2">
                        {packageDetails.dependencies && Object.keys(packageDetails.dependencies).length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Dependencies</h2>
                                <div className="space-y-2">
                                    {Object.entries(packageDetails.dependencies).slice(0, 10).map(([dep, version]) => (
                                        <div key={dep} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                            <Link
                                                to={`/package/${dep}`}
                                                className="text-red-600 hover:text-red-700 font-medium"
                                            >
                                                {dep}
                                            </Link>
                                            <span className="text-gray-500 font-mono text-sm">{version}</span>
                                        </div>
                                    ))}
                                    {Object.keys(packageDetails.dependencies).length > 10 && (
                                        <div className="text-center pt-4">
                                            <span className="text-gray-500">
                                                +{Object.keys(packageDetails.dependencies).length - 10} more dependencies
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div>
                        {/* Maintainers */}
                        {packageDetails.maintainers && packageDetails.maintainers.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Maintainers</h3>
                                <div className="space-y-3">
                                    {packageDetails.maintainers.slice(0, 5).map((maintainer, index) => (
                                        <div key={index} className="flex items-center">
                                            <FaUser className="text-gray-400 mr-3" />
                                            <div>
                                                <div className="font-medium text-gray-900">{maintainer.name}</div>
                                                {maintainer.email && (
                                                    <div className="text-sm text-gray-500">{maintainer.email}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Version History */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Versions</h3>
                            <div className="space-y-2">
                                {Object.keys(packageDetails.versions)
                                    .slice(-5)
                                    .reverse()
                                    .map((version) => (
                                        <div key={version} className="flex items-center justify-between py-1">
                                            <span className="font-mono text-sm">{version}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(packageDetails.time[version]).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}