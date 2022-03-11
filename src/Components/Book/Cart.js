import React, { useState, useEffect, forwardRef } from 'react'
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'

export default function Cart(props) {
  
  const [data, setData] = useState('');
  
  const role = JSON.parse(localStorage.getItem("auth")) || {}
  const email = role.email;
  console.log(email)
  const _id = role._id;
  console.log(_id)
  const token = role.token;
  const [show, setShow] = useState(0);

  const getCartData = () => {
    axios(
      {
        url: `http://localhost:5000/books/showCart/${_id}`,
        method: 'GET',
        data: { email },
        
      }).then(response => console.log(response));
  
    setTimeout(() => {
      setShow(1)
    }, 3000);

  };
  useEffect(getCartData, email);

  return (<div><div className='heading'><Typography variant="h4" align='left' component="div">My Cart</Typography></div>
    {(show === 0) && <CircularProgress id='cartprogress' color='success'></CircularProgress>}
    <div className='mycart'>
      {((!data) || !(data.length)) ? (show) ? <div className='emptycart'><Typography>Your Cart is Empty</Typography> </div> : ''
        : data.map((data, i) => { return <div className='cartbook' key={i}> <CartBooks data={data} getCartData={getCartData} visibility={false} /></div>; })}
    </div>
  </div>);

}

function CartBooks({ data, getCartData }) {
  let history = useNavigate();
  const role = JSON.parse(localStorage.getItem("auth")) || {}
  const email = role.email;
  const token = role.token;
  const { name, author, image, price, _id } = data;

  const [Message, setMessage] = useState('');
  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const DeleteCartBook = (_id) => {
    axios(
      {
        url: `http://localhost:5000/books/deleteCart/${_id}`,
        method: 'DELETE',
        data: { email },
        headers: { 'x-auth-token': token }
      }).then(response => response.data).then(data => setMessage({ msg: data.Msg, result: 'success' }))
      .catch(error => setMessage({ msg: error.response.data.Msg, result: 'error' })).then(handleClick)
      .then(() => setTimeout(() => getCartData(), 500));
  };
  return (
    <div>
      <Card sx={{ maxWidth: 800 }} className='CartBook'>
        <div className='cartcontainer'>

          <div className='thumbnailContainer'>
            <img src={image} className='bookThumbnail' alt='bookThumbnail' />
          </div>
          <CardContent className='bookContent'>

            <Typography gutterBottom variant="h6" component="div">
              <b className='bookName'>{name}</b>
              <IconButton onClick={() => history.push(`/bookinfo/${_id}`)}><InfoIcon /></IconButton>
            </Typography>

            <Typography color="text.primary" variant="subtitle2">
              <p className='detail'>Author : {author}</p></Typography>
            <Rating name="half-rating-read" className='detail' defaultValue={+Rating} precision={0.5} readOnly />
            <Typography color="text.primary" variant="h6"><p className='detail'>Price : Rs.{price}</p></Typography>


            <Button onClick={() => DeleteCartBook(_id)} color='error' variant='outlined' style={{ marginRight: '0.75rem' }}>Remove Item</Button>
            <Button onClick={() => history.push(`/orderbook/${_id}`)} color='warning' variant='contained'>Place Order</Button>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}