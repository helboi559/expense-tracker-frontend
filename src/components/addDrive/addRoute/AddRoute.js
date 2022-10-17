import { Box, Paper} from '@mui/material';
import { 
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    DirectionsRenderer
  } from '@react-google-maps/api';

import { useRef, useState ,useCallback} from 'react';
import { useValue } from '../../../context/ContextProvider';


const containerStyle = {
width: '400px',
height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const AddRoute = ({search,setSearch}) => {
    const {
        state: {route},
        currentUser,
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
        height: 450,
        position: 'relative',
        gridTemplateColumns: 'repeat(2,1fr)',
        gridAutoRows: 'minmax(50px, auto)',
        display: { xs: 'flex', md: 'grid' },
        textAlign: 'center',
        gap: 2,
        flexDirection: 'column',
      }}
    >
      <Paper
      elevation={3} sx={{ p: 3 }}
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
      elevation={4} sx={{ p: 3 }}
      >
        <Autocomplete>
            <input type="text"  defaultValue={route?.origin} ref={originRef} />
            
          </Autocomplete>
          <Autocomplete>
            <input type="text" defaultValue={route?.destination} placeholder="destination" ref={destinationRef}/>
          </Autocomplete>
        
          <button onClick={calculateRoute}>Route</button><br />
          <button onClick={clearRoute}>clear</button><br />
          <span>distance {distance}</span>
          <span>/duration {duration}</span><br />
      </Paper>

    </Box>
  ):<></>;
};

export default AddRoute;

