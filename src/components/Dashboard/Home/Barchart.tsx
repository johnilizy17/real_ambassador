import React, { useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { COLORS } from "@/layout/Theme";
import IndexArrow from "@/Asset/IndexArrow";
import { cashFormat, nFormatter, nFormatterNaira } from "@/components/Util/cashformat";

function BarChart() {

  const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70, 100])
  const [number, setNumber] = useState(100)
  function largest(arr: any) {
    let i;

    // Initialize maximum element 
    let max = arr[0];

    // Traverse array elements  
    // from second and compare 
    // every element with current max  
    for (i = 1; i < arr.length; i++) {
      if (arr[i] > max)
        max = arr[i];
    }

    return max;
  }
  useEffect(() => {
    const largestNumber = largest(data)
    setNumber(largestNumber)
  }, [data])
  return (
    <Box w="full">
      <Flex overflow="hidden" alignItems="flex-end" pt="20px" w="full" h="260px">
        {data.map((a: number, b: number) => (
          <Box key={b} mr="19px" w="8px" h={`${(a * 100) / number}%`} borderRadius="2px" bg={COLORS.blue} />
        ))}
        <Flex>

        </Flex >
      </Flex >
      <Flex justifyContent="space-between">
        <Box mt="24px">
          <Box  fontWeight="400" fontSize="14px">Last Year</Box>
          <Center justifyContent={"flex-start"}>
            <IndexArrow color={"#7ED31F"} />
            <Box ml="4px"  color="#7ED31F" fontWeight="500" fontSize="14px">{nFormatter(800401990, 1)}</Box>
          </Center>
        </Box>
        <Box mt="24px">
          <Box  fontWeight="400" fontSize="14px">Last Week</Box>
          <Center justifyContent={"flex-start"}>
            <IndexArrow color={"#F9837C"} />
            <Box ml="4px"  color="#F9837C" fontWeight="500" fontSize="14px">2004</Box>
          </Center>
        </Box>
        <Box mt="24px">
          <Box  fontWeight="400" fontSize="14px">Last Month</Box>
          <Center justifyContent={"flex-start"}>
            <IndexArrow color={"#7ED31F"} />
            <Box ml="4px"  color="#7ED31F" fontWeight="500" fontSize="14px">{nFormatterNaira(80001, 1)}</Box>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}
export default BarChart;
