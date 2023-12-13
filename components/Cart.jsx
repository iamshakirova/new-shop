import React, {useRef} from 'react'
import {AiOutlineMinus,AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import getStripe from '@/lib/getStripe'


function Cart() {

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cartItems}),
      });

      if(!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        
        return;
      }
      
      const data = await response.json();
      console.log(data)

      toast.loading('Redirecting...');

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Error during checkout: ', error)
    }
  }

  const {showCart, setShowCart, cartItems, totalPrice,totalQuantities, toggleCartItemQuantity, onRemove} = useStateContext();
  {console.log(cartItems)}

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='current-cart-item'>({totalQuantities})</span>
        </button>
        {
        cartItems.length < 1 && (
          <div className='empty-card'>
            <AiOutlineShopping size={100}/>
            <h3>The card is empty</h3>
            <Link href='/'>
              <button className='btn' onClick={() => setShowCart(false)}>
                Continue shopping
              </button>
            </Link>
          </div>
          )
        }
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
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus/></span>
                      <span className='num'>{item?.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus/></span>
                  </p>
                  <button className='remove-item' onClick={() => onRemove(item)}> 
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div>
              <h5 className='total-price'>Total price: ${totalPrice}</h5>
              <h5 className='total-price'>Total items: {totalQuantities}</h5>
              <div className='btn-container'>
              <button type="button" className='btn' onClick={handleCheckout}>Pay with Stripe</button>
              </div>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart