import React from "react"

export default function Question(props) {
    
     
    function createMarkup(text) {
        return {__html: text};
    }
    
    function clickHandler(selected) {
        // console.log(selected)
        props.clickHandler(props.question.question, selected)
    }
    
    
    
    const answerElements =  props.question.answers.map((answer, index) => {
            // const styles=props.question.selectedIndex===index? "answer selected": "answer"
            let styles = "answer"
            
            if(props.showAnswerKey){
                if(props.question.selectedIndex===index) {
                    if(answer===props.question.correct_answer) {
                        styles+=" correct"
                    }
                    else {
                        styles+=" wrong"
                    }
                }
            }
            else {
                if(props.question.selectedIndex===index) {
                    styles +=" selected"
                }
            }
            
            
            return (
                <div 
                    key={index}
                    onClick={()=>clickHandler(index)}
                    className={styles}
                    
                    dangerouslySetInnerHTML={createMarkup(answer)}>
                </div>
                
            )
        })
        
    
    
    return (
        <div className="question-container">
            <div className="question" dangerouslySetInnerHTML={createMarkup(props.question.question)}></div>
            <div className="answers-container">
                {answerElements}
            </div>
        </div>
    )
}