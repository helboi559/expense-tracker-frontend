import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

export default function AddCalendar(props) {
  // const [value, setValue] = React.useState(dayjs());
  // const [value, setValue] = useState(new Date());
  // const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [test,setTest] = React.useState('hi')
// console.log(value.$d)
// const newValue = new Date
    // const dateChange = (date) => {
    //     setValue(date)
    // }
    // console.log(value)
    // console.log(selectedDate)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        
        {/* <DatePicker
          disableFuture
          label="Date"
          openTo="month"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
              setValue(newValue)
              // setSelectedDate(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </Stack>
      {props.children}
      {/* {children} */}
    </LocalizationProvider>
  );
}