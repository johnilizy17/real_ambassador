import { Box, Button, Center, Flex, IconButton, Input, Spinner, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import ClaimAbleButton from "./ClaimableButton";
import { COLORS } from "@/layout/Theme";
import { fetchLookUpData } from "@/url/api's/claimAddress";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";

const ViewMap = () => {
  const [location, setLocation] = useState({ state: "", lga: "", PostCode: "", neighbourhood: "", road:"", Coordinates: { lat: 7.4151916666666, lng: 3.899025 } });
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(true)
  const { query } = useRouter()
  const toast = useToast()

  async function FetchMapData() {
    setLoading(true)
    const result = await fetchLookUpData({ name: query.result })
    if (location.PostCode.length < 2) {
      toast({
        position: "top-right",
        description: result.message,
        status: "success",
        isClosable: true,
      })
    }
    setLocation({ ...result.data, Coordinates: { lng: result.data.Coordinates.long, lat: result.data.Coordinates.lat } })
    setLoading(false)
  }

  useEffect(() => {
    FetchMapData()
  }, [query.result])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> <Text fontSize="lg" fontWeight="bold">Address details</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ClaimAbleButton />
          </ModalBody>
        </ModalContent>
      </Modal>
      {loading ?
        <Center w="full" h="400px">
          <Spinner size="xl" />
        </Center>
        :
        <Flex direction="column" mt="70px" h="100vh" bg="gray.100" p={4}>

          {/* ViewMap Display */}
          <Box h="400px" position="relative" borderRadius="md" bg="gray.200">
            <Box
              h="400px"
              bg="red"
            >
              {/* Draggable Pin */}
              <APIProvider apiKey="AIzaSyDL_NHLL9smjZB3ux8jvqvqE8jIdtPRWVM">
                <div style={{ height: "400px", width: "100%" }}>
                  <Map defaultCenter={location.Coordinates} defaultZoom={18} style={{ height: "100%", width: "100%" }} mapTypeId="hybrid" gestureHandling="greedy">
                    <Marker position={location.Coordinates} icon={{ url: "/assets/images/mapmarker.png"}}/>
                  </Map>
                </div>
              </APIProvider>
            </Box>
          </Box>

          {/* Confirm Location Section */}
          <Stack spacing={2} mt={4} bg="white" p={4} borderRadius="md" shadow="md">
            <Text fontSize="lg" fontWeight="bold">
              Address Location
            </Text>
            <Text color="black.500" fontSize="sm">
              <span style={{ fontWeight: "700" }}>Digital Address:</span> {query.result}
            </Text>
            <Text color="black.500" fontSize="sm">
              <span style={{ fontWeight: "700" }}>Street:</span> {location.road}
            </Text>
                        <Text color="black.500" fontSize="sm">
              <span style={{ fontWeight: "700" }}>Neighbourhood:</span> {location.neighbourhood}
            </Text>
            <Text color="black.500" fontSize="sm">
              <span style={{ fontWeight: "700" }}>Post Code:</span> {location.PostCode}
            </Text>
            <Text color="black.500" fontSize="sm">
              <span style={{ fontWeight: "700" }}>Local Government:</span> {location.lga}
            </Text>
            <Text color="black.500" fontSize="sm">
              <span style={{ fontWeight: "700" }}>State:</span> {location.state}
            </Text>
            <Flex justifyContent="center">
              <Button colorScheme="red" onClick={() => router.back()}>
                Go Back
              </Button>
            </Flex>
          </Stack>
        </Flex>
      }
    </>
  );
};

export default ViewMap;
