import { COLORS } from '@/layout/Theme';
import { Box, Button, Center, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import statesData from './states.json';

// Define interface for the states data structure
interface StatesData {
    [state: string]: string[];
}

interface SearchPeopleProps {
    onSearchFiltersChange: (filters: {
        searchQuery: string;
        lga: string;
        state: string;
    }) => void;
}

export default function SearchPeople({ onSearchFiltersChange }: SearchPeopleProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [lga, setLga] = useState('');
    const [state, setState] = useState('');

    // Type assertion for the imported data
    const nigerianStates = statesData as StatesData;
    
    const handleSearch = () => {
        onSearchFiltersChange({
            searchQuery,
            lga,
            state
        });
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
        setLga(''); // Reset LGA when state changes
    }

    return (
        <Box p={["20px", "20px", "20px", "30px"]} pt="0px">
            <Center h={["auto", "auto", "auto", "89px"]} flexDir={["column", "column", "column", "row"]} p={["20px", "20px", "20px", "30px"]} justifyContent={"start"} borderRadius="8px" w="full" bg={COLORS.white}>
                <Center bg="#f9f9f9" mb="10px" w={"full"} borderRadius="16px" pl="5px" pr="5px" h="40px">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5763 9.54717H10.0343L9.8422 9.36192C10.5146 8.57976 10.9194 7.56432 10.9194 6.45969C10.9194 3.99657 8.92281 2 6.45969 2C3.99657 2 2 3.99657 2 6.45969C2 8.92281 3.99657 10.9194 6.45969 10.9194C7.56432 10.9194 8.57976 10.5146 9.36192 9.8422L9.54717 10.0343V10.5763L12.9777 14L14 12.9777L10.5763 9.54717ZM6.45969 9.54717C4.75129 9.54717 3.37221 8.1681 3.37221 6.45969C3.37221 4.75129 4.75129 3.37221 6.45969 3.37221C8.1681 3.37221 9.54717 4.75129 9.54717 6.45969C9.54717 8.1681 8.1681 9.54717 6.45969 9.54717Z" fill="#898989" />
                    </svg>
                    <Input 
                        focusBorderColor='transparent' 
                        placeholder='Search for people or phone numbers' 
                        ml="5px" 
                        borderColor="transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Center>
                <Center w="full">
                    <Select
                        mb="10px"
                        placeholder='State'
                        mr={"15px"}
                        ml={["0px", "0px", "0px", "15px"]}
                        w={["full", "full", "full", "164px"]}
                        value={state}
                        onChange={handleStateChange}
                    >
                        {Object.keys(nigerianStates).map((stateName) => (
                            <option key={stateName} value={stateName}>
                                {stateName}
                            </option>
                        ))}
                    </Select>
                    <Select
                        mb="10px"
                        placeholder='LGA'
                        mr={["0px", "0px", "0px", "15px"]}
                        w={["full", "full", "full", "164px"]}
                        value={lga}
                        onChange={(e) => setLga(e.target.value)}
                        isDisabled={!state}
                    >
                        {state && nigerianStates[state].map((lgaName) => (
                            <option key={lgaName} value={lgaName}>
                                {lgaName}
                            </option>
                        ))}
                    </Select>
                </Center>
                <Button 
                    mb="10px" 
                    bg="#7ED31F" 
                    w="146.97px" 
                    h="42.19px" 
                    color={COLORS.white} 
                    colorScheme='green'
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Center>
        </Box>
    );
}