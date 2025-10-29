import React, { useState } from "react";
import Card from "../../components/ui/card";
import Modal from "../../components/ui/modal";
import Accordion from "../../components/ui/accordion";


const Notifications : React.FC = () => {
    const [modalcalled , setmodalcalled] = useState<boolean>(false);

    // const callmodal = () => {
    //     setmodalcalled(true)
    // }
    return(
        <section>
            <h1>notification</h1>
            <Card 
                title="User Management"
                description="Manage all system users with roles, emails, and contact details."
                actions={
                <button onClick={() => setmodalcalled(prev => !prev) } className="px-3 py-1 rounded-md bg-[rgb(var(--primary))] text-[rgb(var(--buttonText))]">
                  + Add User
                </button>
                }
            ></Card>
                  <Accordion
                  allowMultiple={true}
                  defaultOpen="q1"
        items={[
          {
            id: "q1",
            title: "What is React?",
            content: "React is a JavaScript library for building user interfaces.",
          },
          {
            id: "q2",
            title: "What is TailwindCSS?",
            content: "Tailwind is a utility-first CSS framework for styling modern apps.",
          },
          {
            id: "q3",
            title: "What is Zustand?",
            content: "Zustand is a small, fast state management library for React.",
          },
        ]}
      />
            {modalcalled && <Modal isOpen={modalcalled} onClose={() => setmodalcalled(false)} title="User Form" description="hello there">
                hello world
                <p>p</p>
                
                </Modal>}
        </section>
    )
}

export default Notifications;