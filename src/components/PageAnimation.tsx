import React from 'react';
import { motion } from 'framer-motion';
import { Box, SimpleGrid, Flex } from '@chakra-ui/react';

export const MotionBox = motion(Box);
export const MotionSimpleGrid = motion(SimpleGrid);
export const MotionFlex = motion(Flex);

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

interface PageAnimationProps {
    children: React.ReactNode;
}

export default function PageAnimation({ children }: PageAnimationProps) {
    return (
        <MotionBox
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            w="full"
        >
            {children}
        </MotionBox>
    );
}
