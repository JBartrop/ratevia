import React, { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";


interface AccordionItem{
    id: string;
    title:string;
    content:ReactNode;
}
interface AccordionProps{
    items:AccordionItem[];
    defaultOpen?: string; 
    allowMultiple?: boolean;
}


const Accordion:React.FC<AccordionProps> = ({items, defaultOpen, allowMultiple}) => {
     
const [openItems, setOpenItems] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
        setOpenItems((prev) => (
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        ))
    }else{
        setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }
    
    return(
        <div className="w-full">
            {items.map((item) => {
                const isOpen = openItems.includes(item.id)
                return(
                    <div key={item.id} className="border-b border-[rgb(var(--muted))]  transition-all duration-500 ease-in-out">
                        <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full transition-all duration-500 ease-in-out flex justify-between items-center py-3 text-left font-medium hover:text-[rgb(var(--primary))]"
                        >
                            {item.title}
                            {(() => {
                                const Icon = FiChevronDown as React.ComponentType<{ size?: number , className?: string}>;
                                return <Icon size={20} className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />;
                            })()}
                        </button>
                         <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isOpen ? "h-auto opacity-100 py-3" : "max-h-0 opacity-0 py-0"
                            }`}
                            >
                            <p className="bg-[rgb(var(--card))] p-3 rounded-md">
                                {item.content}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Accordion;