import { Box, Paper, Typography} from '@mui/material';
import { 
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    DirectionsRenderer
  } from '@react-google-maps/api';

import { useRef, useState ,useCallback} from 'react';
import { useValue } from '../../../context/ContextProvider';


const containerStyle = {
width: '350px',
height: '350px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const AddRoute = ({search,setSearch}) => {
    const {
        state: {route},
        dispatch,
    } = useValue();
    const [ libraries ] = useState(['places']);
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const originRef = useRef()
    const destinationRef = useRef()
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
        libraries,
    })
    const [map, setMap] = useState(null)
    const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
     }, [])
     
     async function calculateRoute() {
        //if input for origin/destination are empty dont calculate
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        console.log(results)
        dispatch({
            type:'UPDATE_ROUTE',
            payload:{
                origin:results.request.origin.query,
                destination:results.request.destination.query,
                mileage:results.routes[0].legs[0].distance.value
            }
        })
        setSearch(true)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setSearch(false)
        originRef.current.value = ''
        destinationRef.current.value = ''
    }
    
  return isLoaded?(
    <Box
      sx={{
        height: 400,
        position: 'relative',
        gridTemplateColumns: 'repeat(2,1fr)',
        gridAutoRows: 'minmax(50px, auto)',
        display: { xs: 'flex', md: 'grid' },
        textAlign: 'center',
        gap: 1,
        // flexDirection: 'row',
      }}
    >
      <Paper
      elevation={3} sx={{ p: 4 }}
      >
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // style={{flexGrow:1}}
        >
        { /* Child components, such as markers, info windows, etc. */ }
        {/* only show directions on map  */}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        <></>
         
       </GoogleMap>
       
      </Paper>
      <Paper
      elevation={4} sx={{ p: 3}}
      >
        <Box>
          <Typography variant="h6">Origin</Typography>
           <Autocomplete>
              <input type="text" placeholder="origin" defaultValue={route?.origin} ref={originRef} />
            </Autocomplete>
        </Box>
        <Box>
          <Typography variant="h6">Destination</Typography>
            <Autocomplete>
            <input type="text" defaultValue={route?.destination} placeholder="destination" ref={destinationRef}/>
          </Autocomplete>
        </Box>
         
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            p:2
          }}
        >
          <button onClick={calculateRoute}>Route</button>
          
        </Box>
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection:'column',
            justifyContent:'center',
            p:1
          }}
        >
          <span>Distance: {distance}</span>
          <span>Duration: {duration}</span>
        </Box>
        <Box>
          <button onClick={clearRoute}>Clear Route</button>
        </Box>
      </Paper>

    </Box>
  ):<></>;
};

export default AddRoute;



