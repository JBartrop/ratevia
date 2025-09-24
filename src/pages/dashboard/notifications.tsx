import React from "react";
import Card from "../../components/card";


const Notifications : React.FC = () => {
    return(
        <section>
            <h1>notification</h1>
            <Card 
                title="User Management"
                description="Manage all system users with roles, emails, and contact details."
                actions={
                <button className="px-3 py-1 rounded-md bg-[rgb(var(--primary))] text-[rgb(var(--buttonText))]">
                  + Add User
                </button>
                }
            ></Card>
        </section>
    )
}

export default Notifications;