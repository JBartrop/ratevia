import React from "react";
import { FaBoxOpen } from "react-icons/fa";

export interface RecentProps{
    title: string;
    description:string;
    date:string;
}

interface RecentActivity{
    data:RecentProps[]
}

const RecentActivities:React.FC<RecentActivity> = ({data}) => {
    return(
        <section className="p-2 text-[rgb(var(--muted))] rounded-md m-1  bg-[rgb(var(--card))] h-auto shadow-lg shadow-[rgb(var(--muted))]/20">
            <h1 className="sm:text-2xl text-xl text-[rgb(var(--text))] font-bold my-4">Recent activities</h1>
            {data.length > 0 ? (
                data.slice(0, 10).map((d) => (
                <div className="border-b border-[rgb(var(--primary))]/30 p-1" key={d.title}>
                    <h1 className="sm:text-xl text-base font-bold mt-2">{d.title}</h1>
                    <div className="flex justify-between text-[12px]">
                        <p className="">{d.description}</p>
                        <p className="">{d.date}</p>
                    </div>
                </div>
            ))) : (
                <div className="p-8 flex flex-col justify-center items-center">
                    <button className="text-[rgb(var(--secondary))]/50" >
                    {(() => {
                        const Icon = FaBoxOpen  as React.ComponentType<{ size?: number }>;
                        return <Icon size={40} />;
                    })()}
                    </button>
                    <p className="px-1 md:text-xl text-base text-[rgb(var(--muted))]">No recent activities</p>
                </div>
            )}
            
        </section>
    )
}

export default RecentActivities;