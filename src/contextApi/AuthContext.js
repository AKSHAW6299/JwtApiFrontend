import React, { createContext, useEffect, useState } from "react";

export const WebData = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <WebData.Provider
      value={{
        user,
        setUser,
        role: user?.role,   // 🔑 role exposed
        logoutUser,
      }}
    >
      {!loading && children}
    </WebData.Provider>
  );
};
