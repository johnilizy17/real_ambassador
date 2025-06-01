import { Box, Button, Center, Flex, IconButton, Img, Text, useToast} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/layout/Theme";
import MainMap from "../User/MainMap";
import { useSelector } from "react-redux";
import { getClaimedAddresses } from "@/url/api's/userProfile";

// Define Coordinates interface (This should likely be in a shared types file)
interface Coordinates {  
    lat: number;
    long: number;
    digital_address?: string;
}

interface UserMapProps {
    coordinates?: Coordinates[]; // Make coordinates optional
}


const UserMap: React.FC<UserMapProps> = ({ coordinates }) => {
    const toast = useToast();
    const [mapCenter, setMapCenter] = useState<Coordinates>({ lat: 0, long: 0 }); // State for map center


    useEffect(() => {
        // If coordinates are provided as props, use them; otherwise, get the location.
        if (coordinates && coordinates.length > 0) {
            setMapCenter(coordinates[0]); // Center on the first coordinate
        } else {
            getLocation();
        }
    }, [coordinates]); // Only run effect if coordinates change

    const success = (position: GeolocationPosition) => {
        setMapCenter({ lat: position.coords.latitude, long: position.coords.longitude });
        toast({
            position: "top-right",
            description: "Location successfully acquired",
            status: "success",
            isClosable: true,
        });
    };

    const error = (err: GeolocationPositionError) => {
        toast({
            position: "top-right",
            description: err.message,
            status: "error",
            isClosable: true,
        });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((permissionStatus) => {
                    if (permissionStatus.state === "denied") {
                        toast({
                            position: "top-right",
                            description: "Please allow location access.",
                            status: "error",
                            isClosable: true,
                        });
                        // window.location.href = "app-settings:location"; // Consider a less disruptive approach, like a button to go to settings
                    } else {
                        navigator.geolocation.getCurrentPosition(success, error);
                    }
                });
        } else {
            toast({
                position: "top-right",
                description: "Geolocation is not supported in your browser.",
                status: "error",
                isClosable: true,
            });
        }
    };



    return (
        <MainMap coordinates={mapCenter} />
    );
};

export default UserMap;
