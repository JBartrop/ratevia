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

interface ErrorProps{
    email:string;
    password: string;
}

const ErrorValue : ErrorProps = {
    email: "",
    password: "",
}


const Login: React.FC = () => {
    const [logindata, setLoginData] = useState<LoginProps>(LoginValue)
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [iserror, setIserror] = useState<ErrorProps>(ErrorValue);
    const router = useNavigate()

    const handleChange =(event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = event.target;
        const fieldValue = type === "checkbox" ? checked : value;
        const errormessage = validateUser(name, value)
        setLoginData((prevData) => ({
            ...prevData,
            [name]: fieldValue,
        }))

        setIserror((prevError) => ({
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
                case "password":
                if (value.length < 6) return "Password must be at least 6 characters";
                return "";
            default:
            return "";
        }
    };

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
    logindata.password.trim() !== "" &&
    validateUser("email", logindata.email) === "" &&
        validateUser("password", logindata.password) === "" ;

    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
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
                onerror={true}
                errorMessage={iserror.email}
                showicon={(() => {
                    const Icon = MdMailOutline as React.ComponentType<{ size?: number }>;
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
                onerror={true}
                errorMessage={iserror.password}
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
                value="Log in"
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
                  onClick={() => alert("Google login not implmented")}
                  className="flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 w-full hover:bg-gray-100 transition"
                >
                    {(() => {
                        const Icon = FcGoogle as React.ComponentType <{ size?: number }>;
                        return <Icon size={20} />
                    })()}

                    <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>
            </div>


            <div className="mt-4">Don't have an account? <a href="/auth/register" className="text-sm sm:text-base hover:text-[rgb(var(--primary))] text-[rgb(var(--secondary))]"> Sign up</a></div>
        </section>
    )
}

export default Login;