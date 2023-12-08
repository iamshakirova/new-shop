import React from 'react'
import Link from 'next/link'
import { AiFillInstagram , AiOutlineTwitter} from 'react-icons/ai'

function Footer() {
  return (
    <div className='footer-container'>
      <p>2023 Super Headphones. All rights reserved.</p>
      <div className='icons'>
        <Link href='/'>
          <AiFillInstagram/>
        </Link>
        <Link href='/'>
          <AiOutlineTwitter/>
        </Link>
      </div>
    </div>
  )
}

export default Footer