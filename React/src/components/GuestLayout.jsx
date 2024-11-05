import React from "react";
import { UseContext } from "../contextApi/createContext";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
    const { token,notification } = UseContext();
    if (token) {
        return <Navigate to="/user" />;
    }
    return (
        <>
            <Outlet />
            
              {notification && <div className="flex justify-center bg-green-500 text-white p-4">
                {notification}
                </div>}
            
        </>
    );
}

export default GuestLayout;
