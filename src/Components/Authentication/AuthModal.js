import { AppBar, Backdrop, Box, Button, Fade, makeStyles, Modal, Tab, Tabs } from '@material-ui/core'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import Login from './Login'
import SignUp from './SignUp'
import { auth } from '../../firebse'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 450,
        backgroundColor:  theme.palette.background.paper,
        border: "1px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 3),
        color: "white",
        borderRadius: 10,
    },
    google: {
      padding: 24,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 20,
      fontSize: 20,
    },
}))

export default function AuthModal() {
    const classes = useStyles()

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }
   
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider).then(res => {
        toast.success(`Sign Up Successfull. Welcome ${res.user.email}`)
        
         handleClose()
      }).catch((error) => {
       toast.error('Bad user credential')
      })
    }

    return (
      <div>
      <Button
      variant='contained'
      style={{
         width: 85,
         height: 40,
         backgroundColor: "#008000",
         color: "white"
      }}
      onClick={handleOpen}
      >
         Login
      </Button>
      <Modal
       aria-labelledby='transition-modal-title'
       aria-describedby='transition-modal-description'
       className={classes.modal}
       open={open}
       onClose={handleClose}
       closeAfterTransition
       backgroundColor={Backdrop}
       BackdropProps={{
         timeout: 500
       }}
      >
      <Fade in={open}>
         <div className={classes.paper}>
          <AppBar 
          position='static'
          style={{ backgroundColor: "transparent", color: "white",marginBottom: 10}}
          >
           <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            style={{ borderRadius: 10}}
           >
             <Tab label="Login" style={{color: "#008000"}}/>
             <Tab  label="Sign Up" style={{color: "#008000"}}/>
           </Tabs>
          </AppBar>
 
          {value === 0 && <Login handleClose={handleClose}/>}
          {value === 1 && <SignUp handleClose={handleClose}/>}
 
          <Box
           className={classes.google}
          >
           <span>OR</span>
           <GoogleButton
            style={{
             width: "100%", outline: "none"
            }}
            onClick={signInWithGoogle}
           />
          </Box>
         </div>
      </Fade>
      </Modal>
     </div>
    )
   

}