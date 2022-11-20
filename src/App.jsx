import React from "react"
import ReactDOM from "react-dom"
import Start from "./Start"
import Quiz from "./Quiz"


export default function App(props) {
    
    const [gameStarted, setGameStarted] = React.useState(false)
    
    function startGame() {
        setGameStarted(prevState => !prevState)
    }
    
    return (
        <div className="hero-container">
            {!gameStarted && <Start startFunction={startGame}/>}
            {gameStarted && <Quiz />}
        </div>
    )
}