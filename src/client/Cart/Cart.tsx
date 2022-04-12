import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import  ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone';
import React, {useState} from 'react';
import { useQuery } from 'react-query';
import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import { response } from 'express';
type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  handlePaymentCart: () => void;
};  
const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handlePaymentCart }) => {
  //Monitor the cart change
  // const [cart, setCart] = useState<CartItemType[] | null>();
  // useEffect(() => {
  //   setCart(cartItems);
  //   console.log("effect cart", cartItems)
  // },[cartItems])
  

  const dateTime: object  = new Date();

// Post the cart items data to server when checkout
  const handleSubmit = async (cartItems:any): Promise<CartItemType[] | any> =>{
    const data = {
      date: dateTime,
      total: calculateTotal(cartItems).toFixed(2),
      cartItem: cartItems
    }
    let message = "";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    if(data.cartItem.length ==0){
      
      return alert("Cart is empty");
    }else{
      await (fetch(`api/cheeses`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log("Response message", res);
        message = res.Message;
      }));
      handlePaymentCart();
      return alert(message);
    }
  }
  
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
 

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button size='small' 
      disableElevation 
      variant='contained' 
      endIcon = {<ShoppingCartTwoTone />}
      onClick={()=>{handleSubmit(cartItems)}}
      >Cart</Button>
      <br />
      <br />
      {cartItems.length === 0?<></>:
      <Button size='small' 
      disableElevation 
      variant='contained' 
      
      onClick={()=>{handlePaymentCart()}}
      >Clear Your Cart</Button>
      }
      
    </Wrapper>
  );
};

export default Cart;

