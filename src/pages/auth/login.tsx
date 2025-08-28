import React, { useState } from "react";
import Input from "../../components/input";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../components/button";
import { toast } from "react-toastify";


interface LoginProps{
    email:string;
    password: string;
    rememberMe: boolean;
}

const LoginValue : LoginProps = {
    email: "",
    password: "",
     rememberMe: false,
}


const Login: React.FC = () => {
    const [logindata, setLoginData] = useState<LoginProps>(LoginValue)
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleChange =(event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const submitForm = async (): Promise<void> => {
        setSubmitting(true)
        try{
            await new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
            console.log(logindata)
            localStorage.setItem("Ratevia", JSON.stringify(logindata))
            await new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
            toast.success("login successful")
            setSubmitting(false)
        }catch(error:any){
            console.log(error.message)
            toast.error("could not login")
        }
        finally{
            setSubmitting(false)
        }
    }

    const formComplete = 
    logindata.email.trim() !== "" &&
    logindata.password.trim() !== "";

    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-8 m-8 lg:w-2/5 sm:w-4/6 w-full  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold">Login</h1>
            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="enter your mail"
                value={logindata.email}
                size="sm"
                onChange={handleChange}
                icon={true}
                showicon={(() => {
                    const Icon = FaRegUser as React.ComponentType<{ size?: number }>;
                    return <Icon size={20} />;
                })()}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                placeholder="enter your password"
                value={logindata.password}
                size="sm"
                onChange={handleChange}
                icon={true}
                password={true}
                showicon={(() => {
                    const Icon = IoKeyOutline as React.ComponentType<{ size?: number }>;
                    return <Icon size={20} />;
                })()}
            />
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Input
                        type="checkbox"
                        size="sm"
                        name="rememberMe"
                        checked={logindata.rememberMe}
                        onChange={handleChange}
                        className="accent-blue-600 h-4 w-4 mr-1"
                    />
                    <p className="text-sm sm:text-base">Remember Me</p>
                </div>
                <div><a href="/auth/forgotten-password" className="text-sm sm:text-base hover:text-[rgb(var(--secondary))]">forgotten password?</a></div>
            </div>
            <Button
                varaint="primary"
                size="sm"
                disabled={!formComplete || submitting}
                value="login"
                className="w-full"
                loading={submitting}
                onClick={submitForm}
            />
        </section>
    )
}

export default Login;