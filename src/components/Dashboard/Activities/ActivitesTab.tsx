import { Flex } from '@chakra-ui/react';
import React from 'react';
import Navtab from './tab/NavTab';
import Tab_1 from './tab/tab_1';

export default function ActivitiesTab() {

    return (
        <Flex flexDir={["column","column","row"]} p={["20px", "20px", "20px", "30px"]}>
            <Navtab />
            <Tab_1 />
        </Flex>
    )
}