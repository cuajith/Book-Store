import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import "./Book.css"
import axios from 'axios';
import Cart from './Cart';

const Book = (props) => {

  const history = useNavigate()
 
  const { _id, image, name, author, price, ratings } = props.book;
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/books/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history('/books'));
  }

  const handleClick = () => {
    const role = JSON.parse(localStorage.getItem("auth")) || {}
   const email = role.email;
   console.log(email);
    axios({
      url:`http://localhost:5000/books/addToCart/${_id}`,
      method: 'POST',
      data: { email }
    })
    .then(res => {
      console.log(res);
    });
  }

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
    <div className='card'>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <article>{author}</article>
      <h3>Rs {price}</h3>

      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          defaultValue={ratings}
          precision={0.5}
          readOnly />
      </Stack>

      <Button  variant="outlined" onClick={handleClick}>Add to Cart</Button>
      {roleType() &&
        <div>
          <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: 'auto' }}>Update</Button>
          <Button onClick={deleteHandler} sx={{ mt: 'auto' }}>Delete</Button>
        </div>
      }
    </div>
  );
}

export default Book