import { useState, useEffect } from 'react'

export default function Questions ({ questions }){

    const [questionAnswer, setQuestionAnswer] = useState([])
    const [answerGuess, setAnswerGuess] = useState({})

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        const selection = questions.map(q => ({
            ...q,
            allAnswers: shuffleArray([
                q.correct_answer,
                ...q.incorrect_answers
            ])
        }))
        setQuestionAnswer(selection)
    }, [questions])

    function handleClick(qIndex, answer) {
        setAnswerGuess(prev => ({
            ...prev,
            [qIndex]: answer
        }))
    }

    return (
        <>
        <div className='questions'>

        <section className='question-page'>
            {questionAnswer.map((q, index) => (
              <div key ={index} className='question-container'>
                <h3 dangerouslySetInnerHTML={{ __html: q.question}} />
            
                <div className='answers'>
                    {q.allAnswers.map((answer, i) => {
                        const isSelected = answerGuess[index] === answer
                    return(
                        <button
                            key={i}
                            className={`answer-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleClick(index, answer)}
                            dangerouslySetInnerHTML={{ __html: answer}} />
                    )
})}
                </div>
                    <hr />
                </div>
            ))}
        </section>

        <section className='check-answers'>
            <button className='check-btn'> 
                Check answers
            </button>
        </section>
        </div>
        </> 
    )           
}
