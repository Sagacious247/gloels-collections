import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import './styles.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebse'
import { toast } from 'react-toastify'


function ForgotPassword() {
  const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
       try{
          await sendPasswordResetEmail(auth, email)
          toast.success("Email was sent")
       }catch(error) {
         toast.error("Could not sent reset email")
       }
    }

    const onChange = (e) => {
      setEmail(e.target.value)
    }
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
            <input type="text"  className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}/>

            <Link className='forgotPasswordLink' to='/login'>
                Login
            </Link>

            <div className="signInBar">
                <div className="signInText">Send Reset Link</div>
                <button className="signInButton">
                 <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
                </button>
            </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
