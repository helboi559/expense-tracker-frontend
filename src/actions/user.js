import fetchData from './utils/fetchData';


//USER ACTIONS

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  //show loading screen
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: user },
    dispatch
  );
  //if data is saved in backend
  if (result) {
    //update user
    console.log("register()result",result)
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'CLOSE_LOGIN' });
    //notify user of success registration
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Your account has been created successfully',
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};

//login
export const login = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/login', body: user },
    dispatch
  );

  if (result) {
    
    // console.log(result)
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'CLOSE_LOGIN' });
    //notify user of success registration
  }

  dispatch({ type: 'END_LOADING' });
};

//update user details (name etc..)
export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  //extract name/file from fields
  const { name, file } = updatedFields;
  let body = { name };
  try {
   
    const result = await fetchData(
      {
        url: url + '/updateProfile',
        method:'PATCH',
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: 'UPDATE_USER', payload: { ...currentUser, ...result } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Your profile has been updated successfully',
        },
      });
      // dispatch({
      //   type: 'UPDATE_PROFILE',
      //   payload: { open: false, file: null, photoURL: result.photoURL },
      // });
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: error.message,
      },
    });
    console.log("updateProfile()error",error);
  }

  dispatch({ type: 'END_LOADING' });
};

//on logout
export const logout = (dispatch) => {
  dispatch({type:'UPDATE_USER',payload:null})
  dispatch({type:'RESET_DRIVE'});
}