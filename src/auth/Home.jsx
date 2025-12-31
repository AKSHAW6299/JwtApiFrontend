import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <h1 className="text-2xl font-bold mb-4">JWT Auth App</h1>
    <Link to="/login" className="text-blue-600">
      Go to Login
    </Link>
  </div>
);

export default Home;
