import React from "react";



interface TableHeaderProps{
    id:string;
    header:string;
}

interface TableRowData {
    id: string | number;
    [key: string]: React.ReactNode; 
}

interface TableAction {
  label: string;
  onClick: (row: TableRowData, action: string) => void;
  className?: string;
}


interface TableProps {
    header: TableHeaderProps[];
    data:TableRowData[];
    loading?: boolean; 
    className?: string;
    actions?: TableAction[];
}


const Table: React.FC<TableProps> = ({loading, header, data, className, actions}) => {

    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }
    return(
        <section className={`w-full  ${className ?? ""}`}>
            <div className="overflow-x-auto">
            <table className="min-w-full overflow-x-auto border bg-[rgb(var(--card))] p-4 border-gray-200 rounded-md">
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
                    
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {header.map((col) => (
                                    <td key={col.id}  className="px-4 py-2 border-t text-sm text-[rgb(var(--text))]">
                                        {row[col.id] ?? "-"}
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
            </div>
        </section>
    )
}

export default Table;