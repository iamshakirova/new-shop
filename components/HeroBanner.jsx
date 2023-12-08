import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client'

function HeroBanner({heroBanner}) {
  return (
    <div className='hero-banner-container'>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img className='hero-banner-image' src={urlFor(heroBanner.image)}></img>
        <div>
          <Link href=''>
              <button type='button'>Shop now</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{heroBanner.desc} </p>
          </div>
        </div>
    </div>
  )
}

export default HeroBanner