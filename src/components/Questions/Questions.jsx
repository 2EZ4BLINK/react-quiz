import React from "react";
import Options from "./Options";

const Questions = (props) => {
  const {
    answer,
    dispatch,
    questions: { question, options, correctOption, points },
  } = props;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        answer={answer}
        options={options}
        dispatch={dispatch}
        correctOptions={correctOption}
      />
    </div>
  );
};

export default Questions;
