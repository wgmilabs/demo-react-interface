import React, {ReactNode} from 'react';
import {Box, ChakraProvider} from "@chakra-ui/react";

type Props = {
    children?: ReactNode;
};

export default function Body({children}: Props) {
    return (
        <ChakraProvider>
            <Box h="100vh" bg="gray.800">
                {children}
            </Box>
        </ChakraProvider>
    )
}
