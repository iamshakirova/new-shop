import React , { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { client, urlFor } from '@/lib/client'
import { useStateContext } from '@/context/StateContext'
import { Product } from '@/components'


const ProductDetails = ({product, products}) => {
    const {image, details, name, price} = product;
    const {deQty, incQty, quantity, onAdd} = useStateContext()

    console.log(products)

    return(
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[0])} className='product-detail-image'/>
                        <div className='small-images-container'>
                            {
                                image?.map((item, i) => (
                                    <img className='small-image' key={i} src={urlFor(item)}></img>
                                ))
                            }
                        </div>
                    </div>
                </div> 
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>(20)</p>
                    </div>
                   <h4>Details:</h4>
                   <p>{details}</p>
                   <p className='price'>${price}</p>
                   <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span onClick={deQty} className='minus'><AiOutlineMinus/></span>
                            <span className='num'>{quantity}</span>
                            <span onClick={incQty} className='plus'><AiOutlinePlus/></span>
                        </p>
                   </div>
                   <div className='buttons'>
                        <button type='button' onClick={() => onAdd(product, quantity)} className='add-to-cart'>Add to cart</button>
                        <button type='button' className='buy-now'>Buy now</button>
                   </div>
                </div>
            </div>
            {/* <div className='product-heading'>
                <h2>You may also like:</h2>
                <div className='products-container'>
                    {products.map((productItem, i) => (
                        <Product key={i} productItem={productItem} />
                    ))}
                </div>
            </div> */}
            <div className='maylike-products-wrapper'>
                <h2>You may also like:</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((productItem, i) => (
                            <Product key={i} productItem={productItem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getStaticPaths = (async () => {
    const query = `*[_type == 'product'] {
        slug{
            current
        }
    }`;

    const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))
    return{
        paths,
        fallback:'blocking'
    }

  }) 


export const getStaticProps = async({params:{slug}}) => {
    const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
    const product = await client.fetch(query)

    const prodQuery = `*[_type == 'product']`
    const products = await client.fetch(prodQuery)

    return{
        props: {product, products}
    }
}

export default ProductDetails