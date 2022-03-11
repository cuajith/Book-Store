import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Toolbar, Typography } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./Header.css"


const Logout = () => {
    const role = JSON.parse(localStorage.getItem("auth")) || {}
    return (
        <div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-list-4">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown" style={{ display: "flex" }}>
                        <a class="nav-link" data-toggle="dropdown" href="#" id="navbarDropdownMenuLink" role="button"  aria-haspopup="true" aria-expanded="false">
                            <Avatar src="/broken-image.jpg" />
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ textAlign: "center" }}>
                            <Typography>{role.fullName}</Typography>
                            <p style={{ textAlign: "center", color: "rgb(0 0 0 / 72%)" }}> <span style={{ fontWeight: "bold", color: "rgb(0 0 0)" }}>{role.email}</span></p><hr />
                            <a class="dropdown-item" href="/mycart"><Typography>My Cart</Typography></a>
                            <a class="dropdown-item" href="/myorders"><Typography>My Orders</Typography></a>
                            <a href="/" class=" dropdown-item" onClick={() => { localStorage.clear(); window.location.reload(); }}><Typography>Sign out</Typography></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default function Header() {

    const history = useNavigate();
    const token = localStorage.getItem("auth");
    const email = localStorage.getItem("email");

    function roleType() {
        const role = JSON.parse(localStorage.getItem("auth")) || {};
        if (Object.keys(role).length) {
            console.log(role.role)
            if (role.role === "admin")
                return true;
            else
                return false;
        }
    }


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <Typography sx={{ letterSpacing: 1 }}>
                        <MenuBookIcon sx={{ mb: 1, mr: 1, ml: 3 }} /> Book Store
                    </Typography>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {(roleType()) ?
                                <li class="nav-item">
                                    <a href='/add' class="nav-link"> <Typography>Add Books</Typography> </a> 
                                </li> : null
                            } 
                            <li class="nav-item">
                                <a class="nav-link" href="/books"><Typography>Books</Typography></a>
                            </li>
                            {(!(token)) ?
                                <div className='login-register'>
                                    <li class="nav-item">
                                        <a href="/login" class="nav-link"><Typography>Login</Typography></a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/register" class="nav-link"><Typography>Sign Up</Typography></a>
                                    </li>
                                </div> :
                                <li class="nav-item">
                                    <Logout />
                                </li>
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}


{/*
const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function roleType() {
        const role = JSON.parse(localStorage.getItem("auth")) || {};
        if (Object.keys(role).length) {
            console.log(role.role)
            if (role.role === "admin")
                return true;
            else
                return false;
        }
    }

    return (

        <div>
            <AppBar sx={{ backgroundColor: "#232F3D" }} position="sticky">
                <Toolbar>
                    <Typography sx={{ letterSpacing: 1 }}>
                        <MenuBookIcon sx={{ mb: 1, mr: 1 }} /> Book Store
                    </Typography>

                    <Tabs
                        sx={{ ml: "auto" }}
                        indicatorColor="primary"
                        textColor='white'
                        value={value}
                        onChange={(e, val) => setValue(val)}
                        className="tabs"
                    >
                        {(roleType()) ?
                            <Tab LinkComponent={NavLink} to="/add" label="Add product" value="one" /> : null
                        }
                        <Tab LinkComponent={NavLink} to="/books" label="Books" value="two" />

                        {(!token) ? (
                            <div>
                                <Tab LinkComponent={NavLink} to="/register" label="Resgister" value="three" />
                                <Tab LinkComponent={NavLink} to="/login" label="Login" value="four" />
                            </div>
                        ) :
                            <Link
                                href="/"
                                underline="none"
                                onClick={() => { localStorage.clear(); window.location.reload(); }}>
                                <Stack direction="row" spacing={2} sx={{ mt: 0.5, px: 2 }}>
                                    <Avatar src="/broken-image.jpg" />
                                </Stack>
                            </Link>
                        }
                    </Tabs>

                </Toolbar>
            </AppBar>
        </div >
    )
                    */}