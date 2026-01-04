import React from "react";

const FinishedScreen = ({
  dispatch,
  points,
  highscore,
  maxPossibllePoints,
}) => {
  const percentage = (points / maxPossibllePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossibllePoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
};

export default FinishedScreen;
