import { Box, Button, Typography } from '@mui/material';
import React, { useEffect ,useMemo, useState} from 'react'
import { useValue } from '../../context/ContextProvider'
import { DataGrid , GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';
import moment from "moment"

import DrivesActions from './actions/DrivesActions';
import { fetchUserDrives } from '../../actions/drive';



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
        width: 150,
        editable:true,
        sortable: false,
        filterable: false,
      },
      { field: 'destination', headerName: 'Destination', width: 150 ,},
      { field: 'parking', headerName: 'Parking', width: 75 },
      {
        field: 'tolls',
        headerName: 'Tolls',
        width: 50,
        // type: 'boolean',
        // editable: currentUser?.role === 'admin',
      },
      {
        field: 'reimbursement',
        headerName: 'Reimbursement',
        width: 75,
        // type: 'singleSelect',
        // valueOptions: ['basic', 'editor', 'admin'],
        // editable: currentUser?.role === 'admin',
      },
      {
        field: 'total',
        headerName: 'Total',
        width: 75,
        // type: 'singleSelect',
        // valueOptions: ['basic', 'editor', 'admin'],
        // editable: currentUser?.role === 'admin',
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 100,
        renderCell: (params) =>
          moment(params.row.date).format('YYYY-MM-DD'),
      },
      { field: '_id', headerName: 'Id', width: 100},
      
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <DrivesActions {...{ params , rowId , setRowId}} />
        ),
      },
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