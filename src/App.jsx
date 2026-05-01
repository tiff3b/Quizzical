import { useState, useEffect } from 'react'
import './App.css'
import Questions from './Questions.jsx'

export default function App (){

  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])

  function startQuiz() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results || [])
        setStarted(true)
    }) 
      .catch(err => console.error(err))              
}

return (
  <div className='page'>
    {!started ? (
      <section className='intro'>
        <h1>Quizzical</h1>
        <h2>Can you beat the quiz?</h2>
        <button className="btn-start" 
          onClick={startQuiz}
          disabled={started}>
            Start quiz</button>
    </section>
    ) : (
      <Questions 
        questions={questions}
        restartQuiz={startQuiz}
      />
    )}   
  </div>
  )
}
