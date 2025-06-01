// pages/index.js
import {
    Box,
    Flex,
    Heading,
    Stack,
    Icon,
    Text,
    Checkbox,
    Button,
    IconButton,
    Spacer,
    Link,
    Center,
    Spinner,
    Img,
} from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAddressData } from "@/url/api's/claimAddress";
import AddressCard from "./AddressCard";
import * as animationData from '@/Asset/empty.json';
import Lottie from "react-lottie";

export default function ClaimData() {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function showClaimedAddresses() {
        const address = await fetchAddressData({ user_id: user.user_id })
        setLoading(false)
        setData(address)
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        showClaimedAddresses()
    }, [])

    return (
        <Flex p={["20px", "20px", "20px", "30px"]} justifyContent={"space-between"} flexWrap="wrap">
            {loading ?
                <Center w="full" h="400px">
                    <Spinner size="xl" />
                </Center>
                : data.length > 0 ? 
                    data.map((a: { created_at: string, digital_address: string }, b: number) => (
                        <AddressCard
                            key={b}
                            setLoading={setLoading}
                            label={a.digital_address}
                            showClaimedAddresses={showClaimedAddresses}
                            address={a.created_at}
                            phone={a.created_at}
                        />
                    )) :
                    <Center w="full" flexDir="column" h="400px">
                        <Img src="/assets/images/logo-icon.png" w="100px" mb="10px" alt="logo Icon" />
                        <Box mt="20px" fontSize="20px" fontWeight="800">
                            No Address Found
                        </Box>

                    </Center>
            }
        </Flex>
    );
}