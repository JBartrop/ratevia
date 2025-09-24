import React, { useState } from "react";
import Button from "./button";



interface TableHeaderProps{
    id:string;
    header:string;
}


interface TableAction<T> {
  label: string;
  onClick: (row: T, action: string) => void;
  className?: string;
}


interface TableProps<T> {
    header: TableHeaderProps[];
    data:T[];
    loading?: boolean; 
    className?: string;
    actions?: TableAction<T>[];
}


const Table = <T extends { id: string | number }>({loading, header, data, className, actions}:TableProps<T>) => {

    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const tableoptions = [
        {name:"10" },
        {name:"15" }, 
        {name:"20" },
        {name:"25" },
        {name:"50" },
    ]

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const lastItemIndex = currentPage * itemsPerPage; 
    const startItemIndex =  lastItemIndex - itemsPerPage;
    const currentItems = data.slice(startItemIndex, lastItemIndex)


    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }
    return(
        <section className={`w-full  ${className ?? ""}`}>
            <div className="overflow-x-auto">
            <div className="flex items-center gap-2 px-2 py-4">
                <span>Show</span>
                <select
                value={itemsPerPage}
                onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
                 className=" outline-none px-3 py-1 border border-gray-300 rounded-md text-sm bg-white shadow-sm"
                >
                    {tableoptions.map((opt) => (
                        <option 
                        value={opt.name} 
                        key={opt.name} 
                        className="bg-white outline-none border-none text-gray-700 hover:bg-green-100">{opt.name}</option>
                    ))}
                </select>
            </div>
            <table className="min-w-full overflow-x-auto border border-gray-200 rounded-md">
                <thead>
                    <tr>
                        {header.map((h) => (
                            <th key={h.id} className="px-4 py-2 text-left text-sm font-semibold text-[rgb(var(--text))]">
                                {h.header}
                            </th>
                        ))}  
                        {actions && actions.length > 0 && (
                            <th className="px-4 py-2 pr-10 text-right text-sm font-semibold text-[rgb(var(--text))]">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    
                    {currentItems.length > 0 ? (
                        currentItems.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {header.map((col) => (
                                    <td key={col.id}  className="px-4 py-2 border-t text-sm text-[rgb(var(--text))]">
                                        {(row as any)[col.id] ?? "-"}
                                    </td>
                                ))}
                                {actions && actions.length > 0 && (
                                    <td className="px-4 py-2 border-t text-sm text-[rgb(var(--text))] flex justify-end gap-2">
                                        {actions.map((action, i) => (
                                          <button
                                            key={i}
                                            onClick={() => action.onClick(row, action.label)}
                                            className={`px-2 py-1 rounded-md text-xs font-medium border hover:opacity-80 transition ${action.className ?? "bg-blue-600 text-white"}`}
                                          >
                                            {action.label}
                                          </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={header.length + (actions ? 1 : 0)} className="px-4 py-4 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            <p className="pt-4 text-center text-sm text-[rgb(var(--text))]/50">A list of all data</p>
            {data.length > itemsPerPage && (
                <div className="flex justify-between items-center my-6">
                    <div>
                        <div>
                            showing {startItemIndex + 1} to {Math.min(lastItemIndex, data.length)} of {data.length} enteries;
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button 
                            type="button"
                            varaint="primary" 
                            size="sm" 
                            value="Previous" 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1} 
                        />
                        <Button 
                            type="button"
                            varaint="primary" 
                            size="sm" 
                            value="Next" 
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </div>
                </div>
            )}
            
            </div>
        </section>
    )
}

export default Table;