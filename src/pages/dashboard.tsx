import React from "react";
import ThemeToggle from "../components/toggle";



const Dashboard: React.FC = () => {
    return(
        <section>
            {/* <ThemeToggle /> */}
            <h1 className="text-[rgb(var(--header-text))] font-bold">dashboard</h1>
            <p className="text-[rgb(var(--text))] font-bold">hello world</p>
            <div className="h-28 p-30 m-14 w-28 text-[rgb(var(--text))] bg-[rgb(var(--card))] ">
                hello
            </div>
        </section>
    )
}

export default Dashboard;