import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Loader from '../components/loader';
import Sidebar from '../components/sidebar';
import ProtectedRoute from '../components/protectedRoute';



const DashboardLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        const saved = localStorage.getItem("ratevia-sidebar")
         return saved ? saved === "true" : false;
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000);
        return () => clearTimeout(timer)
    },[]);

    useEffect(() => {
        localStorage.setItem("ratevia-sidebar", String(collapsed))
    },[collapsed]);

    if(loading) return <Loader />;
    

    return(
        <ProtectedRoute>
        <section>
            <main className='flex min-h-screen min-w-fit'>
                <Sidebar isOpen={collapsed} toggleOpen={() => setCollapsed(prev => !prev)} />
                <div className={`${collapsed ? "ml-[3.75rem]" : "ml-64"} transition-all duration-300 p-4`}>
                    <Outlet />
                </div>
                
            </main>
        </section>
        </ProtectedRoute>
    )
}

export default DashboardLayout;