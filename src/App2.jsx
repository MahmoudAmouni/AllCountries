/* eslint-disable react/prop-types */
import { IoReload } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import  { useState, useEffect } from 'react';
import './App2.css'; // Import your CSS for styling

function App2({setQuiz}) {
  const [result,setResult] = useState()
  const [num,setNum] = useState(0)
  const [numAnswered , setNumAnswered] = useState(1)
  const [correct, setCorrect] = useState(0)
  const end = result && numAnswered -1< result.length 

  // Fetch a random question from a trivia API (you can replace the API URL with your choice)
  useEffect(() => {

    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/results");
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();
         setResult(data)
         
        
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    }

    fetchData();
  }, []);


  
   

 

 

  return (
    <div className="quiz-container">
      <div className='topics'>
        
      {end ?
        <>
        <p> Questions:{numAnswered}/{result && result.length}</p>
      <p> Correct:{correct}/{result && result.length}</p>
      </>:
      <p>Result:{correct} Correct Answers of {result && result.length} </p>
      }
      </div>
      
     
      
  <Header />
      {/* Quiz Question and clickedOnAnswers */}
      <div className="quiz-question">
        

        {/* clickedOnAnswer Choices */}
        <List
         result={result}
         setNumAnswered={setNumAnswered}
         num={num} 
         setNum={setNum} 
         setCorrect={setCorrect}
         end={end}
         setQuiz={setQuiz}
         />
      </div>

     
     
    </div>
  );
}

function Header(){
  return(
   <header className="quiz-header">
        <h1>Countries Quiz</h1>
        
        <p>Time Left: timeLeft seconds</p>
      </header>
  )
}

function List({ result, num, setNum,setNumAnswered,setCorrect,end,setQuiz }) {
  const [clickedOnAnswer, setClickedOnAnswer] = useState(false);
  const [clickedChoice, setClickedChoice] = useState('');

  const handleChoiceClick = (choice,isCorrect) => {
    setClickedOnAnswer(true);
    setClickedChoice(choice);
    setCorrect((i)=>isCorrect ? i+1 : i)

  };

  const handleNextClick = () => {
    setNum(num + 1);
    setClickedOnAnswer(false);
    setClickedChoice('');
    setNumAnswered((i)=>i+1)
  };
  const handleRetryClick = () => {
    setNum(0);
    setClickedOnAnswer(false);
    setClickedChoice('');
    setNumAnswered(1)
    setCorrect(0)
  };
  const handleGoBackClick = () => {
    setQuiz(false)
  };

  return (
    <>{
       end ?
      
      <>
      <h2>{result ? result[num].question : "Loading..."}</h2>
      <ul className="answers-list">
        {result && result[num] && result[num].choices ? (
          result[num].choices.map((choice, index) => {
            const isCorrect = choice === result[num].correct_answer;
            const listItemClass = clickedOnAnswer
              ? isCorrect
                ? 'feedback correct'  // Green for correct answers
                : 'feedback incorrect'  // Red for incorrect answers
                : '';

                return (
                  <li
                  key={index}
                className={listItemClass}
                onClick={!clickedOnAnswer ? () => handleChoiceClick(choice,isCorrect) : undefined}
              >
                {choice}
              </li>
            );
          })
        ) : (
          <p>Loading Answers...</p>
        )}
      </ul>
      
        <button 
             className={clickedOnAnswer ? "button2" : "button"} 
             onClick={()=>{ clickedOnAnswer? handleNextClick():alert("Answer on question before moving to the next question")}} >
             Next
        </button> 
        </> :
        <div className='finish'>
        <button className='retry' onClick={handleRetryClick}><IoReload />  Retry</button> 
        <button className='bac' onClick={handleGoBackClick}>Go back <FaLongArrowAltRight /></button>
        </div>

        }
    </>
  );
}


export default App2;
