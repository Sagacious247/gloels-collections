import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import faker from 'faker'
import { cartReducer, productReducer } from './Reducers';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebse';


const Cart = createContext();
faker.seed(99);

function Context ({children}) {
  const [user, setUser] = useState(null)

  // const [alert, setAlert] = useState({
  //   open: false,
  //   message: "",
  //   type: "success",
  // });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const products = [...Array(20)].map(() => ({
 
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }))
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: []
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  })
  return (
    <Cart.Provider value={{state, dispatch, productState, productDispatch,  user }}>
      {children}
    </Cart.Provider>
  )};

  export default Context;
  
  export const CartState = () => {
    return useContext(Cart)
  }


