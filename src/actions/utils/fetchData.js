
//serves as a "global" fetch function
const fetchData = async ({ url, method = 'POST', token = '', body = null },dispatch) => {
    //headers
    const headers = token ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
    body = body ? { body: JSON.stringify(body) } : {};
    // console.log(body)
  try {
    const response = await fetch(url, { method, headers, ...body });
    const data = await response.json();
    //if data retrieval failed
    if (!data.success) {
      //if error user token is modified/expired log user out
      if (response.status === 401)
        dispatch({ type: 'UPDATE_USER', payload: null });
      throw new Error(data.message);
    }
    //if success return result
    return data.result;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: error.message },
    });
    console.log("error",error);
    return null;
  }
};

export default fetchData;