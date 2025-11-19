import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";


interface OptionProps<T>  {
  value: T;
  label: string | number;
}

interface DropdownSelectProps<T> {
  label?: string;
  options: OptionProps<T>[];
  value?: string | number;
  onChange: (value: T) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}


const MultiSelect = <T extends string | number> ({label, options, value, onChange, size = "md", disabled,className}: DropdownSelectProps<T>) => {

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
        sm: "text-sm py-1 px-1 rounded-lg",
        md: "text-base py-2 px-2 rounded-lg",
        lg: "text-lg py-3 px-3 rounded-xl",
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
                     <div onClick={() => !disabled && setOpen((prev) => !prev)} className="absolute left-0 mt-4 w-full bg-[rgb(var(--background))] border border-[rgb(var(--background))]/30 rounded-lg shadow-lg z-10 animate-fadeIn">
                        {options.map((opt) => (
                            <div key={opt.value} onClick={(e) => { e.stopPropagation(); onChange(opt.value); setOpen(false);}} className={`px-4 py-2 transition-colors ${value === opt.value ? "text-[rgb(var(--text))] bg-[rgb(var(--primary))]/60 font-medium rounded-lg" : "hover:bg-[rgb(var(--primary))]/30 rounded-lg text-[rgb(var(--text))]"} `}>
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