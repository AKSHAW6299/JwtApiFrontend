import React, { useContext, useEffect } from "react";
import { WebData } from "../contextApi/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(WebData);

  useEffect(() => {
    console.log("Dashboard user:", user);
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Welcome, {user.name}
      </h2>
      <p className="text-gray-600">
        Email: {user.email}
      </p>
    </div>
  );
};

export default DashboardHome;
