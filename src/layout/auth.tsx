import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";



const AuthLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    return(
        <section className='bg-cover flex items-center justify-center w-full h-screen'>
            <Outlet />
        </section>
    )
}

export default AuthLayout;