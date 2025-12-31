import React, { createContext, useEffect, useState } from "react";

export const WebData = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  return (
    <WebData.Provider value={{ user, setUser }}>
      {!loading && children}
    </WebData.Provider>
  );
};
