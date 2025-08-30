import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC <ProtectedRouteProps> = ({children}) => {

    const isAuthenticated = !!localStorage.getItem("Ratevia"); 

    if(!isAuthenticated){
        return <Navigate to="/auth/login" replace />
    }
    
    return <>{children}</>;
}

export default ProtectedRoute;