import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const ResetPassword: React.FC = () => {
    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1>ResetPassword</h1>
        </section>
    )
}

export default ResetPassword;