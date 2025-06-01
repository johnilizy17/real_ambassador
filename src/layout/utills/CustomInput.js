import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { useState } from "react";
import { COLORS } from "../Theme";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

function CustomInput({
	fieldProps = {},
	label,
	name,
	type = "input",
	typeInput,
	placeholder,
	children = (<></>),
	handleChange = {},
	value,
	showPassword={},
	onChangeShowPassword={},
	float = false,
}) {
	const [touched, setTouched] = useState(true);
	const transitionProperties = {
		transitionProperty: "all",
		transitionDuration: "0.2s",
		transitionTimingFunction: "ease-in-out",
	};
	const [value2, setValue2] = useState("")

	const pickFormField = ({ fieldType, options = {} }) => {
		switch (fieldType) {
			case "textarea":
				return (
					<Textarea
						position="relative"
						id={name}
						name={name}
						bg="#EFF0F6"
						borderWidth="none"
						placeholder={placeholder ? placeholder : ""}
						borderColor="transparent"
						{...options}
					></Textarea>
				);
			case "select":
				return (
					<Select
						id={name}
						name={name}
						bg="#EFF0F6"
						borderWidth="none"
						borderColor="transparent"
						{...options}
					>
						{children}
					</Select>
				);
			case "phone":
				return (
					<Box
						fontSize={["14px"]}
						borderWidth="1px"
						borderRadius={"8px"}
						paddingLeft={"10px"}
						paddingRight="10px"
						borderColor="rgba(226, 230, 241, 1)"
						fontWeight="700"
					>
						<PhoneInput
							position="relative"
							onFocus={() => setTouched(true)}
							_placeholder={{ color: "rgba(102, 112, 133, 1)", fontWeight: "400" }}
							style={{ height: 60 }}
							id={name}
							name={name}
							placeholder={placeholder}
							value={value}
							onChange={(e) => {
								handleChange(e) 
								}} />
					</Box>
				);

			default:
				return (
					<Input
						position="relative"
						onFocus={() => setTouched(true)}
						id={name}
						name={name}
						placeholder={placeholder}
						_placeholder={{ color: "rgba(102, 112, 133, 1)", fontWeight: "400" }}
						type={typeInput ? typeInput : "text"}
						h="44px"
						fontSize={["14px"]}
						borderWidth="1px"
						borderRadius={"8px"}
						borderColor="rgba(226, 230, 241, 1)"
						value={value}
						fontWeight="700"
						{...options}
					/>
				);
		}
	};

	return (
		<>
			<Field name={name}>
				{({ field, form }) => {
					const isInvalid = form.errors[name] && form.touched[name];
					return (
						<FormControl
							isInvalid={isInvalid}
							mt={touched || field.value ? "2" : "0"}
						>
							{label && (
								<FormLabel
									{...transitionProperties}
									pointerEvents="none"
									position="absolute"
									top={"-30px"}
									ml={!float && (touched || field.value) ? "-2" : "3"}
									bg={float ? "#F1F2F3" : "transparent"}
									rounded="md"
									fontWeight="400"
									
									px="2"
									zIndex="2"
									mb="1"
									fontSize="13px"
									color={isInvalid ? "red" : "rgba(16, 24, 40, 1)"}
									borderColor={isInvalid && touched ? "red" : "transparent"}
									borderWidth={float ? "thin" : "none"}
								>
									{label}
								</FormLabel>
							)}
							{pickFormField({
								fieldType: type,
								options: { ...field, ...fieldProps },
							})}

							<FormErrorMessage fontSize="xs" lineHeight="none">
								{form.errors[name]}
							</FormErrorMessage>
						</FormControl>
					);
				}}
			</Field>
		</>
	);
}

export default CustomInput;
