import {useState, useEffect} from "react"
import {  useSelector, useDispatch } from "react-redux";
import { getUsers, gettingUsers, login_id, giveUserDetails, signIn  } from "./Actions";
import Header from "./elements/header";
import QuestionBox from "./elements/answeringQuestionBox";
// import _DATA.js from "./_DATA"
// from the data ask the .idName.name
import {_saveQuestionAnswer,
        _saveQuestion,
        _getQuestions,
        _getUsers} from "./_DATA"
import HomeBoxHolder from "./elements/homeQuestionBoxesHolder";

const GamePage = (props) => {
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);
    const unansweredQuestionsPrep = [];
    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const answeredQuestionsPrep = []

    const users = useSelector(state=> state.getUsers)
    const partID = useSelector(state=> state.logID)
    const questionsData = useSelector(state=> state.getQuestions)
    const dispatch = useDispatch();

    

    useEffect(()=>{Object.values(questionsData).map(question=>(
        question.optionOne.votes.includes(users[partID].id) || question.optionTwo.votes.includes(users[partID].id)? 
        answeredQuestionsPrep.push(question.id):
        unansweredQuestionsPrep.push(question.id)
    
    )); 
    setUnansweredQuestions(unansweredQuestionsPrep);
    setAnsweredQuestions(answeredQuestionsPrep);
    console.log("props.questionID in Game", props.questionID);

},[])

    useEffect(()=>{
        console.log("unanswered questions are:", unansweredQuestions);
        console.log("answered questions are:", answeredQuestions);
    }, [unansweredQuestions, answeredQuestions])


    return(
        <div>
            <Header/>
            <h1>Game Page</h1>

            <HomeBoxHolder 
            answeredQuestions={answeredQuestions}
            unansweredQuestions={unansweredQuestions}
            questionId={props.questionId}
            />
            
        </div>
    )
}

export default GamePage;