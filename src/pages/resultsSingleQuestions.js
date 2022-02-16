import { useEffect, useCallback} from "react"
import {  useSelector, useDispatch } from "react-redux";
// import "../style/allBoxes.css";
import "../style/main.css"
import Header from "../elements/header";
import PercentageBar from "../elements/percentageBar";


const SingleQResults = () => {
    const questionsData = useSelector(state=> state.getQuestions)
    const questionID = useSelector(state=> state.questionID)
    const users = useSelector(state=> state.getUsers)
    // let totalVotes;

  

    const optionOneVotes=()=>{
        console.log("option One votes length is: ", questionsData[questionID].optionOne.votes.length)
        return questionsData[questionID].optionOne.votes.length

    }

    const optionTwoVotes=()=>{
        console.log("option two votes length is: ", questionsData[questionID].optionTwo.votes.length)
        return questionsData[questionID].optionTwo.votes.length

    }

    useEffect(()=>{
        optionOneVotes();
        optionTwoVotes();
        // totalVotes = (optionOneVotes() + optionTwoVotes())
        

    }, [])

    // const totalVotes = useCallback(()=>{
    //     const totalVotes = optionOneVotes() + optionTwoVotes();
    //     console.log("total votes are: ", totalVotes);

    // }, [optionOneVotes, optionTwoVotes])

    // const calculateTotalVotes = useCallback(()=>{
    //     const totalVotes = optionOneVotes() + optionTwoVotes()

    // }, [optionOneVotes, optionTwoVotes])
    
    return (
        <div>
            <Header/>
            <div className= "main_card_style answer_results_box">
                <h4>asked by: {users[questionsData[questionID].author].name} </h4>
                <h1>Results</h1>
                <div className="avatarHolder"> 
                    <img id="userAvatar" src={users[questionsData[questionID].author].avatarURL} alt="a random user avatar"/>
                </div>
                {/* you need an active class to be telling you what your answer is */}
                <div>
                    <h5>{questionsData[questionID].optionOne.text}</h5>
                    <p>results stats</p>
                    <PercentageBar totalVotes={optionOneVotes() + optionTwoVotes()} questionVotes={optionOneVotes()}/>
                    <p>{optionOneVotes()} out of {optionOneVotes() + optionTwoVotes()} votes</p>

                </div>
                <div>
                    <h5>{questionsData[questionID].optionTwo.text}</h5>
                    <p>result stats</p>
                    <PercentageBar totalVotes={optionOneVotes() + optionTwoVotes()} questionVotes={optionTwoVotes()}/>
                    <p>{optionTwoVotes()} out of {optionOneVotes() + optionTwoVotes()} votes</p>

                </div>
            </div>
        </div>
    )
}

export default SingleQResults