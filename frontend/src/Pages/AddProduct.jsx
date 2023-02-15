import React, { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    Center,
} from '@chakra-ui/react';
import axios from 'axios';

const AddProduct = () => {

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("")
    const [images, setimages] = useState("")

    const handleclick = () =>{
        let arr=[]
        arr.push(images)
        if(title && description && price && category && images){
            let obj={
                title,
                price,
                description,
                category,
                images:arr
            }
            axios.post("http://localhost:3001/product/add",obj).then((res)=>{
                alert("Added Successfully")
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    return (
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Add Product
            </Heading>
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
                <Center>
                    <Button colorScheme='blue' onClick={handleclick}>Submit</Button>
                </Center>
            </Box>
            </>
    );
};

export default AddProduct;