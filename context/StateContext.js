import product from '@/sanityecommerce/schemas/product'
import React, {useState , useContext, createContext} from 'react'
import {toast }from 'react-hot-toast'
const Context = createContext()
export const StateContext = ({children}) => {
    const [qty, setQuantity] = useState(1)
    const [cartItems , setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [showCart, setShowCart] = useState(false)

    let foundProduct;
    let index;

    const incQty = () => {
        setQuantity((prevQty) => prevQty + 1)
    }

    const deQty = () => {
        setQuantity((prevQty) => {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }


    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevTotalPrice) => 
            prevTotalPrice + product.price * quantity
        )
        setTotalQuantities((prevTotalQuantities) =>
            prevTotalQuantities + quantity
        )

        if(checkProductInCart){
            const updateCardItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updateCardItems)
        }else{
            product.quantity = quantity
            setCartItems([...cartItems, product])
        }
        toast.success(`${qty} ${product.name} added tp the cart`)
       
    }

    // const toggleCartItemQuantity = (id,value) => {
    //     foundProduct = cartItems.find((item) => item._id === id)
    //     index = cartItems.findIndex((product) => product._id === id)
    //     const newCartItems = cartItems.filter((item) => item._id != id)


    //     if(value === 'inc'){
    //         setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct?.quantity + 1}])
    //         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
    //         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    //     }else if(value === 'dec'){
    //         if(foundProduct.quantity > 1){
    //             setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct?.quantity - 1}])
    //             setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
    //             setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
    //         }
    //     }
    // }

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const index = cartItems.findIndex((product) => product._id === id);
      
      
        const newCartItems = [...cartItems];
        const updatedProduct = { ...foundProduct };
      
        if (value === 'inc') {
          updatedProduct.quantity += 1;
          newCartItems[index] = updatedProduct;
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec' && foundProduct.quantity > 1) {
          updatedProduct.quantity -= 1;
          newCartItems[index] = updatedProduct;
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
      
        setCartItems(newCartItems);
      };
      
      

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id)
        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice -  foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    }

    return( 
        <Context.Provider value={{qty, incQty, deQty, setShowCart, showCart, onAdd, setCartItems,
            totalPrice, totalQuantities, cartItems, setTotalPrice, setTotalQuantities, toggleCartItemQuantity, onRemove}}>
                {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)

