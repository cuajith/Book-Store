import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import "./App.css"

const Login = (props) => {

  const history = useNavigate();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',

    },
    validationSchema: yup.object({

      email: yup.string()
        .email('Enter valid Email Address')
        .strict()
        .trim()
        .required("This field is required"),
      password: yup.string()
        .strict()
        .trim()
        .required("This field is required"),

    }),
    onSubmit: (data) => {
      console.log(data)
      axios.post('http://localhost:5000/books/login', data)

        .then(res => {
          toast.success("You are Logged In!");
          localStorage.setItem('auth', JSON.stringify(res.data));
          history('/books')

        })
        .catch(err => {
          toast.error("Login Failed");
        })
    }
  });
  const changePassword = () => {
    history('/reset-password')
  }
  console.log('Visited fields', formik.touched)
  return (
    <div className='login'>
      <div className="login-img">
        <img src="./images/auth/login.jpg" alt="login-logo" />
      </div>

      <div className='login-form'>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <Box
            width={380}
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignContent="center"
            autoComplete="off"
            marginLeft={"auto"}
            marginRight={"auto"}
            alignSelf="center"
            marginTop={4}
            component="TextField"
          >
            <Typography variant="p" component="h5">
              Sign In
            </Typography>
            <Typography sx={{ mt: 1 }} variant="p" component="p">
              Please sign in to continue
            </Typography>

            <TextField
              type="text"
              margin="normal"
              id="outlined-basic"
              
              label="FullName"
              variant='standard'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {
              formik.touched.email && formik.errors.email ?
                <div className='text-danger'>{formik.errors.email}</div>
                : null
            }

            <FormControl sx={{ mt: 2 }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <Input
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                name='password'
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {
              formik.touched.password && formik.errors.password ?
                <div className='text-danger'>{formik.errors.password}</div>
                : null
            }

            <Button sx={{ mt: 4 }} variant="contained" type="submit">Sign In</Button>

            <span className="forget" style={{textAlign:"center",marginTop:"20px"}} onClick={changePassword}>Forget Password?</span>
            
            <a href="#"
              onClick={() => { window.location.href = 'register'; }} className="login-register-link mt-3"><span className='account'>Don't have an account?</span>Sign Up</a>
        </Box>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login