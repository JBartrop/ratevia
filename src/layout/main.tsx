import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Loader from '../components/loader';



const MainLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000);
        return () => clearTimeout(timer)
    })

    if(loading) return <Loader />;
    

    return(
        <section>
            <main>
                <h1>MainLayout</h1>
                <Outlet />
            </main>
        </section>
    )
}

export default MainLayout;