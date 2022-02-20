import {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import {  useSelector, useDispatch, connect } from "react-redux";
import { gettingUsers, gettingQuestions, questionsInState, usersInState } from "./Actions";
import LogInPage from './loginPage';
import GamePage from './Game';
import {
  Route,
  Routes,
  Router
} from "react-router-dom";
import LeaderBox from './elements/leaderboardBoxElement';
import LeaderboardPage from './pages/leaderboard';
import CreateQuestionForm from './pages/createNewPollForm';
import SinglePageQuestion from './pages/singleQuestionPage';
import { getInitQuestions, getInitUsers } from "./dataConnect/dateMiddleLink";
import Loading from "./pages/loading"
import {__esModule} from 'redux-devtools-extension'
import SingleQResults from "./pages/resultsSingleQuestions";

const mapStateToProps = state => { 
  return {
      logedOrNot: state.isLogged 
  }
}


function App() {

  const [questionId, setQuestionId] = useState("")

  const counter = useSelector(state=> state.counter);
  const logedIn = useSelector(state=> state.isLogged);
  const users = useSelector(state=> state.getUsers);
  const loading= useSelector(state=> state.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    getInitQuestions()
    .then(questions=> {console.log("questions before dispatch in app are:", questions);dispatch(questionsInState(questions))})
    getInitUsers()
    .then(users=>{console.log("users before dispatch in app are", users); dispatch(usersInState(users))})
    

  },[])

  useEffect(()=> {
    console.log("new Question Id is: ", questionId);
  }, [questionId])

  const useAuth= () => {
    const user = { loggedIn: false };
    return user && user.loggedIn;
  };

  function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
  };
  
  

  return (
    <div className="App">
      
      <Routes>
        {/* <h1>Counter {counter}</h1>
        <button onClick={()=> dispatch(increment(5))}>+</button>
        <button onClick={()=> dispatch(decrement())}>-</button> */}
        
        {loading===true}?
        <Route path="pageLoading" element={<Loading/>}/>:
        {logedIn===true? 
          <Route path="/" element={<GamePage 
            questionId={(questionID)=> setQuestionId(questionID)}
            />}/>
          :
          
        <Route path="/" element={<LogInPage/>}/>
        }
        <Route path="leaderboard" element={<LeaderboardPage/>}/>
        <Route path="/add" element={<CreateQuestionForm/>}/>
        <Route path="question/:question_id" element={<SinglePageQuestion question={questionId}/>}/>
        <Route path="/results" element={<SingleQResults/>}/>
        
      </Routes>
  </div>
  );
}

export default connect(mapStateToProps)(App);
