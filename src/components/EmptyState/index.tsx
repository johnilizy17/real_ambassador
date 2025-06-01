import { Center, Text } from '@chakra-ui/react'
import Lottie from "react-lottie";
import animationData from './empty.json';
import LottieLoader from '@/utils/LottieLoader';

export function EmptyState({ title, width, height }: { title: string, width?: number, height?: number }) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Center flex={1} flexDirection="column">
            <LottieLoader defaultOptions={defaultOptions} height={height ? height : 320} width={width ? width : 320} />
            <Text>{title ? title : "No data found"}</Text>
        </Center>
    )
}