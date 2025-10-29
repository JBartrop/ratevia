import React, { ReactNode, useState } from "react";
import Button from "./button";


interface TabProps{
    id:string;
    label:string;
    content:ReactNode;
};

interface TabSwitcherProps{
    tabs:TabProps[];
    defaultActive?:string;
    className?: string;
};

const Tabs:React.FC<TabSwitcherProps> = ({tabs, defaultActive, className}) => {

    const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);

    return(
        <div className={`w-full ${className || ""}`}>

            <div className="flex border-b border-[rgb(var(--muted))]">
                {tabs.map((tab) => (
                    <Button
                    key={tab.id}
                     varaint="primary"
                     size="md"
                     type="button"
                     onClick={() => setActiveTab(tab.id)}
                     value={tab.label} 
                     className={`py-2 bg-transparent px-6 transition-colors font-medium ${activeTab === tab.id ?"border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-blue-400"}`}
                    />
                ))}
            </div>

            <div className="py-4">
                {tabs.map((tab) => activeTab == tab.id && (
                    <div key={tab.id} className="animate-fadeIn">
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tabs;