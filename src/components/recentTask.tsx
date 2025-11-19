import React from "react";
import { BiTask } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";

export interface RecentProps{
    title: string;
    priority:string;
    content:string;
    date:string;
}

interface RecentTask{
    data:RecentProps[]
}

const RecentTasks:React.FC<RecentTask> = ({data}) => {
    return(
        <section className="p-2 text-[rgb(var(--muted))] rounded-md m-1  bg-[rgb(var(--card))] h-auto shadow-lg shadow-[rgb(var(--muted))]/20">
            <h1 className="sm:text-2xl text-xl text-[rgb(var(--text))] font-bold my-4">Recent Tasks</h1>
            {data.length > 0 ? (
                data.slice(0, 10).map((d) => (
                <div className="border-b border-[rgb(var(--primary))]/30 p-1 " key={d.title}>
                    <div className="flex justify-between">
                        <h1 className=" text-base font-semibold mt-2">{d.title}</h1>
                        <span className={` 
                            ${d.priority === "high" ? "bg-green-600" :
                            d.priority === "medium" ? "bg-yellow-400" : "bg-gray-400"} m-2 p-1 w-2 h-2 rounded-full`}></span>
                    </div>
                    
                    <div className="flex justify-between text-[12px]">
                        <p>{d.content.slice(0,25)}...</p>
                        <p>{d.date}</p>
                    </div>
                </div>
            ))) : (
                <div className="p-8 flex flex-col justify-center items-center">
                    <button className="text-[rgb(var(--secondary))]/50" >
                    {(() => {
                        const Icon = BiTask as React.ComponentType<{ size?: number }>;
                        return <Icon size={40} />;
                    })()}
                    </button>
                    <a href="dashboard/tasks" className="px-4 py-2 my-2 rounded-lg text-xl bg-[rgb(var(--primary))] text-[rgb(var(--card))]">Create New task</a>
                </div>
            )}
            
        </section>
    )
}

export default RecentTasks;