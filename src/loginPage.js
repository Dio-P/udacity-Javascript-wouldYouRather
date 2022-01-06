import {useEffect} from "react"
import {  useSelector, useDispatch } from "react-redux";
import { getUsers, gettingUsers, login_id, giveUserDetails, signIn  } from "./Actions";
import Header from "./elements/header";

const LogInPage= () => {

    let loginID="one"

    const users = useSelector(state=> state.getUsers)
    const partID = useSelector(state=> state.logID)
    const dispatch = useDispatch();

    const login = (event) =>{
        event.preventDefault()
        loginID= event.target.value;
        console.log("loginID", loginID)
        dispatch(login_id(loginID))
        dispatch(signIn())
    }


    return(
        <div>
            <Header/>
            {/* <button onClick={()=> dispatch(gettingUsers())}> Test</button> */}
            {/* Users: {JSON.stringify(users)} */}
            {/* <button onClick={()=> dispatch(login_id(loginID))}> UserDetTest</button> */}
            {/* <h1>Users {JSON.stringify(Object.values(users))}</h1> */}
            {/* <h2> particular Id : {partID}</h2> */}
            <h1>LogInPage</h1>
            <select name="userId" 
            onChange={(event)=>login(event)}>
                <option value="Please chouse login ID">Please Chouse a login ID</option>
                {Object.values(users).map(user=>(
                 <option value={user.id}>{user.name}</option>
                ))}
            </select>
        </div>
    )
}

export default LogInPage;