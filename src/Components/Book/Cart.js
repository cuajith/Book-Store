import { useState, useEffect, forwardRef } from 'react'
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios'
import "./Cart.css"
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {

  const [data, setData] = useState('');

  const role = JSON.parse(localStorage.getItem("auth")) || {}
  const email = role.email;
  console.log(email)
  const token = role.token;
  const [show, setShow] = useState(0);

  const getCartData = () => {
    axios(
      {
        url: 'http://localhost:5000/books/showCart',
        method: 'POST',
        data: { email },
        headers: { 'x-auth-token': token }
      }).then(response => setData(response.data.cart));

    setTimeout(() => {
      setShow(1)
    }, 3000);
  };

  useEffect(getCartData, [email, token]);

  return (<div><div className='heading'><Typography variant="h4" className='myCart-text'>My Cart</Typography></div>
    <div className='mycart'>
      {((!data) || !(data.length)) ? (show) ?
        <div className='emptycart'>
          <img src="./images/banner/empty cart.jpg" alt="Empty Cart" />
          <span className='cart-para'>
            <Typography sx={{ mt: 25, mx: 10 }} variant="h4">Your cart is empty</Typography>
            <Typography sx={{ mt: 2, mx: 19 }}>Add items to it now</Typography>
            <Button sx={{ mt: 3, ml: 16 }} component={Link} to='/books' variant="contained" classname="cartempty">Continue Shopping</Button>
          </span>
        </div> : ''
        : data.map((data, i) => { return <div className='cartbook' key={i}> <CartBooks data={data} getCartData={getCartData} visibility={false} /></div>; })}
    </div>
  </div>);
}

function CartBooks({ data, getCartData }) {

  let history = useNavigate();
  const role = JSON.parse(localStorage.getItem("auth")) || {}
  const email = role.email;
  const token = role.token;
  const { name, author, image, price, ratings, _id } = data;

  const handleClick = () => {
    const role = JSON.parse(localStorage.getItem("auth")) || {}
    const email = role.email;
    console.log(email);
    axios({
      url: `http://localhost:5000/books/OrderedBooks/${_id}`,
      method: 'POST',
      data: { email }
    })
      .then(res => {
        console.log(res);
      });
  }


  const DeleteCartBook = (_id, email) => {
    console.log(_id)
    axios(
      {
        url: `http://localhost:5000/books/deleteCart/${_id}`,
        method: 'DELETE',
        data: { _id, email },
        headers: { 'x-auth-token': token }
      }).then(response => response.data).then(toast.success("Product Deleted!"))
      .catch(error => toast.error("Try Again"))
      .then(() => setTimeout(() => getCartData(), 1000));
  };
  return (
    <div>
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
          <Rating name="half-rating-read" className='detail' defaultValue={ratings} precision={0.5} readOnly />
          <Typography color="text.primary" variant="h6"><p className='detail'>Price : Rs.{price}</p></Typography>

          <Button onClick={() => DeleteCartBook(_id, email)} color='error' variant='outlined' style={{ marginRight: '0.75rem' }}>Remove Item</Button>
          <Button onClick={handleClick} color='warning' variant='contained'>Place Order</Button>
        </CardContent>
      </div>
    <ToastContainer />
    </div>
  )
}