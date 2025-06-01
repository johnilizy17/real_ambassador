import {
    Box,
    Button,
    Center,
    Flex,
    IconButton,
    Img,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/layout/Theme";
import MainMap from "./MainMap";
import { useSelector } from "react-redux";
import { getClaimedAddresses } from "@/url/api's/userProfile";

// Define Coordinates interface
interface Coordinates {  
    lat: number;
    long: number;
    digital_address?: string;
}
interface UserMapProps {
    coordinates: Coordinates[];
  }

const UserMap: React.FC<UserMapProps> = ({ coordinates }) => {
    const toast = useToast();
    const [data, setData] = useState<Coordinates>({ lat: 0, long: 0 });
    const [locationAcquired, setLocationAcquired] = useState(false);
    const { editState } = useSelector((a: { driver: { editState: boolean } }) =>  a.driver)

    function success(position: GeolocationPosition) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setData({ lat: latitude, long: longitude });

        // Show toast only if location hasn't been acquired before
        if (!locationAcquired) {
            setLocationAcquired(true);
        }
    }

    function error(err: GeolocationPositionError) {
        toast({
            position: "top-right",
            description: "Unable to retrieve your location",
            status: "error",
            isClosable: true,
        });
    }

    function getLocation() {
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
                        window.location.href = "app-settings:location";
                    } else if (permissionStatus.state === "granted") {
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
    }

    useEffect(() => {
        getLocation();
    }, [editState]);

    return <MainMap coordinates={data} />;
}
export default UserMap;