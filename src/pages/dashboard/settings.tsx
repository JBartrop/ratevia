import React from "react";
import FormSteps from "../../components/stepsPage";


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
        </section>
    )
}

export default Settings;