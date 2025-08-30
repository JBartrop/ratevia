import React from "react";
import OtpInput from "../../components/otp-input";
import Button from "../../components/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const ForgottenPasswordOtp: React.FC = () => {
    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1>ForgottenPasswordOtp</h1>
        </section>
    )
}

export default ForgottenPasswordOtp;