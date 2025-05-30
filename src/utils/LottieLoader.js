import React from "react";
import Lottie from 'react-lottie';

export default function LottieLoader({defaultOptions, height, width}){

    return(
        <Lottie options={defaultOptions}
        height={height?height:400}
        width={width?width:400} />
    )
}