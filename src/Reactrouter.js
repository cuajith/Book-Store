import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import AddBook from "./Components/AddBook"
import Books from "./Components/Book/Books"
import React from 'react';
import BookDetail from "./Components/Book/BookDetail";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";
import PrivateRoute from "./Auth/PrivateRoute";
import Cart from './Components/Book/Cart';
import OrderedBooks from './Components/Book/OrderedBooks'
import Arrivals from "./Components/Book/Arrivals";

const Reactrouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Books />} />
            <Route exact path="/add" element={<AddBook />} />
            <Route exact path="/books/:id" element={<BookDetail />}/>
            <Route exact path='/register' element={<Registration />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/reset-password' element={<ResetPassword />} />
            <Route exact path='/books' element={<Books />} />
            <Route exact path='/arrivals' element={<Arrivals />} />
            <Route exact path='/mycart' element={<Cart />} />
            <Route exact path='/myorders' element={<OrderedBooks />} />
        </Routes>
    )
}
export default Reactrouter