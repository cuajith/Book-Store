import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import PasswordForm from './PasswordForm'
import "./Login.css"

const ResetPassword = () => {
    const emailRef = useRef();
    const [otpForm, showForm] = useState(true)
    const sendOtp = async () => {
        try {
            let url = "http://localhost:5000/books/email-send"
            const options = {
                method: 'POST',
                url: url,
                data: { email: emailRef.current.value }
            }
            const response = await axios(options)
            const record = response.data;
            if (record.statusText == "Success") {
                toast.success("Check your Email");
                showForm(false)
            } else {
                toast.error(record.message);
            }
        } catch (e) {
            toast.error("Something went wrong!");
            console.log(e)
        }
    }
    return (
        <div className='login-container' style={{ height: "280px", marginTop: "100px", display: "flex", flexDirection: "column", marginLeft: "35%" }}>
            <div className='col-md-6'>
                <ToastContainer />

                {otpForm ? (
                    <div>
                        <div className='forget-image'>
                            <img src="./images/auth/forgot.jpg" alt="forget-password" />
                        </div>

                        <form autoComplete='off' id="otpForm" method='post' className='forget-form'>
                            <h3 className='heading' style={{ padding: "0px 20px", fontSize: "23px", marginLeft: "-71px", fontWeight: "bold" }}>Reset Password</h3><br />
                            <div className='mb-3'>
                                <label className='form-label' style={{ fontSize: "18px", marginLeft: "-54px", marginTop: "-20px" }}>Email</label>
                                <input type="email" className='form-control' name='email' ref={emailRef} autoComplete='off' style={{ marginLeft: "-52px" }} />
                            </div>
                            <div>
                                <button type="button" className='send-otp-button' onClick={sendOtp}>Send OTP</button>
                                {/*<Link to="/login"><button type="button" className='back-to-login'>Back</button></Link>*/}
                            </div>
                        </form>
                    </div>)
                    : <PasswordForm email={emailRef.current.value} />
                }
            </div>
        </div>
    )
}
export default ResetPassword