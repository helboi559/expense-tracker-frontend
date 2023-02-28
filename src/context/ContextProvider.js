import dayjs from 'dayjs';
import React from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import reducer from './reducer';


// contain all initial values for app
const initialState = {
  currentUser: null,
  openLogin:false,
  loading:false,
  alert:{open:false,severity:'info',message:''},
  profile:{open:false, file:null , photoURL:''},
  route:{origin:'',destination:'',mileage:0},
  details:{date:dayjs(),parking:0, tolls:0},
  drives:[],
  drive:null,
  section:0,
  updatedDrive:null
};

const Context = createContext(initialState)

export const useValue = () => {
  return useContext(Context);
};
const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    console.log("section",state.section)
    useEffect(()=> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser) {
        dispatch({type:'UPDATE_USER',payload:currentUser})
      }
    },[])
    return (
    <Context.Provider value={{ state, dispatch}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider