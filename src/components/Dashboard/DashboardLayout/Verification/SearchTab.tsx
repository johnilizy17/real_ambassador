import { Box, Center, Flex, IconButton, Img, Input } from '@chakra-ui/react'
import React from 'react'
import Image from "next/image";

export default function SearchTab() {

    return (
        <Center display={["none", "none", "none", "flex"]} h="72px" p="30px" bg="#fff" className="TopNavTab" boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)" justifyContent="space-between">
            <Center bg="#F9F9F9" borderRadius="16px" pl="5px" pr="5px" h="40px">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5763 9.54717H10.0343L9.8422 9.36192C10.5146 8.57976 10.9194 7.56432 10.9194 6.45969C10.9194 3.99657 8.92281 2 6.45969 2C3.99657 2 2 3.99657 2 6.45969C2 8.92281 3.99657 10.9194 6.45969 10.9194C7.56432 10.9194 8.57976 10.5146 9.36192 9.8422L9.54717 10.0343V10.5763L12.9777 14L14 12.9777L10.5763 9.54717ZM6.45969 9.54717C4.75129 9.54717 3.37221 8.1681 3.37221 6.45969C3.37221 4.75129 4.75129 3.37221 6.45969 3.37221C8.1681 3.37221 9.54717 4.75129 9.54717 6.45969C9.54717 8.1681 8.1681 9.54717 6.45969 9.54717Z" fill="#898989" />
                </svg>
                <Input focusBorderColor='transparent' placeholder='Search…' ml="5px" borderColor="transparent" />
            </Center>
            <Center>
                <IconButton aria-label='' colorScheme="white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="#898989" />
                    </svg>
                </IconButton>

                <IconButton ml="10px" aria-label='' colorScheme="white">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23C13.6 23 14.5 22.1 14.5 21H10.5C10.5 22.1 11.4 23 12.5 23ZM19 17V11.5C19 8.43 16.87 5.86 14 5.18V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.18C8.13 5.86 6 8.43 6 11.5V17L4 19V20H21V19L19 17Z" fill="#898989" />
                        <circle cx="20" cy="5" r="4" fill="#F9837C" stroke="white" strokeWidth="2" />
                    </svg>
                </IconButton>
                <Center ml="20px">
                    <Center borderRadius={"50px"} height="40px" w="40px" mr="10px" overflow="hidden">
                        <Img src="/assets/images/923190c9afedba2202f0c8bb9fe5a259.jpeg" alt="" w="60px" maxW="60px" />
                    </Center>
                    <Box>
                        <Box fontWeight="500" fontSize="14px" >
                            Allen Pere
                        </Box>
                        <Box fontWeight="400" fontSize="12px" >
                            Admin
                        </Box>
                    </Box>
                </Center>
            </Center>
        </Center>
    )
}