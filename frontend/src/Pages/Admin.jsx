import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { Box, Image, Center, useDisclosure, Input, FormControl, FormLabel, GridItem } from '@chakra-ui/react'
import {
    Heading,
    Text,
    Stack,
} from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const Admin = () => {

    const [isLoading, setisLoading] = useState(true)

    const [product, setproduct] = useState([])

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("")
    const [images, setimages] = useState("")

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() => {
        axios.get("http://localhost:3001/product")
            .then((res) => {
                setproduct(res.data)
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [product])

    const remove = (id) => {
        axios.delete("http://localhost:3001/product/delete/" + id).then((res) => {

        }).catch((err) => {
            console.log(err);
        })
    }

    const updatevalue = (id) => {
        let obj = {

        }
        axios.patch("http://localhost:3001/product/update/" + id, obj).then((res) => {

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <NavBar />
            <Button colorScheme='blue' onClick={() => navigate("/addproduct")}>Add Product</Button>
            <SimpleGrid columns={[1, 3, 5]} gap={6}>
                {
                    isLoading ? <Box color='black'>
                        <Center width={"100vw"} height={"80vh"}>
                            <Image src='https://media1.giphy.com/media/hC2mA1FWFs2OowO60p/giphy.gif?cid=ecf05e47ebbdlwbumor8t49rqbcn0durcagv02zro6j0qi9i&rid=giphy.gif&ct=g' alt='Loading' />
                        </Center>
                    </Box> : product.map((value) => {
                        return (
                            <Center py={12}>
                                <Box
                                    role={'group'}
                                    p={6}
                                    boxShadow={'2xl'}
                                    rounded={'lg'}
                                    pos={'relative'}
                                    zIndex={1}>
                                    <Box
                                        rounded={'lg'}
                                        mt={-12}
                                        pos={'relative'}>
                                        <Image
                                            rounded={'lg'}
                                            height={230}
                                            width={282}
                                            objectFit={'cover'}
                                            src={value.images[0]}
                                        />
                                    </Box>
                                    <Stack pt={10} align={'center'}>
                                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                            {value.category}
                                        </Text>
                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                            {value.title}
                                        </Heading>
                                        <Stack direction={'row'} align={'center'}>
                                            <Text fontWeight={800} fontSize={'xl'}>
                                                {value.price} $
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    <Center>
                                        <Button colorScheme='blue' onClick={() => remove(value._id)}>Remove</Button>
                                        <Button colorScheme='blue' onClick={onOpen}>Update</Button>
                                    </Center>
                                </Box>
                            </Center>
                        )
                    })
                }
            </SimpleGrid >
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}
                finalFocusRef={finalRef}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w={"50%"} m="auto">
                            <FormControl as={GridItem} colSpan={6}>
                                <FormLabel
                                    htmlFor="street_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: 'gray.50',
                                    }}
                                    mt="2%">
                                    Title
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="street_address"
                                    id="street_address"
                                    autoComplete="street-address"
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    onChange={(e) => settitle(e.target.value)}
                                />
                            </FormControl>

                            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                                <FormLabel
                                    htmlFor="city"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: 'gray.50',
                                    }}
                                    mt="2%">
                                    Description
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="city"
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                            </FormControl>

                            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                <FormLabel
                                    htmlFor="state"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: 'gray.50',
                                    }}
                                    mt="2%">
                                    Price
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="state"
                                    id="state"
                                    autoComplete="state"
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    onChange={(e) => setprice(e.target.value)}
                                />
                            </FormControl>

                            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                <FormLabel
                                    htmlFor="postal_code"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: 'gray.50',
                                    }}
                                    mt="2%">
                                    Category
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    autoComplete="postal-code"
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    onChange={(e) => setcategory(e.target.value)}
                                />
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>

                                <FormLabel
                                    htmlFor="postal_code"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: 'gray.50',
                                    }}
                                    mt="2%">
                                    image Link
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    autoComplete="postal-code"
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    onChange={(e) => setimages(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={updatevalue}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Admin;