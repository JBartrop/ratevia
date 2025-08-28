import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";



const AuthLayout: React.FC = () => {
    return(
        <section>
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default AuthLayout;