import { Button, FormLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AddBook = () => {

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    image: '',
    name: '',
    author: '',
    price: '',
    available: false,
    ratings:''
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/books/addbook", {
      image: String(inputs.image),
      name: String(inputs.name),
      author: String(inputs.author),
      price: Number(inputs.price),
      available: Boolean(checked),
      ratings: Number(inputs.ratings)
    }).then((res) => res.data);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    sendRequest().then(() => history('/books'));
  }

  return (
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
          
          label="Image URL"
          variant='outlined'
          name="image"
        />

        <TextField
          value={inputs.name}
          onChange={handleChange}
          
          label="Book Name"
          variant='outlined'
          name="name"
        />

        <TextField
          value={inputs.author}
          onChange={handleChange}
          
          label="Author"
          variant='outlined'
          name="author"
        />

        <TextField
          value={inputs.price}
          onChange={handleChange}
          margin="normal"
         
          label="price"
          name='price'
          type="number"
        />

        <TextField
          value={inputs.ratings}
          onChange={handleChange}
         
          variant='outlined'
          label="Ratings"
          name='ratings'
          type="number"
        />

        <FormControlLabel
          control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
          label="Available"
        />
        <Button variant="contained" type="submit">Add Book</Button>
      </Box>
    </form>
  )
}

export default AddBook