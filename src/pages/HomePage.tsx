import { Link } from "react-router-dom";
import { FaNpm, FaDownload, FaUsers, FaCode, FaRocket, FaShieldAlt, FaGlobe } from "react-icons/fa";
import SearchInput from "../components/SearchInput";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <FaNpm className="text-8xl text-red-600" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Build amazing things
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        We're npm, Inc., the company behind Node Package Manager, the npm Registry, and npm CLI.
                        We offer those to the community for free, but our day job is building and selling useful tools for developers.
                    </p>

                    {/* Search Section */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <SearchInput />
                        <p className="text-gray-500 mt-2">Search over 2 million packages</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/search"
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <FaRocket />
                            <span>Explore Packages</span>
                        </Link>
                        <a
                            href="https://docs.npmjs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <FaCode />
                            <span>Documentation</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <FaDownload className="text-4xl text-red-600 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-gray-900 mb-2">2M+</div>
                            <div className="text-gray-600">Packages</div>
                        </div>
                        <div className="p-6">
                            <FaUsers className="text-4xl text-red-600 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-gray-900 mb-2">17M+</div>
                            <div className="text-gray-600">Developers</div>
                        </div>
                        <div className="p-6">
                            <FaGlobe className="text-4xl text-red-600 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-gray-900 mb-2">40B+</div>
                            <div className="text-gray-600">Downloads/Month</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why developers choose npm
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The world's largest software registry with packages for every need
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <FaShieldAlt className="text-3xl text-red-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
                            <p className="text-gray-600">
                                Built-in security features and vulnerability scanning to keep your projects safe.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <FaRocket className="text-3xl text-red-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast</h3>
                            <p className="text-gray-600">
                                Lightning-fast package installation and dependency resolution.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <FaUsers className="text-3xl text-red-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                            <p className="text-gray-600">
                                Join millions of developers sharing and discovering packages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-red-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                        Join the millions of developers who rely on npm to build amazing things.
                    </p>
                    <Link
                        to="/search"
                        className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
                    >
                        <FaRocket />
                        <span>Start Exploring</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}