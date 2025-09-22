'use client';
import React, { ReactNode, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";



interface InputProps{
    label?:string;
    type:string;
    name:string;
    placeholder?:string;
    value?:string;
    size: "sm" | "md" | "lg";
    onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void;
    password?:boolean;
    onerror?: boolean;
    errorMessage?:string;
    success?: boolean;
    // requiredField?:boolean;
    disabled?:boolean;
    icon?: boolean;
    showicon?:ReactNode;
    className?:string
    checked?:boolean
}



const Input: React.FC <InputProps> = ({label, type, name, placeholder, value, size, onChange, disabled, password, icon, showicon, className, checked, onerror, errorMessage}) => {
    const [showpassword, setShowpassword] = useState<boolean>(false)

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
        sm: " text-sm rounded-lg",
        md: " text-base rounded-lg",
        lg: "text-lg rounded-xl",
    };

    const inputType = password ? (showpassword ? "text" : "password") : type;

    return(
        <div>
            <p className="text-start font-semibold">{label}</p>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-[rgb(var(--secondary))] " >
                        {showicon}
                    </div>
                )}
            <input
                type={inputType}
                name={name}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={onChange}
                checked={checked}
                className={`w-full border-[rgb(var(--muted))] bg-[rgb(var(--background))] focus:ring-1 focus:ring-blue-200 py-3 my-3 outline-none transition ${icon ? "px-12" : "px-0"} ${sizeClasses[size]} ${className}`}
            />
                {password && (
                    <button onClick={() => setShowpassword(prev => !prev)} className="absolute inset-y-0 right-0 flex items-center pr-6 text-[rgb(var(--secondary))]" >
                    {(() => {
                        const Icon = (showpassword ? FiEyeOff : FiEye) as React.ComponentType<{ size?: number }>;
                        return <Icon size={20} />;
                    })()}
                    </button>
                )}
            </div>
            {onerror && <p className="text-red-400 text-sm text-start">{errorMessage}</p>}
        </div>
    )
}

export default Input;