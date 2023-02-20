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


const Cart = () => {

    const [total, setTotal] = useState(0)
    const [isLoading, setisLoading] = useState(true)
    const [product, setproduct] = useState([])
    const navigate = useNavigate()

    function alltotal() {
        let sum = 0
        product.map((el) => {
            sum += (el.product_id.price * el.quantity)
        })
        setTotal(sum)
    }

    useEffect(() => {
        let userid = JSON.parse(localStorage.getItem("userid"))
        // console.log(userid);
        if (userid) {
            axios.get("https://vowelweb-luat.onrender.com/cart/" + userid.id)
                .then((res) => {
                    // console.log(res.data);
                    setproduct(res.data)
                    alltotal()
                    setisLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            navigate("/")
        }
    }, [product])

    const incrementclick = (id) => {
        let userid = JSON.parse(localStorage.getItem("userid"))
        let obj = {
            user_id: userid.id,
            product_id: id
        }
        axios.post("https://vowelweb-luat.onrender.com/cart/add", obj)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const decrementclick = (id, uid) => {
        let userid = JSON.parse(localStorage.getItem("userid"))
        let obj = {
            user_id: userid.id,
            product_id: id
        }
        axios.patch("https://vowelweb-luat.onrender.com/cart/update/" + uid, obj)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const removecart = (id) => {
        axios.delete("https://vowelweb-luat.onrender.com/cart/delete/" + id)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <NavBar />
            <Center>
                <Text fontSize={"30px"}>Total :{total}</Text>
            </Center>
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
                                            src={value.product_id.images[0]}
                                        />
                                    </Box>
                                    <Stack pt={10} align={'center'}>
                                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                            {value.product_id.category}
                                        </Text>
                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                            {value.product_id.title}
                                        </Heading>
                                        <Stack direction={'row'} align={'center'}>
                                            <Text fontWeight={800} fontSize={'xl'}>
                                                {value.product_id.price} $
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    <Center>
                                        <Button colorScheme='blue' onClick={() => incrementclick(value.product_id._id)}>+</Button>
                                        <Text m={"10px"}>{value.quantity}</Text>
                                        <Button colorScheme='blue' onClick={() => decrementclick(value.product_id._id, value._id)}>-</Button>
                                    </Center>
                                    <Center><Button colorScheme='blue' onClick={() => removecart(value._id)}>Remove</Button></Center>
                                </Box>
                            </Center>
                        )
                    })
                }
            </SimpleGrid >
            <Center>
                <Button colorScheme='blue' onClick={()=>navigate("/checkout")}>Check Out</Button>
            </Center>
        </>
    );
};

export default Cart;