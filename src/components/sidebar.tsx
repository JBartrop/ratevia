import React, { ReactNode, useEffect, useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SidebarProps {
    isOpen: boolean;
    toggleOpen: () => void;
}

interface MenuProps {
    id: string;
    name: string;
    link: string;
    icon: ReactNode;
    onClick?: () => void;
}

interface userInfo {
    name:string;
    email:string;
    profilePhoto: ReactNode;
}

const MenuItems: MenuProps[] = [
    {
        id: "1",
        name: "Home",
        link: "/dashboard",
        icon:  (() => {
            const Icon = RxDashboard as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        id: "2",
        name: "Schedule",
        link: "/dashboard/schedule",
        icon:  (() => {
            const Icon = RiCalendarScheduleLine as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        id: "3",
        name: "Task",
        link: "/dashboard/task",
        icon:  (() => {
            const Icon = BiTask as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        id: "4",
        name: "Notifications",
        link: "/dashboard/notification",
        icon:  (() => {
            const Icon = IoNotificationsOutline as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        id: "5",
        name: "Acount",
        link: "/dashboard/account",
        icon:  (() => {
            const Icon = MdOutlineAccountCircle as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
    {
        id: "6",
        name: "Settings",
        link: "/dashboard/setting",
        icon:  (() => {
            const Icon = IoSettingsOutline as React.ComponentType<{ size?: number }>;
            return <Icon size={20} />;
        })(),
    },
]



const Sidebar: React.FC <SidebarProps> = ({isOpen,toggleOpen}) => {
    const [user, setUser] = useState<userInfo| null>(null);
    const location = useLocation();
    const  pathname = location.pathname;
    const router = useNavigate();

    const logoutAction = () => {
        new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
        localStorage.removeItem("Ratevia")
        toast.info("you have been logged out")
        router("/auth/login")
    }

    useEffect(() => {
        const rateviauser = localStorage.getItem("Ratevia");
        if(rateviauser){
            try{
                const parsedUser = JSON.parse(rateviauser)
                setUser(parsedUser);
            }catch(error:any){
                console.log(error.message)
            }
        }
    },[])


    return(
        <>
            <section className={`${isOpen ? "w-[3.75rem]" : "w-64"} shadow-lg shadow-gray-400 bg-[rgb(var(--card))] text-[rgb(var(--text))] fixed top-0 left-0 p-4 transition-all duration-300 h-full`}>
                {isOpen ? (
                    //collapsed
                    <nav>
                        <div className="mb-8" onClick={toggleOpen}>
                            {(() => {
                                const Icon = TbLayoutSidebarFilled as React.ComponentType<{ size?: number }>;
                                return <Icon size={20} />;
                            })()}
                        </div>
                        <div>
                            <ul>
                                {MenuItems.map((item, index) => {
                                    const isActive = pathname === item.link;
                                    return(
                                        <li key={index} className="relative group border-b border-b-blue-300">
                                            <Link to={item.link} className={` flex items-center p-1 my-2 hover:text-[rgb(var(--lines))] ${isActive ? "bg-[rgb(var(--primary))] text-white rounded-md" : "bg-transparent"}`}>
                                            <span className="mr-2">{item.icon}</span>
                                            </Link>

                                            <span className="absolute top-0 left-full ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                                                {item.name}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div 
                            className="absolute bottom-5  rounded-md flex justify-between cursor-pointer items-center"
                            onClick={(e) => {
                                if(!window.confirm("do you want to logout")){
                                    e.preventDefault();
                                }else{
                                    logoutAction()
                                }
                            }}
                        >
                            <p className="text-red-500">
                                {(() => {
                                    const Icon = TbLogout2 as React.ComponentType<{ size?: number }>;
                                    return <Icon size={30} />;
                                })()}
                            </p>
                        </div>
                    </nav>
                ) : (
                    //not collapsed
                    <nav>
                        <div  className="flex justify-between items-center mb-8">
                            <div className="flex">
                                <img src={"/apple-touch-icon.png"} alt={"rateviaImage"} width={22} height={12}  className="mr-1" />
                                <h1 className="font-bold">Ratevia</h1>
                            </div>
                            <div onClick={toggleOpen}>
                                {(() => {
                                    const Icon = FiSidebar as React.ComponentType<{ size?: number }>;
                                    return <Icon size={20} />;
                                })()}
                            </div>
                        </div>
                        <div>
                            <ul>
                                {MenuItems.map((item, index) => {
                                    const isActive = pathname === item.link;
                                    return(
                                        <li key={index}>
                                            <Link to={item.link} className={` flex items-center p-1 my-2 hover:text-[rgb(var(--lines))] ${isActive ? "bg-[rgb(var(--primary))] rounded-md" : "bg-transparent"}`}>
                                            <span className="mr-2">{item.icon}</span> {item.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div 
                            className="absolute bottom-5 w-[89%] rounded-md flex justify-between p-2 bg-[rgb(var(--background))] cursor-pointer items-center"
                            onClick={(e) => {
                                if(!window.confirm("do you want to logout")){
                                    e.preventDefault();
                                }else{
                                    logoutAction()
                                }
                            }}
                        >
                            <div className="flex items-center">
                                <span className="mr-2">
                                    {user?.profilePhoto ? (
                                        <img src={`${user?.profilePhoto}`} alt={"rateviaProfileImage"} width={22} height={12}  className="mr-1 rounded-full" />
                                    ) : (
                                        (() => {
                                        const Icon = FaRegUserCircle as React.ComponentType<{ size?: number }>;
                                        return <Icon size={35} />;
                                    })()
                                    )}
                                </span>
                                <span>
                                    <p className="text-sm">{user?.name ?? "Guest..."}</p>
                                    <p className="text-[10px]">{user?.email ?? "guest@gmail.com"}</p>
                                </span>
                            </div>
                            <p className="text-red-500">
                                {(() => {
                                    const Icon = TbLogout2 as React.ComponentType<{ size?: number }>;
                                    return <Icon size={30} />;
                                })()}
                            </p>
                        </div>
                    </nav>
                )}
                
            </section>
        </>
    )
}

export default Sidebar;