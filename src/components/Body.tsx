import React, {ReactNode} from 'react';
import {Box, ChakraProvider} from "@chakra-ui/react";

type Props = {
    children?: ReactNode;
};

export default function Body({children}: Props) {
    return (
        <ChakraProvider>
            <Box h="100%" bg="gray.800" minH="100vh">
                {children}
            </Box>
        </ChakraProvider>
    )
}
