import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";

interface ResetProps{
    password:string;
    confirmPassword: string;
}

const Resetvalue: ResetProps = {
    password: "",
    confirmPassword: "",
}

const errorvalue: ResetProps = {
    password: "",
    confirmPassword: "",
}



const ResetPassword: React.FC = () => {
    const [resetdata, setResetdata] = useState<ResetProps>(Resetvalue);
    const [errordata, seterrordata] = useState<ResetProps>(errorvalue);
     const [notmatching, setnotmatching] = useState<boolean>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useNavigate()


    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setResetdata((prevData) => ({
            ...prevData,
            [name]: value
        }))
        const errormessage = validatePassword(name, value)
        seterrordata((prevError) => ({
            ...prevError,
            [name]: errormessage
        }))
    }


    const validatePassword = (errortype:string, value: string) => {
        switch(errortype){
            case "password":
                if (value.length < 6) return "Password must be at least 6 characters";
                return "";
            case "confirmPassword":
                if (value.length < 6) return "Password must be at least 6 characters";
                return "";
            default:
            return "";
        }
    };

    useEffect(() => {
        if(resetdata.password.length >=6 && resetdata.confirmPassword.length >=6){
            if(resetdata.password === resetdata.confirmPassword){
                setnotmatching(false)
            }else{
                setnotmatching(true)
            }
        }else{
            setnotmatching(undefined)
        }
    },[resetdata])

    const submitForm = async (): Promise<void> => {
        setSubmitting(true)
        try{
            await new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
            toast.success("password changed")
            await new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
            router("/auth/login")
            setSubmitting(false)
        }catch(error:any){
            console.log(error.message)
            toast.error("Error updating password")
            setSubmitting(false)
        }finally{
            setSubmitting(false)
        }
    }


    const formComplete = resetdata.password.trim() !== "" && resetdata.confirmPassword.trim() !== "";



    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold text-center">Reset Password</h1>
            <Input
                label="Enter new password"
                name="password"
                type="password"
                placeholder="enter your new password"
                value={resetdata.password}
                size="sm"
                onChange={handleChange}
                icon={true}
                password={true}
                onerror={true}
                errorMessage={errordata.password}
                showicon={(() => {
                    const Icon = IoKeyOutline as React.ComponentType<{ size?: number }>;
                    return <Icon size={20} />;
                })()}
            />
            <Input
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                placeholder="confirm your new password"
                value={resetdata.confirmPassword}
                size="sm"
                onChange={handleChange}
                icon={true}
                password={true}
                onerror={true}
                errorMessage={errordata.confirmPassword}
                showicon={(() => {
                    const Icon = IoKeyOutline as React.ComponentType<{ size?: number }>;
                    return <Icon size={20} />;
                })()}
            />
            {notmatching === true && (
                <p className=" text-red-500 my-2">Passwords do not match.</p>
            )}
            {notmatching === false && (
                <p className=" text-green-500 my-2">Passwords match.</p>
            )}
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

export default ResetPassword;