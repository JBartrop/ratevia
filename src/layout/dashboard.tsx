import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Loader from '../components/loader';
import Sidebar from '../components/sidebar';



const DashboardLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [collapsed, isOpen] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000);
        return () => clearTimeout(timer)
    })

    if(loading) return <Loader />;
    

    return(
        <section>
            <main className='flex min-h-screen min-w-fit'>
                <Sidebar isOpen={collapsed} toggleOpen={() => isOpen(prev => !prev)} />
                <div className={`${collapsed ? "ml-[3.75rem]" : "ml-64"} transition-all duration-300 p-4`}>
                    <Outlet />
                </div>
                
            </main>
        </section>
    )
}

export default DashboardLayout;