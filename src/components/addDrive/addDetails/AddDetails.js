import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import AddCalendar from './AddCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const AddDetails = () => {
  const {
    state: {
      details: { date, parking, tolls },
    },
    dispatch,
  } = useValue();

  const handleParking = (e) => {
    // dispatch({ type: 'UPDATE_DETAILS', payload: { tolls: e.target.value } });
    dispatch({ type: 'UPDATE_DETAILS', payload: { parking: e.target.value } });
  };
  const handleTolls = (e) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { tolls: e.target.value } });
    // dispatch({ type: 'UPDATE_DETAILS', payload: { parking: e.target.value } });
  };
  
 
  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <FormControl fullWidth sx={{ m: 4 }}>
          <AddCalendar>
            <DatePicker
              disableFuture
              label="Date"
              openTo="month"
              views={['year', 'month', 'day']}
              value={date}
              onChange={(newDate) => {
                  // setValue(newValue)
                  // console.log("newDate",newDate)
                  dispatch({ type: 'UPDATE_DETAILS', payload: { date: newDate } })
                  // setSelectedDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            </AddCalendar>
        </FormControl>
      <FormControl fullWidth sx={{ m: 4 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Parking</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={parking}
            onChange={handleParking}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Parking"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 4 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Tolls</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={tolls}
            onChange={handleTolls}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Tolls"
          />
        </FormControl>
        
    </Stack>
  );
};

export default AddDetails;

