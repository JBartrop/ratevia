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



interface Registerprops{
    name:string;
    email:string;
    password: string;
    accept:boolean;
}

const RegisterValue: Registerprops = {
    name: "",
    email: "",
    password: "",
    accept:false,
}

interface Errorprops{
    name:string;
    email:string;
    password: string;
}


const ErrorValue: Errorprops = {
    name: "",
    email: "",
    password: "",
}



const Register: React.FC = () => {
    const [registerdata, setRegisterdata] = useState<Registerprops>(RegisterValue);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [iserror, setIserror] = useState<Errorprops>(ErrorValue);
    const router = useNavigate()

        const handleChange =(event:React.ChangeEvent<HTMLInputElement>) => {
            const {name, value, type, checked} = event.target;
            const fieldValue = type === "checkbox" ? checked : value;
            const errormessage = validateUser(name, value)
            setRegisterdata((prevData) => ({
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
                case "name":
                    if (value.length < 3) return "Name must be at least 3 characters";
                    return "";

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
                console.log(registerdata)
                // localStorage.setItem("Ratevia", JSON.stringify(registerdata))
                await new Promise<void>((res) => setTimeout(res, Math.random() * 2000))
                toast.success("register successfull")
                router("/auth/login")
                setSubmitting(false)
            }catch(error:any){
                console.log(error.message)
                toast.error("could not register")
                setSubmitting(false)
            }
            finally{
                setSubmitting(false)
            }
        }

        const formComplete = 
        registerdata.email.trim() !== "" &&
        registerdata.password.trim() !== "" &&
        validateUser("email", registerdata.email) === "" &&
        validateUser("password", registerdata.password) === "" &&
        validateUser("name", registerdata.name) === "";
    


    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold text-center">Create your account</h1>
            <Input
                label="Full name"
                name="name"
                type="text"
                placeholder="enter your full name"
                value={registerdata.name}
                size="sm"
                onChange={handleChange}
                icon={true}
                onerror={true}
                errorMessage={iserror.name}
                showicon={(() => {
                    const Icon = FaRegUser as React.ComponentType<{ size?: number }>;
                    return <Icon size={20} />;
                })()}
            />
            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="enter your mail"
                value={registerdata.email}
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
                value={registerdata.password}
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
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                    <Input
                        type="checkbox"
                        size="sm"
                        name="accept"
                        checked={registerdata.accept}
                        onChange={handleChange}
                        className="accent-blue-600 h-4 w-4 mr-1"
                    />
                    <p className="text-sm sm:text-base">Accept <a href="/terms-and-conditions" className="text-sm sm:text-base hover:text-[rgb(var(--primary))] text-[rgb(var(--secondary))]">terms and conditions</a> </p>
                </div>
            </div>
            <Button
                varaint="primary"
                size="sm"
                disabled={!formComplete || submitting}
                value="Create account"
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


            <div className="mt-4 text-center">Already have an account? <a href="/auth/login" className="text-sm sm:text-base hover:text-[rgb(var(--primary))] text-[rgb(var(--secondary))]"> Login</a></div>
        </section>
    )
}

export default Register;