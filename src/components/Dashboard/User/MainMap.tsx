import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import { Box } from "@chakra-ui/react";

interface Coordinates {
  lat: number;
  long: number;
}


export default function MainMap({ coordinates }: { coordinates: Coordinates }) {
  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState({
    lat: 9.0820,
    lng: 8.6753
  });

  useEffect(() => {
    setOpen(false)
    setPosition({ lat: coordinates.lat, lng: coordinates.long })
    setTimeout(() => {
      setOpen(true)
    }, 1000)
  }, [coordinates.lat])

  return (
    <>
      {open &&
        <APIProvider apiKey="AIzaSyDL_NHLL9smjZB3ux8jvqvqE8jIdtPRWVM">
          <Box h={["400px", "400px", "400px", "500px"]} w="full">
            <Map defaultCenter={position} defaultZoom={18} mapTypeId="hybrid" gestureHandling="greedy" >
              <Marker draggable={true} position={position} icon={{ url: "/assets/images/mapmarker.png"}}/>
            </Map>
          </Box>
        </APIProvider>
      }
    </>);
}
