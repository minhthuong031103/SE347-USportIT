import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  const stepPercentages = {
    "1": 30,
    "2": 60,
    "3": 100,
  
  };

  const steps = Array.from({ length: 3 }, (_, index) => index + 1);

  return (
    <ProgressBar percent={stepPercentages[page] || 0}>
      {steps.map((step) => (
        <Step key={step}>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick(String(step))}
            >
              {index + 1}
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
