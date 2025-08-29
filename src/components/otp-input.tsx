import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import Button from "./button";


interface OtpInputProps {
  length: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ length }) => {

    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useNavigate()
    

    const inputRefs = useRef<(HTMLInputElement | null)[]>(
        new Array(length).fill(null)
    );

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

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

    const handleSave = async (): Promise<void> => {
        setSubmitting(true)
        try{
            await new Promise<void>((res) => setTimeout(res, Math.random() * 2000));
            const newOtp = [...otp];
            const stringOtp = newOtp.join("");
            const code = stringOtp; 
            console.log(code)
            toast.success("otp successfull")
            await new Promise<void>((res) => setTimeout(res, Math.random() * 3000));
            router("/dashboard")
            setSubmitting(false)
        }catch(error:any){
            console.log(error.message)
            toast.error("incorrect otp")
            setSubmitting(false)
        }finally{
            setSubmitting(false)
        }
    }

    const isFormComplete = otp.join("").length === length;


    return(
        <form method="POST" action="/" >
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
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:border-blue-500 outline-none"
            />
            );
            })}
            </div>
            <Button
                varaint="primary"
                size="sm"
                disabled={!isFormComplete ||  submitting}
                value="login"
                className="w-full mt-5"
                loading={submitting}
                onClick={handleSave}
            />
        </form>
    )
}

export default OtpInput;