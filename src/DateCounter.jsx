import { useReducer } from "react";
const initialState = {
  step: 1,
  count: 0,
};

const reducer = (prevState, action) => {
  console.log("prevState: ", prevState);
  console.log("action: ", action);

  switch (action.type) {
    case "dec":
      return {
        ...prevState,
        count: prevState.count - prevState.step,
      };
    case "inc":
      return {
        ...prevState,
        count: prevState.count + prevState.step,
      };
    case "setStep":
      return {
        ...prevState,
        step: action.payload,
      };
    case "reset":
      return initialState;
    default:
      return {
        ...prevState,
        count: action.payload,
      };
  }
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
