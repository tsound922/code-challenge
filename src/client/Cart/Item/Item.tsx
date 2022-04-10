//Material UI components
import Button from '@material-ui/core/Button';
//Material UI ends
import React, {useState, createContext} from 'react';

//DialogComponent
import Dialog, {} from '../MUIComponents/DialogComponent';

// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

//Original code

// type Props = {
//   item: CartItemType;
//   handleAddToCart: (clickedItem: CartItemType) => void;
// };

// const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  
//   <Wrapper>
//     <img src={item.image} alt={item.title} />
//     <div>
//       <h3>{item.title}</h3>
//       <h3>${item.price}</h3>
//     </div>
    
//     <Button
//       onClick={() => handleAddToCart(item)}
//       data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
     
//   </Wrapper>
// );
// export default Item;
//Original code ends

//Rewrite

const Item: React.FC<Props> = props => { 
  return(
  <Wrapper>
    <img src={props.item.image} alt={props.item.title}/>
    <div>
      <h3>{props.item.title}</h3>
      <h3>${props.item.price}</h3>
    </div>
    
    <Button
      onClick={() => props.handleAddToCart(props.item) }
      data-cy={`add-to-cart-${props.item.id}`}>Add to cart</Button>
    <Dialog item = {props.item} />
  </Wrapper>
  
  )
}

export default Item;

interface Props{
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}
//rewrite ends