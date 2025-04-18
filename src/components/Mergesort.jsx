import React, { useState } from "react";
import "./Mergesort.css";

const Mergesort = () => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (e) => {
    const inputArray = e.target.value.split(" ").map(Number);
    setArray(inputArray);
    setSteps([]);
    setCurrentStep(0);
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const merged = merge(left, right);
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        left,
        right,
        merged,
        currentLeft: left,
        currentRight: right,
        original: arr,
      },
    ]);
    return merged;
  };

  const merge = (left, right) => {
    const result = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const startSorting = () => {
    if (array.length === 0) return;
    setSteps([]);
    setCurrentStep(0);

    setSteps([
      {
        left: array,
        right: [],
        merged: [],
        currentLeft: array,
        currentRight: [],
        original: array,
      },
    ]);
    mergeSort(array);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="mergesort-container">
      <h1>Merge Sort Visualizer</h1>
      <input
        type="text"
        placeholder="Enter space-separated numbers"
        onChange={handleInputChange}
      />
      <button onClick={startSorting}>Start Sorting</button>
      <button onClick={nextStep} disabled={currentStep >= steps.length}>
        Next Step
      </button>
      <div className="tree-container">
        {steps.length > 0 && (
          <div className="tree">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <div key={index} className="step">
                <div className="node">
                  <span className="original">
                    {step.original.map((num, idx) => {
                      if (step.currentLeft.includes(num)) {
                        return (
                          <span key={idx} className="highlight-left">
                            {num}{" "}
                          </span>
                        );
                      } else if (step.currentRight.includes(num)) {
                        return (
                          <span key={idx} className="highlight-right">
                            {num}{" "}
                          </span>
                        );
                      }
                      return num + " ";
                    })}
                  </span>
                </div>
                <div className="node">
                  <span className="highlight">
                    Left: {step.left.join(", ")}
                  </span>
                </div>
                <div className="node">
                  <span className="highlight">
                    Right: {step.right.join(", ")}
                  </span>
                </div>
                <div className="node">
                  <span>Merged: {step.merged.join(", ")}</span>
                </div>
              </div>
            ))}
            {currentStep === steps.length && (
              <div className="final-result">
                <h3>
                  Final Sorted Array:{" "}
                  {steps[steps.length - 1].merged.join(", ")}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mergesort;
