import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile} from "@firebase/auth"
import { auth, db } from '../../firebse'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

function SignUp({handleClose}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Password do not match")
      return; 
    }

    try{
      const result = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password)
       
        const user = result.user

        updateProfile(auth.currentUser, {
          email
        })

        await setDoc(doc(db, 'users', user.uid), {
          email,
          timestamp: serverTimestamp()
        })
       toast.success(`Sign Up Successful. Welcome ${result.user.email}`)

      navigate("/")
      
      handleClose()
    } catch (error) {
      toast.error('Could not sign up')
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
    <TextField
     variant='outlined'
     label="Confirm Password"
     type="password"
     value={confirmPassword}
     onChange={(e) => setConfirmPassword(e.target.value)}
    />

    <Button
     variant="contained"
     size="large"
     style={{
      backgroundColor: "#008000",
      color: "white"
    }}
    onClick={handleSubmit}
    >
      Sign Up
    </Button>
    <Link to="/login" style={{textAlign: "center",
  backgroundColor: "#008000",
  color: "white",
  padding: 10}}>
      Login Instead
    </Link>
    </Box>
  )
}

export default SignUp