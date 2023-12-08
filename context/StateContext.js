import product from '@/sanityecommerce/schemas/product'
import React, {useState , useContext, createContext} from 'react'
const Context = createContext()
export const StateContext = ({children}) => {
    const [quantity, setQuantity] = useState(1)
    const [cartItems , setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [showCart, setShowCart] = useState(false)

    const incQty = () => {
        setQuantity((prevQty) => prevQty + 1)
    }

    const deQty = () => {
        setQuantity((prevQty) => {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    // const Add = (product) => {
    //     setAddToBasket((prevBasket) => {
    //       const newBasket = [...prevBasket];
    //       newBasket.push(product);
    //       console.log(newBasket)
    //       return newBasket;
    //     })
    // }

    const onAdd = (product, quant) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevTotalPrice) => 
            prevTotalPrice + product.price * quant
        )
        setTotalQuantities((prevTotalQuantities) =>
            prevTotalQuantities + quant
        )


        if(checkProductInCart){
            const updateCardItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quant + quant
                }
            })
            setCartItems(updateCardItems)
        }else{
            product.quant = quant
            setCartItems([...cartItems, product])
        }
       
    }

    // const toggleCartItemQuantity = (id,value) => {

    // }

    return( 
        <Context.Provider value={{quantity, incQty, deQty, setShowCart, showCart, onAdd, setCartItems,
        totalPrice, totalQuantities, cartItems}}>
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)

