import React, { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";

interface forgottenProps{
    email: string;
}

const ForgottenEmail: forgottenProps = {
    email: "",
}


const ForgottenErrorEmail: forgottenProps = {
    email: "",
}



const ForgottenPassword: React.FC = () => {
    const [forgottendata, setforgottendata] = useState<forgottenProps>(ForgottenEmail)
    const [errordata, seterrordata] = useState<forgottenProps>(ForgottenErrorEmail)
    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useNavigate()

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setforgottendata((prevData) => ({
            ...prevData,
            [name]: value
        }))
        const errormessage =  validateUser(name, value)
        seterrordata((prevError) => ({
            ...prevError,
            [name]: errormessage
        }))
    }

    const validateUser = (errortype:string, value: string) => {
        switch(errortype){
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Invalid email address";
                return "";
            default:
            return "";
        }
    };

        const submitForm = async (): Promise<void> => {
            setSubmitting(true)
            try{
                await new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
                localStorage.setItem("mailratevia", forgottendata.email);
                toast.info("otp sent")
                router("/auth/forgotten-password-otp")
            }catch(error:any){
                console.log(error.message)
                toast.error("Invalid Email")
                setSubmitting(false)
            }finally{
                setSubmitting(false)
            }
        }

    const formComplete = forgottendata.email.trim() !== "";


    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold text-center">Forgotten Password</h1>
            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="enter your mail"
                value={forgottendata.email}
                size="sm"
                onChange={handleChange}
                icon={true}
                onerror={true}
                errorMessage={errordata.email}
                showicon={(() => {
                    const Icon = MdMailOutline as React.ComponentType<{ size?: number }>;
                    return <Icon size={20} />;
                })()}
            />
            <Button
                type="submit"
                varaint="primary"
                size="sm"
                disabled={!formComplete || submitting}
                value="Enter"
                className="w-full"
                loading={submitting}
                onClick={submitForm}
            />
        </section>
    )
}

export default ForgottenPassword;