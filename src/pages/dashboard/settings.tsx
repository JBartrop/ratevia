import React from "react";
import FormSteps from "../../components/stepsPage";
import SwiperCarousel from "../../components/swiper";


const Settings : React.FC = () => {
    return(
        <section>
            <h1>Settings</h1>
            <FormSteps steps={
                [
        {
          id: "s1",
          title: "Account Info",
          content: <p>Step 1: Enter your account details here.</p>,
        },
        {
          id: "s2",
          title: "Profile Setup",
          content: <p>Step 2: Fill in your profile information.</p>,
        },
        {
          id: "s3",
          title: "Confirmation",
          content: <p>Step 3: Review and confirm your details.</p>,
        },
      ]
            } />


            <SwiperCarousel
            items={[
        <div className="bg-blue-200 h-64 mx-1 shadow-lg rounded-lg flex items-center justify-center text-2xl font-bold">
          Slide 1
        </div>,
        <div className="bg-green-200 h-64 mx-1 shadow-lg rounded-lg flex items-center justify-center text-2xl font-bold">
          Slide 2
          sleep
        </div>,
        <div className="bg-red-200 h-64 mx-1 shadow-lg rounded-lg flex items-center justify-center text-2xl font-bold">
          Slide 3
        </div>,
        <div className="bg-red-200 h-64 mx-1 shadow-lg rounded-lg flex items-center justify-center text-2xl font-bold">
          Slide 45
        </div>,
      ]} />
        </section>
    )
}

export default Settings;