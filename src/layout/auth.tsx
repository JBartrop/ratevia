import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";



const AuthLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    return(
        <section>
            <main>
                <h1>auth layout</h1>
                <Outlet />
            </main>
        </section>
    )
}

export default AuthLayout;