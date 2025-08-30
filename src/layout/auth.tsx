import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../components/footer';



const AuthLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    return(
        <section>
            <main className='bg-cover flex items-center justify-center min-h-lvh w-scren'>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </section>
    )
}

export default AuthLayout;