/* eslint-disable react/prop-types */

import { IoReload } from "react-icons/io5"; //icon
import { FaLongArrowAltRight } from "react-icons/fa"; //icon
import { useState } from "react";
import Loader from "./Loader";
import QuizComponents from "./QuizComponents";
import Button from "../Button";

function QuizList({ num, setNum, setCorrect, end, setEnd, setQuiz }) {
  const [clickedOnAnswer, setClickedOnAnswer] = useState(false);
  //This function works after asnwering to let u go to the next question
  const handleChoiceClick = (isCorrect) => {
    setClickedOnAnswer(true);
    setEnd(() =>
      QuizComponents && num + 1 < QuizComponents.length ? true : false
    );
    console.log(num, QuizComponents.length);

    setCorrect((i) => (isCorrect ? i + 1 : i));
  };

  //This function for changing to the next question works only when answering
  const handleNextClick = () => {
    setNum(num + 1);
    setClickedOnAnswer(false);
  };

  //When finishing the Quiz this function makes u retry the Quiz
  const handleRetryClick = () => {
    setNum(0);
    setClickedOnAnswer(false);
    setCorrect(0);
    setEnd(true);
  };

  //When finishing the Quiz this function Leads u back to the Countries
  const handleGoBackClick = () => {
    setQuiz(false);
  };

  return (
    <div className="quiz-question">
      <h2>
        {QuizComponents ? (
          QuizComponents[num].question
        ) : (
          <Loader>Questions</Loader>
        )}
      </h2>

      <ul className="answers-list">
        {/* I left checking QuizComponents if its true just will using the fake API so i dont have to write it again  */}
        {QuizComponents &&
        QuizComponents[num] &&
        QuizComponents[num].choices ? (
          QuizComponents[num].choices.map((choice, index) => {
            const isCorrect = choice === QuizComponents[num].correct_answer;
            const listItemClass = clickedOnAnswer
              ? isCorrect
                ? "feedback correct" // Green for correct answers
                : "feedback incorrect" // Red for incorrect answers
              : "";

            return (
              <li
                key={index}
                className={listItemClass}
                onClick={
                  !clickedOnAnswer
                    ? () => handleChoiceClick(isCorrect)
                    : undefined
                }
              >
                {choice}
              </li>
            );
          })
        ) : (
          <Loader>Answers</Loader>
        )}
      </ul>

      {end ? (
        <Button
          className={clickedOnAnswer ? "button2" : "button"}
          onClick={() => {
            clickedOnAnswer
              ? handleNextClick()
              : alert("Answer on question before moving to the next question");
          }}
        >
          Next
        </Button>
      ) : (
        <div className="finish">
          <Button className="retry" onClick={handleRetryClick}>
            <IoReload /> Retry
          </Button>

          <Button className="bac" onClick={handleGoBackClick}>
            Go back <FaLongArrowAltRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuizList;
