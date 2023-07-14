import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebse'
import { Button } from 'react-bootstrap'

function SignOut() {
  return (
    <div classNaname="signOut">
      <Button
     variant="contained"
     size="large"
     style={{
      backgroundColor: "#008000",
      color: "white"    
    }}
    onClick={() => signOut(auth)}
    >
      SIGNOUT
    </Button>
    </div>
  )
}

export default SignOut
