const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin:true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin:false };
    case 'START_LOADING':
      return { ...state, loading:true };
    case 'END_LOADING':
      return { ...state, loading:false };
    case 'UPDATE_USER':
      localStorage.setItem('currentUser',JSON.stringify(action.payload))
      return { ...state, currentUser: action.payload };
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'UPDATE_ROUTE':
      return { ...state, route: action.payload };
    case 'RESET_DRIVE':
      return { ...state, details:{date:'',parking:0,tolls:0},route:{origin:'',destination:'',mileage:0},updatedDrive:null };
    case 'UPDATE_DRIVE':
      return { ...state, drive:action.payload };
    case 'UPDATE_DRIVES':
      return { ...state, drives:action.payload };
    case 'UPDATE_SECTION':
      return { ...state, section:action.payload };
    case 'UPDATE_UPDATED_DRIVE':
      return { ...state, updatedDrive:action.payload };
    case 'DELETE_DRIVE':
      return { ...state, drives:state.drives.filter(drive=>drive._id !== action.payload) };
    default:
      throw new Error('No matched action!');
  }
};

export default reducer;


