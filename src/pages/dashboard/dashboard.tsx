import React, { ReactNode } from "react";
import ThemeToggle from "../../components/toggle";
import { IoWarning } from "react-icons/io5";
import { BiCheckCircle, BiFolderOpen } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";


interface cardProps{
    header:string;
    number:string;
    footer:string;
    icon: ReactNode;
}

const carditems: cardProps[] = [
    {
        header: "Total tasks",
        number: "0",
        footer:"total number of tasks",
        icon:  (() => {
            const Icon = BiFolderOpen as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        header: "Completed tasks",
        number: "0",
        footer:"total number of completed tasks",
        icon:  (() => {
            const Icon = BiCheckCircle as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        header: "Ongoing tasks",
        number: "0",
        footer:"total number of ongoing tasks",
        icon:  (() => {
            const Icon = FaTasks as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        header: "Overdue tasks",
        number: "0",
        footer:"total number of overdue tasks",
        icon:  (() => {
            const Icon = IoWarning as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
]



const Dashboard: React.FC = () => {
    return(
        <section className="w-full min-h-screen">
            {/* <ThemeToggle /> */}
            <h1 className="text-[rgb(var(--header-text))] font-bold text-center my-2 uppercase">Dashboard</h1>
            {/* <p className="text-[rgb(var(--text))] font-bold">hello world</p> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 mb-8">
                {carditems.map((item) => (
                    <div key={item.header} className="h-30 p-4 rounded-md m-1  text-[rgb(var(--text))] bg-[rgb(var(--card))] ">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold">{item.header}</p>
                                <h2 className="sm:text-4xl text-2xl font-bold mt-2">{item.number}</h2>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-[rgb(var(--primary))]/20 flex items-center justify-center">
                                {item.icon}
                            </div>
                        </div>
                        <div className="text-[rgb(var(--muted))] text-sm">{item.footer}</div>
                    </div>
                ))}
                

            </div>
            <div className="grid md:grid-cols-2 gap-2">
                <div className="leftside">
                    <div className="h-28 p-6 rounded-md m-1  text-[rgb(var(--text))] bg-[rgb(var(--card))] ">
                        Tasks
                    </div>
                </div>
                <div className="rightside">
                    <div className="h-28 p-6 rounded-md m-1  text-[rgb(var(--text))] bg-[rgb(var(--card))] ">
                        Recent activity
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Dashboard;