import {
    Box,
    Flex,
    Text,
    VStack,
    Heading,
    useToast,
    Center,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button, // Add this import for the Button component
    Spinner, // Add this import for the Spinner component
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { COLORS } from "@/layout/Theme";
import { createAddressData, getAddressData, verifyAddressData } from "@/url/api's/claimAddress";
import { useSelector } from "react-redux";
import { RWebShare } from "react-web-share";

interface AddressData {
    country: string;
    country_code: string;
    county: string;
    neighbourhood: string;
    postcode: string;
    road: string;
    address: string;
}


function RegisterFormAddress2({ data, setData, page, setPage }: any) {
    const toast = useToast();
    const [addressData, setAddressData] = useState<AddressData>(data);
    const [editable, setEditable] = useState(false); // State to control editability
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const { query} = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();



    const validationSchema = Yup.object({
        neighbourhood: Yup.string().required("Neighbourhood is required"),
    });

    const claimAddress = async (values: any, { setSubmitting, resetForm }: any) => {
        setLoading(true);
        try {
            const updatedAddressData = { ...addressData, ...values }; // Combine existing and updated values
            await verifyAddressData({ user_id: user.user_id, data: { address: updatedAddressData.address } });
            toast({
                position: "top-right",
                description: "Successfully completed claiming your address",
                status: "success",
                isClosable: true,
            });
            router.push("/dashboard");
        } catch (error: any) {
            setError(error.response.data.message);
            toast({
                position: "top-right",
                description: error.response.data.message,
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };


    const fetchAddressData = async () => {
        try {
            setLoading(true);
            const { data } = await getAddressData({ lat: query.lat, lng: query.lng });
            setAddressData({ ...data.address, address: data.gainCode });
        } catch (error: any) {
            setError(error.response.data.message);
            toast({
                position: "top-right",
                description: error.response.data.message,
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAddressData();
    }, [query.lat]);

    return (
        <>
            {loading ? (
                <Center w="full" h="500px">
                    <Spinner size="xl" />
                </Center>
            ) : error ? (
                <Text color="red">{error}</Text>
            ) : (
                <Box h="600px">
                    <Formik
                        initialValues={addressData}
                        onSubmit={claimAddress}
                        validationSchema={validationSchema}
                        enableReinitialize={true} // Allow re-initialization with new data
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form>
                                <Center pt={["0px", "0px", "0px", "60px"]} flexDir="column">
                                    <Center w="full" justifyContent="space-between" mb="40px">
                                        <Box />
                                        <Center onClick={() => setEditable(!editable)}>
                                            <Box fontWeight="700" mr="10px">
                                                Click to edit incorrect information below
                                            </Box>
                                            <IconButton aria-label="" >
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </IconButton>
                                        </Center>
                                    </Center>
                                    <Table variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Th>Country</Th>
                                                <Td>
                                                    <Input type="text" name="country" value={values.country} disabled />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Country Code</Th>
                                                <Td>
                                                    <Input type="text" name="country_code" value={values.country_code} disabled />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Local Government</Th>
                                                <Td>
                                                    <Input type="text" name="county" value={values.county} disabled />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Neighbourhood</Th>
                                                <Td>
                                                    <Input type="text" name="neighbourhood" value={values.neighbourhood} onChange={(e) => setFieldValue('neighbourhood', e.target.value)} disabled={!editable} />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Post Code</Th>
                                                <Td>
                                                    <Input type="text" name="postcode" value={values.postcode} disabled />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Street Name</Th>
                                                <Td>
                                                    <Input type="text" name="road" value={values.road} disabled={!editable} onChange={(e) => setFieldValue('road', e.target.value)} />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Digital Address</Th>
                                                <Td>
                                                    <Input type="text" name="address" value={values.address} disabled />
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                    <Center
                                        left="0px"
                                        w={"full"}
                                        mt="20px"
                                        pb="80px"
                                        justifyContent="space-between"
                                    >
                                        <Button
                                            colorScheme="blue"
                                            bg={COLORS.blue}
                                            isLoading={isSubmitting}
                                            isDisabled={isSubmitting}
                                            h="50"
                                            w={["125px", "175px"]}
                                            borderRadius="6px"
                                            type="submit"
                                            color={COLORS.white}
                                        >
                                            Complete
                                        </Button>
                                        <RWebShare
                                            data={{
                                                text: "share your address with accress",
                                                url: `gainnigeria.ng/address/${values.address}`,
                                                title: "Gain Claim",
                                            }}
                                            onClick={() => {
                                                toast({
                                                    position: "top-right",
                                                    title: "Coping",
                                                    description: "your address link has be successfully copied",
                                                    status: "success",
                                                    isClosable: true,
                                                });
                                            }}
                                        >
                                            <Button
                                                colorScheme="green"
                                                bg={COLORS.green}
                                                isLoading={isSubmitting}
                                                isDisabled={isSubmitting}
                                                h="50"
                                                w={["125px", "175px"]}
                                                borderRadius="6px"
                                                color={COLORS.white}
                                            >
                                                Share
                                            </Button>
                                        </RWebShare>
                                    </Center>
                                </Center>
                            </Form>
                        )}
                    </Formik>
                </Box>
            )}
        </>
    );
}

export default RegisterFormAddress2;

