import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system'
import Checkbox from '@mui/material/Checkbox';
import { Button, FormLabel, TextField } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BookDetail = () => {
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
  console.log(id);
  const [checked, setChecked] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:5000/books/${id}`).then(res => res.data).then(data => setInputs(data.book));
    };
    fetchHandler()
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/books/${id}`, {
      image: String(inputs.image),
      name: String(inputs.name),
      author: String(inputs.author),
      price: Number(inputs.price),
      available: Boolean(checked),
      ratings: Number(inputs.ratings)
    }).then(res => res.data)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/books"))
  }
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={700}
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignContent="center"
            autoComplete="off"
            marginLeft={"auto"}
            marginRight={"auto"}
            alignSelf="center"
            marginTop={10}
          >

            <TextField
              value={inputs.image}
              onChange={handleChange}
              margin="normal"
              fullWidth
              label="Image URL"
              variant='outlined'
              name="image"
            />

            <TextField
              value={inputs.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
              label="Book Name"
              variant='outlined'
              name="name"
            />

            <TextField
              value={inputs.author}
              onChange={handleChange}
              margin="normal"
              fullWidth
              label="Author"
              variant='outlined'
              name="author"
            />

            <TextField
              value={inputs.price}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant='outlined'
              label="price"
              name='price'
              type="number"
            />

            <TextField
              value={inputs.ratings}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant='outlined'
              label="Ratings"
              name='ratings'
              type="number"
            />

            <FormControlLabel
              control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
              label="Available"
            />
            <Button variant="contained" type="submit">Update Book</Button>
          </Box>
        </form>
      )}
    </div>
  )
}

export default BookDetail