import React, { ReactNode, useEffect } from "react";

interface ModalProps {
    title?:string;
    description?:string;
    children:ReactNode;
    onClose: () => void;
    isOpen: boolean;
};


const Modal:React.FC<ModalProps> = ({title, isOpen, description, children, onClose}) => {

    useEffect(() => {
        const handleEsc = (e:KeyboardEvent) => {
            if(e.key === "Escape")onClose()
        };
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [onClose])


    if (!isOpen) return null;

    return (
            <div onClick={onClose} className="fixed inset-0 duration-300 bg-black/50 backdrop-opacity-50 flex justify-center items-center z-50">
                <div onClick={(e) => e.stopPropagation()} className="bg-[rgb(var(--card))] relative inset-0 rounded-lg p-6 sm:w-1/2 w-5/6 max-h-96 animate-fadeIn ">
                    <button
                      onClick={onClose}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg"
                    >
                      ✕
                    </button>
                    <div className="mb-4">
                        {title && <h1 className="text-lg font-semibold">{title}</h1>}
                        {description && <h1 className="text-sm font-semibold text-[rgb(var(--muted))]">{description}</h1>}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {children}
                    </div>
                    
                </div>
            </div>
    )
}

export default Modal;