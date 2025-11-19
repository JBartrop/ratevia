import React, { useState } from "react";
import MultiSelect from "../../components/ui/multi-select";
import Input from "../../components/ui/input";
import Tabs from "../../components/ui/tabs";


const Account : React.FC = () => {
    return(
        <section>
            <h1>Account</h1>
                <div className="p-6 max-w-sm">

    </div>

    <div className="max-w-lg mx-auto mt-10">
      <Tabs
        tabs={[
          {
            id: "login",
            label: "Login",
            content: (
              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  size="md"
                  placeholder="Enter email"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  size="md"
                  placeholder="Enter password"
                  password
                />
              </div>
            ),
          },
          {
            id: "signup",
            label: "Sign Up",
            content: (
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  name="fullname"
                  size="md"
                  placeholder="Enter full name"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  size="md"
                  placeholder="Enter email"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  size="md"
                  placeholder="Create password"
                  password
                />
              </div>
            ),
          },
        ]}
      />
    </div>
        </section>
    )
}

export default Account;