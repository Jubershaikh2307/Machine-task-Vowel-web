import { ReactNode } from 'react';
import {
    Box,
    Flex,
    HStack,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Link to="/">
                        <HStack spacing={8} alignItems={'center'}>
                            <Box>Logo</Box>
                            <HStack
                                as={'nav'}
                                spacing={4}
                                display={{ base: 'none', md: 'flex' }}>
                            </HStack>
                        </HStack>
                    </Link>
                    <HStack spacing={8} alignItems={'center'}>
                        <Link to="/cart"><Box>Cart</Box></Link>
                        <Link to="/login"><Box>Login</Box></Link>
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default NavBar;