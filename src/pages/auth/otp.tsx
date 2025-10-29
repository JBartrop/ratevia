import React, { useEffect, useState } from "react";
import OtpInput from "../../components/ui/otp-input";
import Button from "../../components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Otp: React.FC = () => {
    const [otp, setOtp] = useState<string>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>();
    const [timeLeft, setTimeLeft] = useState<number>(0); 
    const [triesLeft, setTriesLeft] = useState<number>(3); 
    const [resendDisabled, setResendDisabled] = useState<boolean>(false);
    const router = useNavigate()


    const correctOtp = "123456";

    let intervalId: NodeJS.Timeout | number;

    useEffect(() => {
        const rateviaUser = localStorage.getItem("Ratevia");
        if(rateviaUser){
            const parsedUser = JSON.parse(rateviaUser);
            const Email = parsedUser.email;
            setUserEmail(Email)
        }


        if(timeLeft > 0){
            intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        }else{
            clearInterval(intervalId); 
        }

        if (timeLeft === 0) {
            setResendDisabled(false);
        }


        return () => {clearInterval(intervalId)};

    },[timeLeft])

    const handleOtpChange = (newOtp: string[]) => {
        setOtp(newOtp.join("")); 
    };

    const handleSendOtp = () => {
        if(triesLeft > 2){
            setTriesLeft((prevTries) => prevTries - 1)
            toast.info("otp sent")
            setTimeLeft(15)
            setResendDisabled(true)
        }else if(triesLeft > 1){
            setTriesLeft((prevTries) => prevTries - 1)
            toast.info("otp sent")
            setTimeLeft(20)
            setResendDisabled(true)
        }else if(triesLeft > 0){
            setTriesLeft((prevTries) => prevTries - 1)
            toast.info("otp sent")
            setTimeLeft(25)
            setResendDisabled(true)
        }else{
            toast.error("max tries reached")
        }
    };



    const handleSave = async (): Promise<void> => {
        setSubmitting(true)
        try{
            await new Promise<void>((res) => setTimeout(res, Math.random() * 2000));
            const rateviaUser = localStorage.getItem("Ratevia");
            if(rateviaUser && correctOtp === otp){
                const parsedUser = JSON.parse(rateviaUser);
                const Email = parsedUser.email;
                const Data = {Email, otp}
                console.log(Data)
                toast.success("otp successfull")
                await new Promise<void>((res) => setTimeout(res, Math.random() * 3000));
                router("/dashboard")
                setSubmitting(false)
            }else{
                toast.error("Incorrect email or password")
                setSubmitting(false)
            }
        }catch(error:any){
            console.log(error.message)
            toast.error("incorrect otp")
            setSubmitting(false)
        }finally{
            setSubmitting(false)
        }
    }

    const isFormComplete = otp?.length === 6;



    return(
        <section className="text-[rgb(var(--text))] bg-[rgb(var(--card))] rounded-lg p-4  w-[450px] my-10  overflow-hidden">
            <h1 className="uppercase text-2xl  mb-4 font-semibold text-center">Otp</h1>
            <p className="text-center mb-4">your 6 digit code has been sent to your email <span>{userEmail}</span></p>
            <OtpInput length={6} onChange={handleOtpChange} />
            <Button
                type="submit"
                varaint="primary"
                size="sm"
                disabled={!isFormComplete ||  submitting}
                value="Enter otp"
                className="w-full mt-5"
                loading={submitting}
                onClick={handleSave}
            />
            <div>
                <button onClick={handleSendOtp} disabled={resendDisabled} className="disabled:cursor-not-allowed text-center w-full cursor-pointer text-[rgb(var(--secondary))] my-3">
                    resend otp
                </button>
            </div>
            {timeLeft > 0 && (
                <p className="text-center  text-[rgb(var(--text))] mt-2 ">{timeLeft}s left until next resend</p>
            )}
            {triesLeft === 0 && (
                <p className="text-center text-red-500 mt-2">You have reached the maximum number of tries. Please try again later.</p>
            )}
            {triesLeft > 0 && (
                <p className="text-center text-[rgb(var(--text))] mt-2">You have {triesLeft} resends left</p>
            )}
        </section>
    )
}

export default Otp;