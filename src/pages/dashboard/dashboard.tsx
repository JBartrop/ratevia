import React, { ReactNode, useEffect, useState } from "react";
import ThemeToggle from "../../components/toggle";
import { IoWarning } from "react-icons/io5";
import { BiCheckCircle, BiFolderOpen } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import RecentActivities from "../../components/recentActivities";
import RecentTasks from "../../components/recentTask";


interface cardProps{
    header:string;
    number:string;
    footer:string;
    icon: ReactNode;
    color:string;
}

export interface RecentProps{
    title: string;
    description:string;
    date:string;
}

export interface RecentTaskProps{
    title: string;
    priority:string;
    content:string;
    date:string;
}

const carditems: cardProps[] = [
    {
        header: "Total tasks",
        number: "30",
        footer:"total number of tasks",
        color:"gray",
        icon:  (() => {
            const Icon = BiFolderOpen as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        header: "Completed tasks",
        number: "10",
        footer:"total number of completed tasks",
        color:"green",
        icon:  (() => {
            const Icon = BiCheckCircle as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        header: "Ongoing tasks",
        number: "5",
        footer:"total number of ongoing tasks",
        color:"yellow",
        icon:  (() => {
            const Icon = FaTasks as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        header: "Overdue tasks",
        number: "7",
        footer:"total number of overdue tasks",
        color:"red",
        icon:  (() => {
            const Icon = IoWarning as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
]

export const recentData: RecentProps[] = [
  {
    title: "System Update Released",
    description: "A new system update improves performance and fixes minor bugs.",
    date: "2025-01-12"
  },
  {
    title: "User Onboarding Completed",
    description: "A total of 150 new users successfully completed onboarding.",
    date: "2025-01-18"
  },
  {
    title: "Server Maintenance",
    description: "Scheduled server maintenance was performed with zero downtime.",
    date: "2025-02-03"
  },
  {
    title: "New Feature: Dark Mode",
    description: "Dark mode has been added to enhance user experience.",
    date: "2025-02-10"
  },
  {
    title: "Bug Report Submitted",
    description: "A user identified an issue with the login flow.",
    date: "2025-02-14"
  },
  {
    title: "Marketing Campaign Launched",
    description: "The new campaign saw a 20% increase in site traffic.",
    date: "2025-03-01"
  },
  {
    title: "Database Optimization",
    description: "Query performance improved by 35% after optimization.",
    date: "2025-03-08"
  },
  {
    title: "New Partnership Formed",
    description: "A strategic partnership was formed to expand market reach.",
    date: "2025-03-15"
  },
  {
    title: "Security Patch Applied",
    description: "A critical security patch was deployed across all servers.",
    date: "2025-03-22"
  },
  {
    title: "Monthly Performance Report",
    description: "The monthly report shows improved engagement metrics.",
    date: "2025-03-30"
  }
];

export const recentTaskData: RecentTaskProps[] = [
  {
    title: "New Project",
    content: "A new system for dashboard.",
    date: "2025-01-12",
    priority: "high",
  },
  {
    title: "User Onboarding",
    content: "create new users for onboarding processes.",
    date: "2025-01-18",
    priority: "medium",
  },
  {
    title: "Admin Dashboard",
    content: "Create routes for it.",
    date: "2025-02-03",
    priority: "high",
  },
  {
    title: "New Feature: Dark Mode",
    content: "create a Dark mode  to enhance user experience.",
    date: "2025-02-10",
    priority: "low",
  },
  {
    title: "Porfolio",
    content: "Finish up portfolio.",
    date: "2025-02-14",
    priority: "high",
  },
  {
    title: "Marketing Campaign ",
    content: "The new campaign saw a 20% increase in site traffic.",
    date: "2025-03-01",
    priority: "low",
  },
  {
    title: "Database Optimization",
    content: "Query performance needs to be optimization.",
    date: "2025-03-08",
    priority: "medium",
  },
  {
    title: "Security Patch Applied",
    content: "A critical security needs to be deployed across all servers.",
    date: "2025-03-22",
    priority: "medium",
  },
];




const Dashboard: React.FC = () => {

    const  [loading, setLoading] = useState<boolean>(false)


    const FetchData = async () => {
        setLoading(true)
        await new Promise<void>((res) => setTimeout(res, Math.random() * 2000));
        setLoading(false)
    }

    useEffect(() => {
        FetchData();
    },[])

    if (loading) {
        return (
            <div className="z-10 w-full h-full flex flex-col justify-center items-center p-6 text-gray-500 text-center">
                <div className="w-14 h-14 border-4 border-t-transparent border-[rgb(var(--primary))] rounded-full animate-spin my-4"></div>
                Loading Dashboard...
            </div>
        )
    }

    return(
        <section className="w-full min-h-screen">
            {/* <ThemeToggle /> */}
            <h1 className="text-[rgb(var(--header-text))] font-bold text-center my-2 uppercase">Dashboard</h1>
            {/* <p className="text-[rgb(var(--text))] font-bold">hello world</p> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 mb-8">
                {carditems.map((item) => (
                    <div key={item.header} className="h-30 p-4 rounded-md m-1  text-[rgb(var(--text))] bg-[rgb(var(--card))] shadow-lg shadow-[rgb(var(--muted))]/20 ">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold">{item.header}</p>
                                <h2 className="sm:text-4xl text-2xl font-bold mt-2">{item.number}</h2>
                            </div>
                            <div className={`w-12 h-12 rounded-xl ${item.color === "red" ? "bg-red-200" : 
                            item.color === "yellow" ? "bg-yellow-100": 
                            item.color === "green" ? "bg-green-200" : "bg-gray-300"}  bg-[rgb(var(--primary))]/20 flex items-center justify-center`}>
                                {item.icon}
                            </div>
                        </div>
                        <div className="text-[rgb(var(--muted))] text-sm">{item.footer}</div>
                    </div>
                ))}
                

            </div>
            <div className="grid md:grid-cols-2 gap-2">
                <div className="leftside">
                    {/* <div className="h-28 p-6 rounded-md m-1  text-[rgb(var(--text))] bg-[rgb(var(--card))] ">
                        Tasks
                    </div> */}
                    <RecentTasks data={recentTaskData} />
                </div>
                <div className="rightside">
                    <RecentActivities data={recentData} />
                </div>
            </div>
            
        </section>
    )
}

export default Dashboard;