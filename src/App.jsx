import { useEffect, useReducer } from "react";
import {
  Error,
  FinishedScreen,
  Footer,
  Header,
  Loader,
  Main,
  NextButton,
  Progress,
  Questions,
  StartScreen,
  Timer,
} from "./components";
import { initialState, SECS_PER_QUESTION } from "./Utils/AppEnums";

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
        secondsRemaining: prevState.questions.length * SECS_PER_QUESTION,
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
    case "nextQuestion":
      return {
        ...prevState,
        answer: null,
        index: prevState.index + 1,
      };
    case "finish":
      return {
        ...prevState,
        status: "finished",
        highscore:
          prevState.points > prevState.highscore
            ? prevState.points
            : prevState.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: prevState.questions,
      };
    case "tick":
      return {
        ...prevState,
        secondsRemaining: prevState.secondsRemaining - 1,
        status:
          prevState.secondsRemaining === 0 ? "finished" : prevState.status,
      };
    default:
      throw new Error("Action is unknown");
  }
};

const App = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

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
          <>
            <Progress
              index={index}
              points={points}
              answer={answer}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              answer={answer}
              dispatch={dispatch}
              questions={questions[index]}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={Number(secondsRemaining)}
              />
              <NextButton
                index={index}
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            dispatch={dispatch}
            highscore={highscore}
            maxPossibllePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
