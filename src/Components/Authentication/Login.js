import { Box, Button, TextField } from '@material-ui/core'
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../firebse'

function Login({handleClose}) {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async () => {
     if( !email || !password) {
      toast.error("Please fill all the fields")
      
     }
   try{
    const result = await signInWithEmailAndPassword(
      auth, 
      email, 
      password)
      
      const user = result.user

      toast.success(`Login Successful. Welcome ${result.user.email}`)
      
      navigate("/")

    handleClose()

   } catch(error) {
    toast.error("Bad user's credential")
   }

  }

  return (
    <Box
     p={3}
     style={{ display: "flex", flexDirection: "column",
    gap: "20px"}}
    >
    <TextField
     variant="outlined"
     type="email"
     label="Enter Email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     fullWidth
    />
    <TextField
     variant='outlined'
     label="Enter Password"
     type="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />

    <Link to="/forgot-password" className='forgotPasswordLink' style={{color: "#00cc66"}}>
    Forgot Password
    </Link>

    <Button
     variant="contained"
     size="large"
     style={{
      backgroundColor: "#008000",
      color: "white"
    }}
    onClick={handleSubmit}
    >
      Login
    </Button>
    <Link to="/signup" style={{textAlign: "center",
   backgroundColor: "#008000",
   color: "white",
   padding: 10}}>
      Sign Up Instead
    </Link>
    </Box>
  )
}

export default Login
