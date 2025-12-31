import React, { useContext, useEffect } from "react";
import { WebData } from "../contextApi/AuthContext";
import { logout } from "../utils/Apis";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(WebData);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>
            <p className="mb-6">{user?.email}</p>

            {/* Navigation */}
            <nav className="mb-6 space-x-4">
                <Link className="text-blue-600" to="/dashboard">Home</Link>
                <Link className="text-blue-600" to="/dashboard/services">Services</Link>
                <Link className="text-blue-600" to="/dashboard/settings">Settings</Link>
                <Link className="text-blue-600" to="/dashboard/faq">FAQ</Link>
            </nav>

            <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded mb-6"
            >
                Logout
            </button>

            {/* Nested Routes */}
            <div className="border-t pt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
