import React, { useContext, useEffect } from "react";
import { WebData } from "../contextApi/AuthContext";
import { logout } from "../utils/Apis";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(WebData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
      <p className="mb-4">{user?.email}</p>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
