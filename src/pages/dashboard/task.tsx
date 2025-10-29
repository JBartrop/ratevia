import React, { useEffect, useState } from "react";
import Table from "../../components/ui/table";
import Input from "../../components/ui/input";
import { FaSearch } from "react-icons/fa";
import Button from "../../components/ui/button";
import { toast } from "react-toastify";
import { BiEdit, BiTrash } from "react-icons/bi";



export interface TaskRow {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

const listuser = [
  { id: "1", name: "John Doe", role: "Admin", email: "john@example.com", phone: "555-123-4567" },
  { id: "2", name: "Jane Smith", role: "User", email: "jane@example.com", phone: "555-987-6543" },
  { id: "3", name: "Michael Johnson", role: "Manager", email: "michael@example.com", phone: "555-111-2222" },
  { id: "4", name: "Emily Davis", role: "User", email: "emily@example.com", phone: "555-333-4444" },
  { id: "5", name: "David Brown", role: "Support", email: "david@example.com", phone: "555-555-6666" },
  { id: "6", name: "Sarah Wilson", role: "Admin", email: "sarah@example.com", phone: "555-777-8888" },
  { id: "7", name: "James Miller", role: "User", email: "james@example.com", phone: "555-999-0000" },
  { id: "8", name: "Olivia Taylor", role: "Manager", email: "olivia@example.com", phone: "555-444-2222" },
  { id: "9", name: "William Anderson", role: "User", email: "william@example.com", phone: "555-111-9999" },
  { id: "10", name: "Sophia Martinez", role: "Support", email: "sophia@example.com", phone: "555-888-3333" },
  { id: "11", name: "Benjamin Lee", role: "User", email: "benjamin@example.com", phone: "555-222-5555" },
  { id: "12", name: "Ava Thompson", role: "Admin", email: "ava@example.com", phone: "555-666-1111" },
  { id: "13", name: "Ethan White", role: "Support", email: "ethan@example.com", phone: "555-333-7777" },
  { id: "14", name: "Charlotte Harris", role: "Manager", email: "charlotte@example.com", phone: "555-000-8888" },
  { id: "15", name: "Henry Clark", role: "User", email: "henry@example.com", phone: "555-444-6666" },
  { id: "16", name: "Amelia Lewis", role: "User", email: "amelia@example.com", phone: "555-777-4444" },
  { id: "17", name: "Alexander Walker", role: "Admin", email: "alex@example.com", phone: "555-999-1111" },
  { id: "18", name: "Mia Young", role: "Support", email: "mia@example.com", phone: "555-222-8888" },
  { id: "19", name: "Daniel Hall", role: "Manager", email: "daniel@example.com", phone: "555-555-0000" },
  { id: "20", name: "Harper Allen", role: "User", email: "harper@example.com", phone: "555-123-9999" }
]


const Task : React.FC = () => {

    const [editingRow, setEditingRow] = useState<TaskRow | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [Users, setUsers] = useState <TaskRow[]>(listuser)

const Headers = [
    { id: "name", header: "Name" },
    { id: "role", header: "Role" },
    { id: "email", header: "Email" },
    { id: "phone", header: "Phone" },
  ]
    




    const editrow = (values: TaskRow) => {
        setEditingRow(values)
    };

    const deleterow = (values: TaskRow) => {
         setUsers((prev) => prev.filter((item) => item.id !== values.id));
         toast.success(`${values.name} deleted successfully!`);
    };

    return(
        <section className="w-full bg-[rgb(var(--card))] p-4 rounded-md">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--text))]" >All Task Management</h1>
                </div>
                <div className="flex">
                    {/* anythig  */}
                </div>
            </div>
            
            <Table   
                header={Headers } 
                data={Users}
                actions={[
                    { label: "Edit", icon:(() => {
                                                const Icon = BiEdit as React.ComponentType<{ size?: number }>;
                                                return <Icon size={15} />;
                                            })(), onClick: (row) => editrow(row), className: "bg-transparent border border-[rgb(var(--primary))] text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/20" },
                    { label: "Delete",icon:(() => {
                                                const Icon = BiTrash as React.ComponentType<{ size?: number }>;
                                                return <Icon size={15} />;
                                            })(), onClick: (row) =>  deleterow(row), className: "bg-transparent border border-red-600 text-red-600 hover:bg-red-100/50" },
                ]}
            />

            {editingRow && (
            <div onClick={() => setEditingRow(null)} className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
                <div onClick={(e) => e.stopPropagation()} className="bg-[rgb(var(--card))] p-6 rounded-lg w-5/6 sm:w-4/6 lg:w-1/2 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Edit User</h2>
                    <p>{editingRow.name}</p>
                    <p className="cursor-pointer" onClick={() => setEditingRow(null)}>close</p>
                    <div className="mt-6 flex justify-end gap-2">
                        <Button 
                            type="button"
                            varaint="primary" 
                            size="sm" 
                            value="Save" 
                            onClick={() => console.log(editingRow)}
                            className="px-3"
                        />
                        <Button 
                            type="button"
                            varaint="primary" 
                            size="sm" 
                            value="Close" 
                            onClick={() => setEditingRow(null)}
                            className= "bg-red-600 text-white hover:bg-red-600/80 px-3"
                        />

                    </div>
                </div>
            </div>
            )}
        </section>
    )
}

export default Task;