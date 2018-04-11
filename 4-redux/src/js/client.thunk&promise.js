import { createStore,applyMiddleware } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

/*
  Redux Thunk middleware allows you 
  to write action creators that 
  return a function instead of an action. 
  The thunk can be used to delay the dispatch 
  of an action, or to dispatch only if a 
  certain condition is met. The inner 
  function receives the store methods 
  dispatch and getState as parameters.
*/

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START": {
      return {...state, fetching: true}
      break;
    }
    case "FETCH_USERS_ERROR":{
      return{...state, fetching:false,error:action.payload}
      break;
    }
    case "RECEIVE_USERS":{
      console.log(action.payload)
      return {
        ...state, 
        fetching: false, 
        fetched:true,
        users:action.payload
      }
      break;
    }
  }
  return state
}


const middleware = applyMiddleware(promise(),thunk,logger());
const store = createStore(reducer,middleware);

store.subscribe(() => {
  console.log(">>>>>>>>store changed", store.getState())
})

//promise
store.dispatch({
  type:"FETCH_USERS",
  payload:axios.get("http://rest.learncode.academy/api/wstern/users")
})

// >>>>> without middleware promise() <<<<<
// store.dispatch((dispatch) => {
//   dispatch({type:"FETCH_USERS_START"})
//   axios.get("http://rest.learncode.academy/api/wstern/users")
//     .then((response) => {
//       dispatch({type:"RECEIVE_USERS",payload:response.data})
//     })
//     .catch((err) => {
//       dispatch({type:"FETCH_USERS_ERROR",payload:err})
//     })
// })