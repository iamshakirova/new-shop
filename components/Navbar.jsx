import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '@/context/StateContext'

function Navbar() {

  const {showCart,setShowCart} = useStateContext()

  return (
    <div className='navbar-container'>
      <div className='logo'>
        <Link href='/'>
          Ash Inc
        </Link>
      </div>
      <button onClick={() => setShowCart(true)} type='button' className='cart-icon'>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>2</span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar