import React from 'react'

import { Product, HeroBanner, FooterBanner } from '@/components'
import { client } from '../lib/client'

function Page({products, bannerData}) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}></HeroBanner>
      {console.log(bannerData)}
      <div className='product-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many variation</p>
      </div>
      <div className='products-container'>
        {
          products.map((productItem, i) =>(
           <Product key={i} productItem={products.length && productItem}/>
          ))
        }
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () =>{
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData =  await client.fetch(bannerQuery)
  
  return{
    props : {products, bannerData}
  }
}

export default Page