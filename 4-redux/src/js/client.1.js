import { createStore,applyMiddleware } from "redux";

const reducer = (state = 0, action) => {
  if (action.type == "INC"){
    return state + action.payload;
  }
  else if (action.type == "DEC"){
    return state - action.payload;
  }
  else if (action.type == "E"){
    throw new Error("WRONG!!!");
  }
  return state;
}

const logger = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
}

const error = (store) => (next) => (action) => {
  try{
    next(action);
  }
  catch(e){
    console.log("AHHHHH",e);
  }
}
const middleware = applyMiddleware(logger,error);

const store = createStore(reducer, 0, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState())
})

store.dispatch({type:"INC", payload: 1})
store.dispatch({type:"INC", payload: 3})
store.dispatch({type:"DEC", payload: 1})
store.dispatch({type:"E", payload: -1})