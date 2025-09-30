import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";


interface OptionProps {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  label?: string;
  options: OptionProps[];
  value?: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}


const MultiSelect:React.FC<DropdownSelectProps> = ({label, options, value, onChange, size = "md", disabled,className}) => {

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
        sm: "text-sm py-2 px-2 rounded-lg",
        md: "text-base py-3 px-3 rounded-lg",
        lg: "text-lg py-4 px-4 rounded-xl",
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <div className="w-full" ref={ref}>
            {label && <p className="text-start font-semibold">{label}</p>}
            <div className={`relative border border-[rgb(var(--muted))] bg-[rgb(var(--background))] transition ${sizeClasses[size]} ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : "cursor-pointer hover:border-blue-300"} ${className}`}
                onClick={() => !disabled && setOpen((prev) => !prev)}>

                <div className="flex items-center justify-between">
                    <span className={selectedOption ? "text-[rgb(var(--text))] " : "text-gray-400"}>
                        {selectedOption ? selectedOption.label : "Select..."}
                    </span>
                    {(() => {
                        const Icon = FiChevronDown as React.ComponentType<{ size?: number , className?: string}>;
                        return <Icon size={20} className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`} />;
                    })()}
                </div>

                {open && !disabled && (
                     <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fadeIn">
                        {options.map((opt) => (
                            <div key={opt.value} onClick={() => { onChange(opt.value); setOpen(false);}} className={`px-4 py-2 transition-colors ${value === opt.value ? "text-[rgb(var(--primary))] bg-[rgb(var(--primary))]/50 font-medium" : "hover:bg-gray-100 text-gray-700"} `}>
                                {opt.label}
                            </div>
                        ))}
                     </div>
                )}
            </div>
        </div>
    )
}

export default MultiSelect;