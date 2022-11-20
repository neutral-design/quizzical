import React from "react"

export default function Start(props) {
    return (
        <div>
            <h1 className="hero">Quizzical</h1>
            <h2 className="hero-subtext">A super-fun quiz-game!</h2>
            <button className="hero-button" onClick={props.startFunction}>Start quiz!</button>
        </div>
    )
}