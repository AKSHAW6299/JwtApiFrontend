import React, { createContext, useEffect, useState } from "react";

export const WebData = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

    // persist login on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <WebData.Provider value={{ user, setUser }}>
            {children}
        </WebData.Provider>
    );
};
