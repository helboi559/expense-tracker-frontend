import * as React from 'react';
import Stack from '@mui/material/Stack';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useState } from 'react';

export default function AddCalendar(props) {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        
        
      </Stack>
      {props.children}
      
    </LocalizationProvider>
  );
}