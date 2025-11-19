import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Loader from '../components/loader';
import Sidebar from '../components/sidebar';
import ProtectedRoute from '../components/protectedRoute';
import ScrollToTop from '../components/scrollToTop';



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
            <ScrollToTop />
            <main className='flex flex-1'>
                <Sidebar isOpen={collapsed} toggleOpen={() => setCollapsed(prev => !prev)} />
                <div className={`${collapsed ? "pl-20" : "ml-64"} transition-all duration-300 p-4 w-full min-h-screen`}>
                    <Outlet />
                </div>
                
            </main>
        </section>
        </ProtectedRoute>
    )
}

export default DashboardLayout;