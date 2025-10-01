import React, { ReactNode, useState } from "react";
import Button from "./button";

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface StepsProps {
  steps: Step[];
  initialStep?: number;
}


const FormSteps:React.FC<StepsProps> = ({steps, initialStep = 0}) => {

    const [current, setCurrent] = useState(initialStep);

    const next = () => {
        if(current < steps.length - 1) setCurrent((prev) => prev + 1)
    }

    const prev = () => {
        if (current > 0) setCurrent((prev) => prev - 1);
    };

    const progressPercent = ((current + 1) / steps.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-[rgb(var(--background))] rounded-xl shadow-md">
            <div className="flex justify-between mb-6">
                {steps.map((step,index) => (
                    <div 
                      className={`flex-1 text-center pt-2  transition 
                        ${index === current ? "text-[rgb(var(--primary))] font-semibold" : " text-gray-400"} `} 
                      key={step.id}
                    >
                        {step.title}
                    </div>
                ))}
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full mb-6">
                <div
                  className="h-1 rounded-full bg-[rgb(var(--primary))] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className="animate-fadeIn min-h-[150px]">
              {steps[current].content}
            </div>

            <div className="flex justify-between mt-6">
                <Button 
                    type="button"
                    varaint="primary" 
                    size="sm" 
                    value="Previous" 
                    onClick={prev} 
                    disabled={current === 0} 
                />
                <Button 
                    type="button"
                    varaint="primary" 
                    size="sm" 
                    value="Next" 
                    onClick={next}
                    disabled={current === steps.length -1}
                />
            </div>
        </div>
    )
}

export default FormSteps;