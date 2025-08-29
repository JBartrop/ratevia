import React from "react";
import OtpInput from "../../components/otp-input";



const Otp: React.FC = () => {
    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold">Otp</h1>
            <OtpInput length={6} />
            <div>
                <p>resend otp</p>
            </div>
        </section>
    )
}

export default Otp;