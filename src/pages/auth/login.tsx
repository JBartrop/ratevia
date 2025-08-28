import React, { useState } from "react";
import Input from "../../components/input";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../components/button";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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
    const router = useNavigate()

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
            toast.success("login successfull")
            router("/auth/otp")
            setSubmitting(false)
        }catch(error:any){
            console.log(error.message)
            toast.error("could not login")
            setSubmitting(false)
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
                <div><a href="/auth/forgotten-password" className="text-sm sm:text-base hover:text-[rgb(var(--primary))] text-[rgb(var(--secondary))]">forgotten password?</a></div>
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

            <div className="my-6 flex items-center justify-center gap-2">
                <div className="h-px bg-gray-300 w-full" />
                <p className="text-sm text-gray-500">or</p>
                <div className="h-px bg-gray-300 w-full" />
            </div>

            <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => alert("Google login")}
                  className="flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 w-full hover:bg-gray-100 transition"
                >
                    {(() => {
                        const Icon = FcGoogle as React.ComponentType <{ size?: number }>;
                        return <Icon size={20} />
                    })()}

                    <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Apple login")}
                  className="flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 w-full hover:bg-gray-100 transition"
                >
                    {(() => {
                        const Icon = FaApple as React.ComponentType <{ size?: number }>;
                        return <Icon size={20} />
                    })()}
                    <span className="text-sm font-medium text-gray-700">Continue with Apple</span>
                </button>
            </div>


            <div className="mt-4">Don't have an account? <a href="/auth/register" className="text-sm sm:text-base hover:text-[rgb(var(--primary))] text-[rgb(var(--secondary))]"> Register</a></div>
        </section>
    )
}

export default Login;