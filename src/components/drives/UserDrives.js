import { Box, Typography } from '@mui/material';
import React, { useEffect ,useMemo, useState} from 'react'
import { useValue } from '../../context/ContextProvider'
import { DataGrid , GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';
import moment from "moment"

import DrivesActions from './actions/DrivesActions';
import { fetchUserDrives } from '../../actions/drive';


//export toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const UserDrives = () => {
  const {state:{drives,currentUser},dispatch} = useValue();
  const [rowId, setRowId] = useState(null);
   const [pageSize, setPageSize] = useState(5);


  const columns = useMemo(
    () => [
      {
        field: 'origin',
        headerName: 'Origin',
        width: 200,
      },
      { field: 'destination', headerName: 'Destination', width: 200 ,},
      { field: 'parking', headerName: 'Parking', width: 65 },
      {
        field: 'tolls',
        headerName: 'Tolls',
        width: 50,
      },
      {
        field: 'reimbursement',
        headerName: 'Reimbursement',
        width: 75,
      },
      {
        field: 'total',
        headerName: 'Total',
        width: 75,
      },
       {
        field: 'date',
        headerName: 'Date',
        width: 100,
        renderCell: (params) =>
          moment(params.row.date).format('YYYY-MM-DD'),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <DrivesActions {...{ params , rowId , setRowId}} />
        ),
      },
     
      { field: '_id', headerName: 'Id', width: 75},
      
    ],
    [rowId]
  )
    useEffect(()=> {
      if(drives.length === 0) fetchUserDrives(currentUser,dispatch);
    },[])
  return (
    <Box
    sx={{
      height:500,
      width:'100%'
    }}
    >
      <Typography
      variant='h3'
      component='h3'
      sx={{textAlign:'center',mt:3,mb:3}}
      >
        Manage Drives
      </Typography>
      
      <DataGrid
      columns={columns}
      rows={drives}
      getRowId={row=>row._id}
      rowsPerPageOptions={[5, 10, 20]}
      initialState={{
        pagination: {
          pageSize: 5,
        },
      }}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      components={{
          Toolbar: CustomToolbar,
        }}
      getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
      />
    </Box>
  )
}

export default UserDrives