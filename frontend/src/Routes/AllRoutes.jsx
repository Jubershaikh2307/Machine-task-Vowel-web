import React from 'react';

import { Route, Routes } from 'react-router-dom';
import AddProduct from '../Pages/AddProduct';
import Admin from '../Pages/Admin';
import Cart from '../Pages/Cart';
import CheckOut from '../Pages/CheckOut';
import Landingpage from '../Pages/Landingpage';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Landingpage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/checkout' element={<CheckOut/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/addproduct' element={<AddProduct/>}></Route>
        </Routes>
    );
};

export default AllRoutes;