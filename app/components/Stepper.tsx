"use client";
import React, { useState } from "react";
import CheckBadgeIcon from "@/components/ui/icons/CheckBadgeIcon";

type StepperProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
const Stepper: React.FC<StepperProps> = ({ currentStep, setCurrentStep }) => {
  const steps = ["Patient Info", "Test Booking", "Test linking", "Preview"];
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
              } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <CheckBadgeIcon /> : i + 1}
            </div>
            <div className="text-gray-500">{step}</div>
          </div>
        ))}
      </div>
      {/* {!complete && ( */}
      {/*   <button */}
      {/*     className="btn" */}
      {/*     onClick={() => { */}
      {/*       currentStep === steps.length */}
      {/*         ? setComplete(true) */}
      {/*         : setCurrentStep((prev) => prev + 1); */}
      {/*     }} */}
      {/*   > */}
      {/*     {currentStep === steps.length ? "Finish" : "Next"} */}
      {/*   </button> */}
      {/* )} */}
    </>
  );
};

export default Stepper;
