import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Components/Header';
import Cart from './Components/Cart'
import Home from './Components/Home'
import Checkout from './Components/Checkout';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import ForgotPassword from './Components/ForgotPassword'


function App() {
  return (
    <>
    <BrowserRouter>
     <Header/>
     <div>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
     </div>
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App;
