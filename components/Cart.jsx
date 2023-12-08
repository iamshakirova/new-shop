import React from 'react'
import {AiOutlineMinus,AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'

function Cart() {

  const {showCart, setShowCart, cartItems} = useStateContext();
  {console.log(cartItems)}

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>3</span>
        </button>
        <div className='product-container'>
          {cartItems.length>=1 && cartItems.map((item) => (
            <div key={item?._id} className='product'>
              <img className='cart-product-image' src={urlFor(item?.image[0])}></img>
              <div className='item-desc'>
                <div className='flex top' >
                  <h4>{item?.name}</h4>
                  <h5>${item?.price}</h5>
                </div>
                <div className='flex bottom'>
                  <p className='quantity-desc'>
                      <span className='minus'><AiOutlineMinus/></span>
                      <span className='num'>{item?.quantity}</span>
                      <span className='plus'><AiOutlinePlus/></span>
                  </p>
                  <button className='remove-item'> 
                    <TiDeleteOutline/>
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cart