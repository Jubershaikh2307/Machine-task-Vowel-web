import { ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import NavBar from '../Components/NavBar';

const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpasword] = useState("")

    const navigate = useNavigate()

    const handleClick = () =>{
        if(email && password){
            let obj={
                email,
                password
            }
            axios.post("http://localhost:3001/user/login",obj)
            .then((res)=>{
                if(res.data.responce == 1 && res.data.role=="user"){
                    let data = {
                        id:res.data.id,
                        role:res.data.role
                    }
                    localStorage.setItem("userid",JSON.stringify(data))
                    navigate("/")
                }else if(res.data.role=="admin"){
                    let data = {
                        id:res.data.id,
                        role:res.data.role
                    }
                    localStorage.setItem("userid",JSON.stringify(data))
                    navigate("/admin")
                }
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            alert("Fill all the details")
        }
    }

    return (
        <>
            <NavBar />
            <Stack minH={'91vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(e)=>setemail(e.target.value)}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e)=>setpasword(e.target.value)}/>
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Flex></Flex>
                                <Link to="/signup">Create An Account</Link>
                            </Stack>
                            <Button colorScheme={'blue'} variant={'solid'} onClick={handleClick}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                        }
                    />
                </Flex>
            </Stack>
        </>
    );
};

export default Login;