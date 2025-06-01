import { Box, Flex, Text, VStack, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { getUserProfile } from "@/url/api's/userProfile";
import { useSelector, useDispatch } from "react-redux";
import CustomInput from "@/layout/utills/CustomInput";
import { COLORS } from "@/layout/Theme";

const PersonalForm = () => {
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const userProfileFromRedux = useSelector(state => state.user); // Get user data from Redux
	const userProfile = useSelector(state => state.user); // Get user data from Redux
	const toast = useToast();

	const initialValues = userProfile || {
		first_name: "",
		last_name: "",
		email_address: "",
		phone_number: "",
		// ... other fields from your UserProfile structure
	};

	const validationSchema = Yup.object({
		first_name: Yup.string().required("First name is required"),
		last_name: Yup.string().required("Last name is required"),
		email_address: Yup.string().email("Invalid email").required("Email is required"),
		phone_number: Yup.string().required("Phone number is required"),
		// ... validation for other fields
	});

	const handleSubmit = async (values, { setSubmitting }) => {
		setLoading(true);
		try {
			if (userProfile) {
				await updateUserProfile(userProfile.user_id, values); // Use user_id for updating
				toast({ description: "Profile updated successfully!", status: "success", isClosable: true });
			}
		} catch (error) {
			setErrors([error?.response?.data?.message || "Error updating profile"]);
			toast({ description: error?.response?.data?.message || "Error updating profile", status: "error", isClosable: true });
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				if (userProfile) {
					const profileData = await getUserProfile(userProfile.user_id);
					// Update your Redux store with the fetched profile data. You'll need to dispatch an action here.
					dispatch({ type: "SET_USER_PROFILE", payload: profileData });
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
				setErrors(["Error fetching profile"]);
				toast({ description: "Error fetching profile", status: "error", isClosable: true });
			}
		};
		fetchProfile();
	}, [userProfileFromRedux]);

	return (
		<>
			{errors && errors.length > 0 && (
				<Box mb="8" borderColor="red" borderWidth="thin" p="2" rounded="md">
					{errors.map((error, id) => (
						<Text key={id} color="red" fontSize="sm">
							{error}
						</Text>
					))}
				</Box>
			)}
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{({ isSubmitting, isValid, dirty }) => (
					<Form>
						<VStack spacing="4">
							<CustomInput label="First Name" name="first_name" fieldProps={{ type: "text" }} />
							<CustomInput label="Last Name" name="last_name" fieldProps={{ type: "text" }} />
							<CustomInput label="Email" name="email_address" fieldProps={{ type: "email" }} />
							<CustomInput label="Phone Number" name="phone_number" fieldProps={{ type: "tel" }} />
							{/* Add other input fields for remaining properties from your UserProfile */}
						</VStack>
						<Flex justify="center" mt="4">
							<Button
								isLoading={loading}
								type="submit"
								mt="4"
								colorScheme="blue"
								bg={COLORS.blue}
								textTransform="capitalize"
								disabled={!isValid || !dirty}
							>
								Save Changes
							</Button>
						</Flex>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default PersonalForm;
