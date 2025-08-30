import React, { useRef, useState } from "react";


interface OtpInputProps {
  length: number;
  onChange: (otp: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange}) => {

    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    

    const inputRefs = useRef<(HTMLInputElement | null)[]>(
        new Array(length).fill(null)
    );

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        onChange(newOtp);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
        ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };




    return(
        <div className="flex justify-center gap-2">
            {otp.map((data, index) => {
            return (
            <input
              type="text"
              key={index}
              value={data}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputMode="numeric"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              pattern="[0-9]*"
              className="w-12 h-12 text-center bg-[rgb(var(--background))] text-[rgb(var(--text))] border border-gray-300 rounded-md text-xl focus:border-blue-300 outline-none"
            />
            );
            })}
        </div>
    )
}

export default OtpInput;