import {
    Box, Grid, Stack, Heading, Flex, Text, Progress, Button, IconButton, Spacer, HStack,
} from "@chakra-ui/react";
import { AddIcon, CalendarIcon } from "@chakra-ui/icons";
import UserMap from "./UserMap";
import { COLORS } from "@/layout/Theme";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getClaimedAddresses } from "@/url/api's/userProfile";
import server from "@/url/axios/server";


interface Address {
    claim_id: string;
    user_id: string;
    digital_address: string;
    address_json: any; // Or a more specific type if known
    created_at: string;
}

interface Coordinates {
    lat: number;
    long: number;
}

export default function MapDashboard() {
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const fetchAddressesAndCoordinates = async () => {
            setLoading(true);
            try {
                if (!user || !user.user_id) {
                    throw new Error("User not logged in or user ID missing.");
                }
                const claimedAddresses: Address[] = await getClaimedAddresses(user.user_id);
                const firstFiveAddresses = claimedAddresses.slice(0, 5);
                setAddresses(firstFiveAddresses);


                const addressCoordinates: Coordinates[] = await Promise.all( // Use Promise.all
                  firstFiveAddresses.map(async (address) => {
                      try {
                          const response = await server.post(`/address/lookup/${address.digital_address}`);
                          const { lat, long } = response.data.data.Coordinates;
                          return { lat, long, digital_address: address.digital_address };
                      } catch (err) {
                          console.error("Error getting coordinates:", err);
                          return null; // Return null for failed requests.
                      }
                  })
              ).then(results => results.filter(result => result !== null) as Coordinates[]); // Filter out the failed requests after await completes.

              setCoordinates(addressCoordinates);

                // Previous code
                // for (const address of claimedAddresses.slice(0, 5)) {
                //     try {
                //         const response = await server.get(`/address/lookup/${address.digital_address}`);
                //         const { lat, long } = response.data.data.Coordinates;
                //         addressCoordinates.push({ lat, long });
                //     } catch (err) {
                //         console.error("Error getting coordinates:", err);
                //     }
                // }



            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching addresses:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.user_id) {
            fetchAddressesAndCoordinates();
        }

    }, [user]);


    return (
        <Box w="full" mx="auto">
            <Heading p={{ base: 4, md: 8 }} size="md" mb={4}>Digital Addresses</Heading>
            <Grid templateColumns={["1fr", "1fr", "1fr", "2fr 1fr"]} gap={6}>

                <Box
                    bg="gray.50"
                    borderRadius="lg"
                    p={["0px", "0px", "0px", 6]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                >
                    {loading ? (
                        <Text>Loading map...</Text>
                    ) : error ? (
                        <Text>Error: {error}</Text>
                    ) : (
                        <UserMap coordinates={coordinates} />
                    )}
                </Box>


                <Box bg="gray.50" borderRadius="lg" p={6}>
                {loading && <Text>Loading addresses...</Text>}
                {!loading && addresses.length === 0 && <Text>No addresses found.</Text>}
                {!loading && addresses.length > 0 && (
                    <>
                    <Flex align="center" justify="space-between" mb={4}>
                        <Heading size="lg">{addresses.length}</Heading>
                        <Text color="gray.500" fontSize="sm">
                            Address activity by location
                        </Text>
                    </Flex>
                        <Stack spacing={4}>
                            {addresses.map((address) => (
                                <Text key={address.claim_id}>{address.digital_address}</Text>
                            ))}

                        </Stack>
                    </>
                    )}
                    <Box mt={4} textAlign="right">
                        <Button variant="link" bg={COLORS.blue} colorScheme="blue" size="sm">
                            See All Demographics
                        </Button>
                    </Box>

                </Box>
            </Grid>
        </Box>
    );
}

