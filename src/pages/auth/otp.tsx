import React from "react";
import OtpInput from "../../components/otp-input";



const Otp: React.FC = () => {
    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-8 m-8 lg:w-2/5 sm:w-4/6 w-full  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold">Otp</h1>
            <OtpInput length={6} />
        </section>
    )
}

export default Otp;