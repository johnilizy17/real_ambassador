import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { Field, FieldProps } from 'formik';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CustomInputProps {
  fieldProps?: object;
  label?: string;
  name: string;
  type?: 'input' | 'textarea' | 'select' | 'phone';
  typeInput?: string;
  placeholder?: string;
  children?: React.ReactNode;
  handleChange?: (value: string) => void;
  value?: string;
  float?: boolean;
}

function CustomInput({
  fieldProps = {},
  label = '',
  name,
  type = 'input',
  typeInput = 'text',
  placeholder,
  children = <></>,
  handleChange = () => { },
  value = '',
  float = false,
}: CustomInputProps) {
  const [touched, setTouched] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const pickFormField = ({
    fieldType,
    options = {},
  }: {
    fieldType: string;
    options?: object;
  }) => {
    switch (fieldType) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            name={name}
            bg='#EFF0F6'
            borderWidth='none'
            placeholder={placeholder || ''}
            borderColor='transparent'
            {...options}
          />
        );
      case 'select':
        return (
          <Select
            id={name}
            name={name}
            placeholder={placeholder}
            bg='#EFF0F6'
            borderWidth='none'
            borderColor='transparent'
            {...options}
          >
            {children}
          </Select>
        );
      case 'phone':
        return (
          <Box
            fontSize='14px'
            borderWidth='1px'
            borderRadius='8px'
            paddingLeft='10px'
            paddingRight='10px'
            borderColor='rgba(226, 230, 241, 1)'
            fontWeight='700'
          >
            <PhoneInput
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleChange(e as string)}
            />
          </Box>
        );
      default:
        return (
          <InputGroup>
            <Input
              id={name}
              name={name}
              placeholder={placeholder}
              _placeholder={{
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '400',
              }}
              type={
                typeInput === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : typeInput
              }
              h='44px'
              fontSize='14px'
              borderWidth='1px'
              borderRadius='8px'
              borderColor='rgba(226, 230, 241, 1)'
              value={value}
              fontWeight='700'
              {...options}
            />
            {typeInput === 'password' && (
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <EyeOff /> : <Eye />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant='ghost'
                  size='sm'
                />
              </InputRightElement>
            )}
          </InputGroup>
        );
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const isInvalid = form.errors[name] && form.touched[name];
        return (
          <FormControl
            isInvalid={!!isInvalid}
            mt={touched || field.value ? '2' : '0'}
          >
            {label && (
              <FormLabel
                pointerEvents='none'
                position='absolute'
                top='-30px'
                ml={!float && (touched || field.value) ? '-2' : '3'}
                bg={float ? '#F1F2F3' : 'transparent'}
                rounded='md'
                fontWeight='400'
                px='2'
                zIndex='2'
                mb='1'
                fontSize='13px'
                color={isInvalid ? 'red' : 'rgba(16, 24, 40, 1)'}
                borderColor={isInvalid && touched ? 'red' : 'transparent'}
                borderWidth={float ? 'thin' : 'none'}
              >
                {label}
              </FormLabel>
            )}
            {pickFormField({
              fieldType: type,
              options: { ...field, ...fieldProps },
            })}
            <FormErrorMessage fontSize='xs' lineHeight='none'>
              {form.errors[name] as string}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default CustomInput;
