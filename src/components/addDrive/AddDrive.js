import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import AddDetails from './addDetails/AddDetails';
import AddRoute from './addRoute/AddRoute';
import { Cancel, Send } from '@mui/icons-material';
import { clearDrive, createDrive,updateDrive } from '../../actions/drive';


const AddDrive = () => {
  const {
    state: {
      details,
      route,
      currentUser,
      updatedDrive,
    },
    dispatch,
  } = useValue();
  const [activeStep, setActiveStep] = useState(0);
  const [search, setSearch] = useState(false);
  const [steps, setSteps] = useState([
    { label: 'Route', completed: false },
    { label: 'Details', completed: false },
  ]);
  //flag to show submit button
  const [showSubmit, setShowSubmit] = useState(false);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    //if not at last step keep going
    if (activeStep < steps.length - 1) return false;
    //if step is not complete, keep going
    const index = findUnfinished();
    if (index !== -1) return false;
    // if index is completed, return true
    return true;
  };
  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };
  //watch for details to mark complete
  useEffect(() => {
    // if calendar input has a date, check details as complete 
    if (details.date) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);
  //listening to complete route
  useEffect(() => {
    // if (route.origin || route.destination)
    //if there is an active route
    if (search) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [route]);
  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };
  //watch for details and route to be checked
  useEffect(() => {
    //complete show
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);
  
  const handleSubmit = () => {
    
    //convert km to miles
    const converted = Math.round((route.mileage/1609)*10)/10
    // console.log("converted",converted)
    //calculate reimbursement
    const businessTaxRate = .625
    const reimbursement = Math.round(((converted) * businessTaxRate ) * 10 ) /10
    // console.log("reimbursement",reimbursement)
    //calculate total
    const parking = Number(details.parking)
    const tolls = Number(details.tolls)
    // console.log("parking",parking)
    const total = Math.round(Number(reimbursement + parking + tolls) * 10) /10
    const drive = {
      origin: route.origin,
      destination: route.destination,
      date:details.date.$d,
      mileage: converted,
      reimbursement: reimbursement,
      parking: details.parking,
      tolls: details.tolls,
      total:total
    };
    if (updatedDrive) {
      return updateDrive(drive,currentUser,dispatch,updatedDrive)
    }
      
    createDrive(drive,currentUser,dispatch)
  };

  //cancel button
  const handleCancel = () => {
    //if updating a drive and need to cancel
    if (updatedDrive) {
      //clear data and redirect to edit page
      clearDrive(dispatch)
      dispatch({ type: 'UPDATE_SECTION', payload: 1 });
    } else {
      //if adding and cancel go back to dashboard
      dispatch({ type: 'UPDATE_SECTION', payload: 0 });
      clearDrive(dispatch)
    }
  };
  return (
    <Container sx={{ my: 3 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
        <Box sx={{pb:7}}>
            {
                {
                0: <AddRoute search={search} setSearch={setSearch} />,
                1: <AddDetails />,
                }[activeStep]
            }
        

        <Stack direction="row" sx={{ pt: 2, justifyContent: 'space-around' }}>
          <Button
            color="inherit"
            disabled={!activeStep}
            onClick={() => setActiveStep((activeStep) => activeStep - 1)}
          >
            Back
          </Button>
          <Button disabled={checkDisabled()} onClick={handleNext}>
            Next
          </Button>
        </Stack>
        
        <Stack
          sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}
          direction="row"
        >
          {showSubmit && (
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              {updatedDrive ? 'Update' : 'Submit'}
            </Button>
          )}
          <Button
            variant="outlined"
            endIcon={<Cancel />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddDrive;
