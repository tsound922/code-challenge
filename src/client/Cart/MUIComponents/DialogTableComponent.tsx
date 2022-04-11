import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Types
import { CartItemType } from '../../App';
import { Button } from '@material-ui/core';

const DialogTableComponent: React.FC<Props> = props => {

console.log("Props gonna use", props)
    return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Category</TableCell>
            <TableCell >Product Description</TableCell>
            <TableCell >Product Price</TableCell>
            <TableCell >Product Image </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={props.item.id}>
                <TableCell component="th" scope="row">
                    {props.item.category}
                </TableCell>
                <TableCell >{props.item.description}</TableCell>
                <TableCell >${props.item.price}</TableCell>
                <TableCell ><Button href = {props.item.image} target="_blank" >Click Here</Button></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default DialogTableComponent;

interface Props{
    item: CartItemType;
}