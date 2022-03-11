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

const Registration = (props) => {

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
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: yup.object(
      {
        fullName: yup.string()
          .required("This field is required")
          .strict()
          .trim()
          .min(5, "Minimum 5 characters required")
          .max(15, "Maximum 15 characters only"),

        userName: yup.string()
          .required("This field is required")
          .min(5, "Minimum 5 characters required"),

        email: yup.string()
          .email('Enter valid Email Address')
          .strict()
          .trim()
          .required("This field is required"),

        password: yup.string()
          .strict()
          .trim()
          .required("This field is required"),

        confirmPassword: yup.string()
          .oneOf([yup.ref('password'), null], "Password and Confirm Password must be same")
          .required("This field is required")

      }),
    onSubmit: (data) => {
      console.log(data)
      axios.post('http://localhost:5000/books/register', data)
        .then((res) => {

          history('/login')
          localStorage.setItem("auth", data.userToken);
          localStorage.setItem("role",data.role);
          localStorage.setItem("fullName",data.fullName);
          localStorage.setItem("email",data.email)
        })
        .catch(err => {
          toast.error(err.response.data);
        })
    }
  });

  console.log('Visited fields', formik.touched)
  return (

    <div className='registration'>
      <div className="registration-img">
        <img src="./images/auth/register.png" alt="registration-logo" />
      </div>

      <div className='registration-form'>
        <form  method="GET" autoComplete='off' onSubmit={formik.handleSubmit}>

          <Box
            width={500}
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
            <Typography variant="p" component="h4">
              Create Account
            </Typography>

            <TextField
              
              name='fullName'
              margin="normal"
              
              fullWidth
              label="FullName"
              variant='outlined'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {
              formik.touched.fullName && formik.errors.fullName ?
                <div className='text-danger'>{formik.errors.fullName}</div>
                : null
            }


            <TextField
              
              margin="normal"
              fullWidth
              label="UserName"
              variant='outlined'
              
              name='userName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {
              formik.touched.userName && formik.errors.userName ?
                <div className='text-danger'>{formik.errors.userName}</div>
                : null
            }



            <TextField
              
              margin="normal"
              fullWidth
              label="Email"
              variant='outlined'
              
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

            <FormControl sx={{ mt: 2 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
               
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

            <FormControl sx={{ mt: 2 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">ConfirmPassword</InputLabel>
              <OutlinedInput
                
                type={values.showPassword ? 'text' : 'password'}
                name='confirmPassword'
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
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
                label="Confirm Password"
              />
            </FormControl>

            {
              formik.touched.confirmPassword && formik.errors.confirmPassword ?
                <div className='text-danger'>{formik.errors.confirmPassword}</div>
                : null
            }

            <Button sx={{ mt: 2 }} variant="contained" type="submit">submit</Button>
            <a href="#"
              onClick={() => { window.location.href = 'login'; }} className="login-register-link"> <span className='account'>Already have an account?</span>  Login</a>
          </Box>
        </form>
      </div>


      <ToastContainer />
    </div >
  )
}

export default Registration