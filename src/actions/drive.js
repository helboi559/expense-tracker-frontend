import fetchData from "./utils/fetchData";

//DRIVES ACTIONS

const url = process.env.REACT_APP_SERVER_URL + '/drives';

export const createDrive = async(drive,currentUser,dispatch) => {
    dispatch({type:"START_LOADING"})
    const result = await fetchData(
        {url:url + '/create-drive',body:drive,token:currentUser?.token},dispatch)
    if(result) {
        dispatch({type:"UPDATE_ALERT",payload:{open:true,severity:'success',message:'Drive has been added successfully'}})
        clearDrive(dispatch)
        dispatch({type:'UPDATE_SECTION',payload:0})
        fetchUserDrives(currentUser,dispatch)
    }
    dispatch({type:"END_LOADING"})
}

export const fetchUserDrives = async(currentUser,dispatch) => {
    // console.log(currentUser)
    // dispatch({type:"START_LOADING"})
    //view-drives`
    const result = await fetchData(
      {
        url: url + '/view-drives',
        method:'GET',
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
    //update user
    console.log("drivesGet",result)
    dispatch({ type: 'UPDATE_DRIVES', payload: result });
    //notify user of success registration
  }
    // dispatch({type:"END_LOADING"})
}


export const deleteDrive = async(drive,currentUser,dispatch,) => {
    // console.log(currentUser)
    dispatch({type:"START_LOADING"})
    //view-drives`
    const result = await fetchData(
      {
        url: `${url}/${drive._id}`,
        method:'DELETE',
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
    dispatch({
        type:"UPDATE_ALERT",
        payload:{
            open:true,
            severity:'success',
            message:"Your drive has been deleted successfully"
        }
    })
    // dispatch({ type: 'UPDATE_DRIVE', payload: result });
    // dispatch({type:"RESET_DRIVE"})
    // dispatch({type:'UPDATE_SECTION',payload:0})
    dispatch({
        type:'DELETE_DRIVE',
        payload:result._id
    })
    //notify user of success registration
  }
    dispatch({type:"END_LOADING"})
} 

export const updateDrive = async(drive,currentUser,dispatch,updatedDrive) => {
    // console.log(currentUser)
    dispatch({type:"START_LOADING"})
    //view-drives`
    const result = await fetchData(
      {
        url: `${url}/${updatedDrive._id}`,
        body:drive,
        method:'PATCH',
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
    dispatch({
        type:"UPDATE_ALERT",
        payload:{
            open:true,
            severity:'success',
            message:"Drive has been updated successfully"
        }
    })
    clearDrive(dispatch);
    dispatch({type:"RESET_DRIVE"})
    fetchUserDrives(currentUser,dispatch)
    dispatch({type:'UPDATE_SECTION',payload:0})
    //notify user of success registration
  }
    dispatch({type:"END_LOADING"})
}

export const clearDrive = (dispatch) => {
  dispatch({type:"RESET_DRIVE"})

}