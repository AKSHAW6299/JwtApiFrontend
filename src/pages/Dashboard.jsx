import React, { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(WebData);

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
      <p className="text-gray-600">Email: {user?.email}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Card 1</div>
        <div className="bg-white p-4 rounded shadow">Card 2</div>
        <div className="bg-white p-4 rounded shadow">Card 3</div>
      </div>
      <hr />
    </div>
  );
};

export default DashboardHome;
