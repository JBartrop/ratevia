import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";



const Ratevia: React.FC = () => {
    const router = useNavigate()

    const register =() => {
        router("/auth/register")
    }

    const login =() => {
        router("/auth/login")
    }

    return(
        <section className=" h-lvh flex items-center justify-between max-[640px]:flex-col p-10  duration-300">
            <div className="sm:w-1/2 sm:mr-4 w-full">
                <img src={"/android-chrome-512x512.png"} alt={"rateviaImage"} className=" sm:h-auto h-32 max-[640px]:items-center w-auto  block" />
            </div>
            <div className="sm:w-1/2 w-full sm:ml-4 flex justify-center items-center max-[640px]:h-lvh "> 
            <div className="w-full sm:w-4/6">
                <h1 className="lg:text-5xl md:text-4xl text-3xl mb-8 font-bold">Organize your things now</h1>
                <p className="lg:text-3xl md:text-2xl text-xl font-semibold mb-5">Join today.</p>
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
                <div className="my-6 flex items-center justify-center gap-2">
                    <div className="h-px bg-gray-300 w-full" />
                    <p className="text-sm text-gray-500">or</p>
                    <div className="h-px bg-gray-300 w-full" />
                </div>
                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        varaint="primary"
                        size="sm"
                        value="Create account"
                        className="w-full bg-transparent border border-gray-300 my-4 hover:bg-[rgb(var(--card))]"
                        onClick={register}
                    />
                </div>
                <p>Already have an account?</p>
                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        varaint="primary"
                        size="sm"
                        value="Log in"
                        className="w-full bg-transparent border border-gray-300 my-4 hover:bg-[rgb(var(--card))]"
                        onClick={login}
                    />
                </div>
            </div>
            </div>
        </section>
    )
}

export default Ratevia;