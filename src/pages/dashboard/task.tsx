import React from "react";
import Table from "../../components/table";


const Task : React.FC = () => {
    return(
        <section className="w-full">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 >Name</h1>
                </div>
                <div className="flex">
                    <p>filter</p>
                    <p>search</p>
                </div>
            </div>
            
            <Table   header={[
    { id: "name", header: "Name" },
    { id: "role", header: "Role" },
    { id: "email", header: "Email" },
    { id: "phone", header: "Phone" },
  ]}
  data={[
    {id:"1", name: "John Doe", role: "Admin", email: "john@example.com" , phone: "yes"},
    {id: "2" , name: "Jane Smith", role: "User", email: "jane@example.com" },
  ]}
    actions={[
    { label: "Edit", onClick: (row) => console.log("Edit", row), className: "bg-green-600 text-white" },
    { label: "Delete", onClick: (row) => console.log("Delete", row), className: "bg-red-600 text-white" },
  ]} />
        </section>
    )
}

export default Task;