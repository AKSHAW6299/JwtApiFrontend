import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
    return (
        <header className="w-full bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-xl font-semibold tracking-wide">
                    <Link to="/">
                        JWT<span className="text-indigo-400">Auth</span>
                    </Link>
                </h1>


                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    <Link to="/" className="px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition text-sm">
                        Home
                    </Link>
                    <Link
                        to="/login"
                        className="px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition text-sm"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-1.5 rounded-md border border-gray-600 hover:bg-gray-800 transition text-sm"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Headers;
