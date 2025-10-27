import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Footer from '../components/footer';
import { BiArrowBack } from 'react-icons/bi';



const AuthLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    return(
        // <section  className="bg-cover bg-right min-h-lvh w-scren bg-white/40 overflow-hidden" style={{ backgroundImage: "url('/loginbg.jpg')"}}>
        <section  className="bg-cover bg-right min-h-lvh w-scren bg-[rgb(var(--background))] overflow-hidden">
            <nav className='top-0 left-0 h-5 w-full absolute flex justify-between px-8 md:px-16 pt-8 items-center'>
                <button onClick={() => navigate(-1)} className='bg-[rgb(var(--secondary))] text-[rgb(var(--buttonText))] p-1 rounded-md hover:bg-[rgb(var(--secondary))]/70 items-center'>
                    {(() => {
                        const Icon = BiArrowBack as React.ComponentType<{ size?: number }>;
                        return <Icon size={20} />;
                    })()}
                    </button>
            </nav>

            <main className='min-h-lvh w-scren flex items-center justify-center'>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </section>
    )
}

export default AuthLayout;