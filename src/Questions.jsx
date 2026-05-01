import { useState, useEffect } from 'react'

export default function Questions ({ questions, restartQuiz }){

    const [questionAnswer, setQuestionAnswer] = useState([])
    const [answerGuess, setAnswerGuess] = useState({})
    const [showResults, setShowResults] = useState(false)

    function shuffleArray(array) { 
        return [...array].sort(() => Math.random() - 0.5) 
    }

    useEffect(() => {
        setQuestionAnswer(
             questions.map(q => ({
            ...q,
            allAnswers: shuffleArray([
                q.correct_answer,
                ...q.incorrect_answers
            ])
        }))
    )
    }, [questions])

    function handleClick(qIndex, answer) {
        setAnswerGuess(prev => ({
            ...prev,
            [qIndex]: answer
        }))
    }

    const score = questionAnswer.reduce((total, q, index) => {
        return answerGuess[index] === q.correct_answer
            ? total + 1
            : total
    }, 0)

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
                        const isCorrect = answer === q.correct_answer

                    let className = 'answer-btn'

                    if (showResults) {
                        if (isCorrect) {
                            className += ' correct'
                        } else if (isSelected && !isCorrect) {
                            className += ' incorrect'
                        } else {
                            className += ' faded'
                        }
                    } else if (isSelected) {
                        className += ' selected'
                    }
                return (                    
                        <button
                            key={`${index}-${answer}`}
                            className={className}
                            onClick={() => handleClick(index, answer)}
                            dangerouslySetInnerHTML={{ __html: answer}} 
                        />
                    )
})}
                </div>
                    <hr />
                </div>
            ))}
        </section>

        <section className='check-answers'>
            {showResults && (
                <p className="score">
                   You scored {score}/{questionAnswer.length} correct answers 
                </p> 
            )}

            <button className='check-btn'
                onClick={() => {
                    if (showResults) {
                        setShowResults(false)
                        setAnswerGuess({})
                        restartQuiz()
                } else {
                    setShowResults(true)
                }
            }}
        >
            {showResults ? 'Play again' : 'Check answers'}
            </button>
        </section>
        </div>
        
        </> 
    )           
}

