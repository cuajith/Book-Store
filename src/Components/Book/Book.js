import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import "./Book.css"
import axios from 'axios';

const Book = (props) => {

  const history = useNavigate()

  const { _id, image, name, author, price, ratings } = props.book;
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/books/${_id}`)
      .then(res => res.data)
      .then(() => window.location.reload())
      .then(() => history('/books'));
  }

  const handleClick = () => {
    const role = JSON.parse(localStorage.getItem("auth")) || {}
    const email = role.email;
    console.log(email);
    axios({
      url: `http://localhost:5000/books/addToCart/${_id}`,
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
      {/*<h3>{name}</h3>
      <article>{author}</article>*/}
      <div className='price-rating'>
        <h4>Rs {price}</h4>
        <Stack spacing={1}>
          <Rating
            name="half-rating-read"
            defaultValue={ratings}
            precision={0.5}
            readOnly />
        </Stack>
      </div>
      
      {roleType() ?
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 30, width: 200 }}>
          <Button variant="contained" LinkComponent={Link} to={`/books/${_id}`} className="update-button">Update</Button>
          <Button variant="contained" onClick={deleteHandler} className="delete-button">Delete</Button>
        </div> : <Button variant="contained" onClick={handleClick}>Add to Cart</Button>
      }
    </div>
  );
}

export default Book