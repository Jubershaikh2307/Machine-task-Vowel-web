import React from 'react';
import { useEffect } from 'react';
import NavBar from '../Components/NavBar';
import axios from "axios"
import { useState } from 'react';
import { Box, Image, Center } from '@chakra-ui/react'
import {
    Heading,
    Text,
    Stack,
} from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Landingpage = () => {

    const [isLoading, setisLoading] = useState(true)

    const [product, setproduct] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/product")
            .then((res) => {
                setproduct(res.data)
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleClick = (id) => {
        let userid = JSON.parse(localStorage.getItem("userid"))
        if (userid) {
            let obj = {
                user_id: userid.id,
                product_id: id
            }
            axios.post("http://localhost:3001/cart/add", obj)
                .then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            navigate("/login")
        }
    }

    return (
        <>
            <NavBar />
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
                                        <Button colorScheme='blue' onClick={() => handleClick(value._id)}>Add To Cart</Button>
                                    </Center>
                                </Box>
                            </Center>
                        )
                    })
                }
            </SimpleGrid >
        </>
    );
};

export default Landingpage;