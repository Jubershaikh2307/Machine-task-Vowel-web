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

import { useToast } from '@chakra-ui/react';
import NavBar from '../Components/NavBar';

const CheckOut = () => {

    const [country, setCountry] = useState("")
    const [street, setstreet] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [pincode, setpincode] = useState("")

    const handleclick = () =>{
        if(country && street && city && state && pincode){
            let obj={
                country,
                street,
                city,
                state,
                pincode
            }
            console.log(obj);
        }else{
            alert("Please fill all the details")
        }
    }


    return (
        <>
            <NavBar />
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Details
            </Heading>
            <Box w={"50%"} m="auto">
                <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                        htmlFor="country"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Country / Region
                    </FormLabel>
                    <Select
                        id="country"
                        name="country"
                        autoComplete="country"
                        placeholder="Select option"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={(e) => setCountry(e.target.value)}>
                        <option>India</option>
                        <option>OutSide India</option>
                    </Select>
                </FormControl>

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
                        Street address
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
                        onChange={(e) => setstreet(e.target.value)}
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
                        City
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
                        onChange={(e) => setcity(e.target.value)}
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
                        State / Province
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
                        onChange={(e) => setstate(e.target.value)}
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
                        ZIP / Postal
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
                        onChange={(e) => setpincode(e.target.value)}
                    />
                </FormControl>
                <Center>
                    <Button colorScheme='blue' onClick={handleclick}>Submit</Button>
                </Center>
            </Box>
        </>
    );
};

export default CheckOut;