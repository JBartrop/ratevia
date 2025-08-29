'use client';
import React, { useEffect, useState } from 'react';



const Loader: React.FC = () => {
//    const [theme, setTheme] = useState<'light' | 'dark'>('light');

//     useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' | null;

//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//     } else {
//       const prefersDark = window.matchMedia("(prefers-color-scheme: light)").matches;
//       const sysTheme = prefersDark ? 'dark' : 'light';
//       setTheme(sysTheme);
//       document.documentElement.classList.toggle('light', prefersDark);
//     }
//   }, [theme]);




    return (
            <section className="loader">
            
                <div className="Loader overflow-hidden bg-[rgb(var(--background))]  flex z-1000 h-full w-full fixed items-center justify-center text-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
                    <div className="flex flex-col items-center  gap-6">
                        <div className="w-24 h-24 border-4 border-t-transparent border-[rgb(var(--primary))] rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img src={"/apple-touch-icon.png"} alt={"rateviaImage"} width={50} height={50} />
                        </div>
                        
                    </div>
                </div>
                
        </section>

    )
}

export default Loader;
