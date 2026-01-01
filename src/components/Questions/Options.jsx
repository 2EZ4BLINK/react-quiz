import React from "react";

const Options = (props) => {
  const { options, dispatch, answer, correctOptions } = props;
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {(options || []).map((option, index) => (
        <button
          key={option}
          disabled={hasAnswer}
          className={`btn btn-option 
            ${hasAnswer ? (index === answer ? "answer" : "") : ""} 
            ${
              hasAnswer ? (index === correctOptions ? "correct" : "wrong") : ""
            }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
