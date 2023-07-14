import React, { useState } from 'react'
import { CartState } from '../context/Context'
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './styles.css'
import { AiOutlineLoading } from 'react-icons/ai';

function Home() {
  const [loading, setLoading] = useState(false)

  const {state: { products },
  productState: {byStock, byFastDelivery, sort, byRating, SearchQuery}, } = CartState();
  
  const transformProducts = () => {
    let sortedProducts = products;

    if( sort) {
      sortedProducts = sortedProducts.sort((a,b) => (
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      ))
    }
    if(!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }
    if(byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if(byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }

    if(SearchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(SearchQuery))
    }
    return sortedProducts;
  }

  return (
    <div className='home'>
      <Filters/>
      <div className='productContainer'>
      {transformProducts().map((prod) => {
              return <SingleProduct prod={prod} key={prod.id}/>
             })}
      </div>
    </div>
  )
}

export default Home
