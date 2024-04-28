/* eslint-disable react/prop-types */
// import { useEffect } from "react";//remove useEffect from comment to make fake api

import { useState } from "react";
import "./Quiz.css";
import Header from "./Header";
import QuizComponents from "./QuizComponents";
import QuizList from "./QuizList";

function Quiz({ setQuiz }) {
  const [num, setNum] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [end, setEnd] = useState(true);

  //If you want to make the quiz list Fake API use this code instead of QuizComponents variable
  //write in the terminal npm run server since i have already done the json in a fake api
  // const [result, setResult] = useState();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("http://localhost:3000/results");
  //       if (!res.ok) {
  //         throw new Error(`Network response was not ok: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       setResult(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  // const end = result && num < result.length;
  // console.log(end)

  return (
    <div className="quiz-container">
      <div className="topics">
        {end ? (
          <>
            <p>
              {" "}
              Questions:{num + 1}/{QuizComponents && QuizComponents.length}
            </p>
            <p>
              {" "}
              Correct:{correct}/{QuizComponents && QuizComponents.length}
            </p>
          </>
        ) : (
          <p>
            Result:{correct} Correct Answers of{" "}
            {QuizComponents && QuizComponents.length}{" "}
          </p>
        )}
      </div>

      <Header />
      <QuizList
        num={num}
        setNum={setNum}
        setCorrect={setCorrect}
        end={end}
        setEnd={setEnd}
        setQuiz={setQuiz}
      />
    </div>
  );
}

export default Quiz;
