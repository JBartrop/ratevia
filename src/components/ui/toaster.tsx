import React, { useEffect, useState } from "react";


interface ToastProps{
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
    // onClose: () => void;
};


const Toaster:React.FC<ToastProps> = ({message, type, duration = 3000}) => {

    const [visible, setVisible] = useState(true);

    const typeStyles: Record<"success" | "error" | "info", string> = {
        success: " text-green-700 border border-green-300",
        error: " text-red-700 border border-red-300",
        info: " text-blue-700 border border-blue-300",
    };

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    },[duration])

     if (!visible) return null;


    return(
        <div className={`fixed top-6 right-6 px-4 py-3 z-50 rounded-lg shadow-lg transition-opacity ${typeStyles[type]}`}>
            {message}
        </div>
    )
}

export default Toaster;