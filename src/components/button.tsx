import React from "react";


interface ButttonProps{
    varaint:"primary" | "secondary" | "ghost";
    size:"sm" | "md" | "lg";
    loading?:boolean;
    disabled?:boolean;
    value:string;
    className:string;
    onClick?: () => void
}

const Button: React.FC <ButttonProps> = ({varaint, size, loading, value, disabled, className, onClick}) => {

    const variantClasses: Record<"primary" | "secondary" | "ghost", string> = {
        primary: " bg-[rgb(var(--primary))]  text-[rgb(var(--buttonText)]",
        secondary: " bg-[rgb(var(--secondary))] text-[rgb(var(--buttonText))]",
        ghost: "bg-[rgb(var(--muted))] text-[rgb(var(--buttonText))]",
    };

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
        sm: " text-sm p-2 rounded-lg",
        md: " text-base p-3 rounded-lg",
        lg: "text-lg p-4 rounded-xl",
    };

    const isDisabled = disabled || loading;


    return(
        <div>
            <button
            disabled={isDisabled}
            onClick={onClick}
            className={`flex justify-center items-center ${className} ${variantClasses[varaint]} ${sizeClasses[size]} ${isDisabled && 'opacity-75 cursor-not-allowed'}`}
            >
                {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                )}
                { loading ? "loading" : value}
            </button>
        </div>
    )
}

export default Button;