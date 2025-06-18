import { Box, Button, Center, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { COLORS } from "../utils/theme";
import { useSelector } from "react-redux";

export default function Banner() {

    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    return (
        <>
            <Box h={["auto", "730px"]} bg={COLORS.white} color="#fff" p={["20px", "20px", "20px", "20px"]} pb={["80px", "80px", "80px", "20px"]} pl={["20px", "20px", "20px", "120px"]} pr={["20px", "20px", "20px", "120px"]} bgSize={"cover"} bgRepeat={"no-repeat"} bgPos={"center"} className="fade-slide bottom" bgImage={["./bg2.png", "./bg.png"]}>
                <Center>
                    <Img src="/logo/logo_white.png" w={"250px"} />
                </Center>
                <Center flexDir={"column"} mt="50px" textAlign={"center"}>
                    <Box fontFamily={"Aclonica"} w={["full", "full", "full", "700px"]} fontSize={["18px", "32px"]} lineHeight={["18px", "32px"]} fontWeight={"bold"} textAlign={"center"}>
                        Know exactly where you can earn big with no <span style={{ color: "yellow" }}>restriction</span> (become a millionary).
                    </Box>
                    <Box mt="30px" w={["full", "full", "full", "700px"]}>
                        <p>
                            In today’s fast-paced digital world, your marketing skills are more powerful than ever. Whether you're an entrepreneur, freelancer, or career professional, knowing how to promote, position, and persuade can give you a serious competitive edge.
                        </p>
                    </Box>
                    {user && user.id ? <Button onClick={()=>router.push("/dashboard")} mt="30px" color={COLORS.blue} colorScheme="whiteAlpha" bg="#fff" h="50px" w="300px">
                        Dashboard
                    </Button> : <Button onClick={()=>router.push("/auth/signup")} mt="30px" color="white" colorScheme="yellow" bg="#FFAA01" h="50px" w="300px">
                        Get Started
                    </Button>}
                </Center>
            </Box>
            <Center pos="relative" h={["auto", "auto", "auto", "200px"]} mt={["0px", "0px", "0px", "-200px"]}>
                <Img pos="absolute" left="0px" display={["none", "none", "none", "flex"]} bottom="0px" src="/phone/1.png" />
                <Center p="30px" flexDir={"column"}>
                    <Box pb="20px" color="#000"> Install in your Device</Box>
                    <Center>
                        <Button _hover={{ backgroundImage: "/phone/play.png" }} bgImage={"/phone/play.png"} bgSize={"cover"} h="50px" w={["150px", "150px"]}>

                        </Button>
                        <Button _hover={{ backgroundImage: "/phone/apple.png" }} bgImage={"/phone/apple.png"} bgSize={"cover"} ml="20px" h="50px" w={["150px", "150px"]}>

                        </Button>
                    </Center>
                </Center>
                <Img pos="absolute" right="0px" bottom="0px" display={["none", "none", "none", "flex"]} src="/phone/2.png" />
            </Center>
            <Center display={["flex","flex","flex","none"]}>
                <Img src="/phone/3.png" alt="ios" />
            </Center>
        </>
    )
}