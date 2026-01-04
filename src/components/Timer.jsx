import React, { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const timer = () => {
    dispatch({ type: "tick" });
  };

  useEffect(() => {
    const intervalId = setInterval(timer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
