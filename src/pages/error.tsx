import React from "react";
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from "react-router-dom";



const Error: React.FC = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    const errorMessage = "404 unknown page error"
    
    if(isRouteErrorResponse(error)){
        console.log(error.status)
    }

    return(
        <section className="w-screen h-screen flex justify-center text-center">
            <div className="bg-[rgb(var(--card))] text-[rgb(var(--text))] h-1/2 w-1/2 m-auto rounded-xl p-6 ">
                <h1 className="text-4xl text-red-400 my-4 pt-3 ">There was an error</h1>
                <p className="my-4">{errorMessage}</p>
                <div className="flex text-center justify-center items-center">
                    <p  
                        onClick={() => navigate(-1)} 
                        className="cursor-pointer bg-[rgb(var(--primary))] font-bold hover:bg-[rgb(var(--secondary))] m-2 p-4 rounded-xl duration-300"
                    >
                        Go back
                    </p>
                    <p 
                        className="cursor-pointer bg-[rgb(var(--primary))] font-bold hover:bg-[rgb(var(--secondary))] m-2 p-4 rounded-xl duration-300"
                    >
                        <Link to="/dashboard">Go home</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Error;