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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default function OrderedBooks() {

  const [data, setData] = useState('');

  const role = JSON.parse(localStorage.getItem("auth")) || {}
  const email = role.email;
  console.log(email)
  const token = role.token;
  const [show, setShow] = useState(0);

  const getOrderData = () => {
    axios(
      {
        url: 'http://localhost:5000/books/myOrders',
        method: 'POST',
        data: { email },
        headers: { 'x-auth-token': token }
      }).then(response => setData(response.data.orders));

    setTimeout(() => {
      setShow(1)
    }, 3000);
  };

  useEffect(getOrderData, [email, token]);

  return (<div><div className='heading'><Typography variant="h4" className='myCart-text'>My Orders</Typography></div>
    <div className='mycart'>
      {((!data) || !(data.length)) ? (show) ?
        <div className='emptycart'>
          <img src="./images/banner/no order.jpg" alt="Empty Cart" />
          <Typography sx={{ my: 30, mx: 10 }} variant="h5" className="no-order">No Orders !</Typography>
        </div> : ''
        : data.map((data, i) => { return <div className='cartbook' key={i}> <CartBooks data={data} getOrderData={getOrderData} visibility={false} /></div>; })}
    </div>
  </div>);
}

function CartBooks({ data, getOrderData }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let history = useNavigate();
  const role = JSON.parse(localStorage.getItem("auth")) || {}
  const email = role.email;
  const token = role.token;
  const { name, author, image, price, ratings, _id } = data;

  const DeleteOrderBook = (_id, email) => {
    console.log(_id)
    axios(
      {
        url: `http://localhost:5000/books/deleteOrders/${_id}`,
        method: 'DELETE',
        data: { _id, email },
        headers: { 'x-auth-token': token }
      }).then(response => response.data).then(toast.success("Order Cancelled!"))
      .catch(error => toast.error("Try Again"))
      .then(() => setTimeout(() => getOrderData(), 1000));
      handleClose()
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

          <Button onClick={handleOpen} color='error' variant='outlined'>Cancel Order</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to cancel this order ?
              </Typography>
              <Button onClick={() => DeleteOrderBook(_id, email)} sx={{ mt: 4, ml: 9, width: 120 }} color='error' variant='contained'>Yes</Button>
              <Button onClick={handleClose} sx={{ mt: 4, ml: 4, width: 120 }} color='error' variant='outlined'>No</Button>
            </Box>
          </Modal>
        </CardContent>
      </div>

      <ToastContainer />
    </div>
  )
}