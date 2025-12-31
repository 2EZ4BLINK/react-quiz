import { useEffect, useReducer } from "react";
import { Error, Header, Loader, Main, StartScreen } from "./components";
import Questions from "./components/Questions/Questions";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...prevState,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...prevState,
        status: "error",
      };
    case "start":
      return {
        ...prevState,
        status: "active",
      };
    case "newAnswer":
      const question = prevState.questions.at(prevState.index);
      return {
        ...prevState,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? prevState.points + question.points
            : prevState.points,
      };
    default:
      throw new Error("Action is unknown");
  }
};

const App = () => {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            answer={answer}
            dispatch={dispatch}
            questions={questions[index]}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
