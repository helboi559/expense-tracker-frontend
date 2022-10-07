import React, { useEffect } from 'react';

import jwtDecode from 'jwt-decode';
import { useValue } from '../../context/ContextProvider';
// import { storeRoom } from '../actions/room';
// import { logout } from '../actions/user';

//checks if token expires and logs out user automatically
    //use hook on components to automatically logout if there is a failure
const useCheckToken = () => {
  const {dispatch,state:{currentUser}} = useValue()
  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        
        dispatch({type:"UPDATE_USER",payload:null})
      }
    }
  }, []);
};

export default useCheckToken;

