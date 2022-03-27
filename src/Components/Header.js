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
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import { createTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Header.css"
import axios from 'axios';

const Logout = () => {
    const role = localStorage.getItem("auth") || {};
    return (
        <div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-list-4">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown" style={{ display: "flex" }}>
                        <a class="nav-link" data-toggle="dropdown" href="#" id="navbarDropdownMenuLink" role="button" aria-haspopup="true" aria-expanded="false">
                            <Avatar src="/broken-image.jpg" />
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ textAlign: "center" }}>
                            <Typography>{role.fullName}</Typography>
                            <p style={{ textAlign: "center", color: "rgb(0 0 0 / 72%)" }}> <span style={{ fontWeight: "bold", color: "rgb(0 0 0)" }}>{role.email}</span></p><hr />
                            <a class="dropdown-item" href="/mycart">
                                <div className='shopping-cart'><ShoppingCartIcon /><Typography>My Cart</Typography></div>
                            </a>
                            <a class="dropdown-item" href="/myorders">
                                <div className='shopping-cart'><LocalMallIcon/><Typography>My Orders</Typography></div>
                            </a>
                            <a href="/" class=" dropdown-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                                <div className='shopping-cart'><LogoutIcon/><Typography>Sign out</Typography></div>
                            </a>
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
    const [value, setValue] = useState(' ');

    function roleType() {
        const role = localStorage.getItem("auth") || {};
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


