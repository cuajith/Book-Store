import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import "./PasswordForm.css"

const PasswordForm = (props) => {

    const [inputField, setInputField] = useState({
        otpCode: "",
        password: "",
        cpassword: "",
    })
    const history = useNavigate()
    const [errField, setErrField] = useState({
        otpCodeErr: "",
        passwordErr: "",
        cpasswordErr: "",
    })
    const validForm = () => {
        const formIsValid = true;
        setErrField({
            otpCodeErr: "",
            passwordErr: "",
            cpasswordErr: "",
        })
        if (inputField.otpCode == "") {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, otpCodeErr: "Please Enter Email"
            }))
        }
        if (inputField.password == "") {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, passwordErr: "Please Enter Password"
            }))
        }
        if (inputField.cpassword == "") {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, cpasswordErr: "Please Enter confirm Password"
            }))
        }
        if (inputField.cpassword != "" && inputField.password != inputField.cpassword) {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, cpasswordErr: "Passwords and confirm password must be same"
            }))
        }
        return formIsValid
    }
    const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const submitButton = async () => {
        if (validForm()) {
            Object.assign(inputField, props)
            let url = "http://localhost:5000/books/change-password"
            let options = {
                method: "POST",
                url: url,
                data: inputField
            }
            try {
                const response = await axios(options)
                if (response.data.statusText == 'Success') {
                    toast.success(response.data.message);
                    history('/login')
                } else {
                    toast.error(response.data.message);
                }
            } catch (e) {
                toast.error("Something went wrong");
            }
        } else {
            toast.error("Form Invalid!")
        }
    }
    const changePassword = async () => {
        history.push('/reset-password')
    }
    return (
        <div className="wrapper">
            <div className='reset-image'>
                <img src="./images/auth/reset-password.png" alt="forget-password" />
            </div>
            <div className='password-fields'>
                <form autoComplete='off' action="" method="post">
                    <h4 className='heading'>Reset Your Password</h4>

                    <div>
                        <label className='form-label'>Otp Code</label>
                        <input type="email" className="form-control" name="otpCode" maxLength="4"
                            autocomplete="off" value={inputField.otpCode} onChange={inputHandler} />
                        {
                            errField.otpCodeErr.length > 0 && <span className='error'>{errField.otpCodeErr}</span>
                        }
                    </div>
                    <div>
                        <label className='form-label'>Create New Password</label>
                        <input type="password" className='form-control' name="password"
                            autoComplete='off' value={inputField.password} onChange={inputHandler} />
                        {
                            errField.passwordErr.length > 0 && <span className='error'>{errField.passwordErr}</span>
                        }
                    </div>
                    <div>
                        <label className='form-label'>Confirm Password</label>
                        <input type="password" className='form-control' name="cpassword"
                            autoComplete='off' value={inputField.cpassword} onChange={inputHandler} />
                        {
                            errField.cpasswordErr.length > 0 && <span className='error'>{errField.cpasswordErr}</span>
                        }
                    </div>
                    <div>
                        <button type="button" className='change-password-button' onClick={submitButton}>Change Password</button>&nbsp;

                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}
export default PasswordForm