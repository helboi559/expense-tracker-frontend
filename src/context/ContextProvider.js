import React from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import reducer from './reducer';


// contain all initil values for app
const initialState = {
  currentUser: null,
  openLogin:false,
  loading:false,
  alert:{open:false,severity:'info',message:''},
  
  
};

const Context = createContext(initialState)

export const useValue = () => {
  return useContext(Context);
};
const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (
    <Context.Provider value={{ state, dispatch}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider