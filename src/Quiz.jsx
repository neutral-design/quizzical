import React from "react"
import Question from "./Question"

export default function Quiz(props) {
    const [showCats, setShowCats] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const [selectedCat, setSelectedCat] = React.useState(null)
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [gameEnded, setGameEnded] = React.useState(false)
    
    React.useEffect(()=>{
        restartQuiz()
    },[selectedCat])

    function getCategories(){
        // https://opentdb.com/api_category.php
        fetch('https://opentdb.com/api_category.php')
            .then((response) => response.json())
            .then((data) => {           
                // console.log(data.trivia_categories)
                setCategories(data.trivia_categories)
                
                });
    }

    function getQuestions() {
        // https://opentdb.com/api.php?amount=5&category=17
        const categoryString = selectedCat ? `&category=${selectedCat.id}`:""
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple${categoryString}`)
            .then((response) => response.json())
            .then((data) => {           
                
                setQuestions(data.results.map(item => {
                    return {
                        question: item.question,
                        answers: shuffleAnswers([item.correct_answer,...item.incorrect_answers]),
                        correct_answer: item.correct_answer,
                        selectedIndex: null
                    }
                }))
                
                });
    }
    
    React.useEffect(() => {
            
            // console.log("Getting questions from API")
            getCategories()
            getQuestions()
            
        }, []); 

    
    
    function restartQuiz(){
        // console.log("Restarting!")
        setScore(0)
        setGameEnded(false)
        getQuestions()
  
    }
    
    function answerHandler(question, selected) {
        
        setQuestions(prevQuestions => {
            return prevQuestions.map(prevQuestion => {
                return prevQuestion.question!==question? prevQuestion : 
                    {...prevQuestion, selectedIndex:selected}
            })
        })

    }
    
    function checkAnswers(){
        
        if(gameEnded){
            restartQuiz()
            return
        }
        let count = 0
        for(let i = 0; i < questions.length; i++){
            if(questions[i].answers[questions[i].selectedIndex]===questions[i].correct_answer) {
                count++
            }
            
        }
        setScore(count)
        setGameEnded(true)
    }
    
    function shuffleAnswers(arr){
        let currentIndex = arr.length,  randomIndex;
        const array = [...arr]
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }

        return array
    }
    

    
    const questElements = questions.map((question,index) => {
        
        return (
            <Question 
                key={index}
                question={question}
                clickHandler={answerHandler}
                showAnswerKey={gameEnded}
            />
        )
    })
 
    const categoryElements = categories.map(cat =>{
        return (
            <button
                onClick={(event)=> {
                    setSelectedCat(cat)
                    setShowCats(prevState => !prevState)
                }}
            >{cat.name}</button>
        )
    })
    
    
    
    return (
        <div className="main-container">
            {(questions.length===0) && <h1 className="hero">Getting questions from API...</h1>}
            <h1 className="hero">Quizzical</h1>
            <h2 className="hero-subtext">A super-fun quiz-game!</h2>
            
            <div className="dropdown">
            <button 
                class="dropbtn"
                onClick={(event)=>{
                    setShowCats(prevState => !prevState)
                }}
            >{selectedCat ? `Category: ${selectedCat.name}`:"Categories"}</button>
                {showCats && <div class="dropdown-content">
                    {categoryElements}

                </div>}
            </div>
            {questElements}
            {gameEnded && <p className="score-text">You scored {score}/{questions.length} correct answers</p>}
            <button className="check-button" onClick={checkAnswers}>{gameEnded? "Play again": "Check answers"}</button>
            
            
        </div>
    )
}