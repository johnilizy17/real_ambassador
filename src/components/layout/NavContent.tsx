import { Box, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function NavContent() {

    const router = useRouter();

    return (
        <Box className="cp_navi_main_wrapper index2_header_wrapper float_left" pos="fixed" zIndex={10}>
            <Box className="container-fluid">
                <Box className="cp_logo_wrapper">
                    <Img display={["none", "none", "none", "flex"]} src="/logo/logo_white.png" alt="logo" />
                    <Img display={["flex", "flex", "flex", "none"]} h="50px" src="images/logo4.png" alt="logo" />
                </Box>
                <Box className="top_header_right_wrapper top_phonecalls">
                    <Box className="header_btn">
                        <ul>
                            <li>
                                <Box onClick={() => router.push("/auth/signup")} style={{ color: "white" }}> <a style={{color:"#fff"}}>   register
                                </a></Box>
                            </li>
                            <li>

                                <Box onClick={() => router.push("/auth/login")}> <a>login</a> </Box>

                            </li>
                        </ul>

                    </Box>
                </Box>
            </Box>
        </Box>

    )
}