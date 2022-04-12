import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogTable from './DialogTableComponent';

// Types
import { CartItemType } from '../../App';

const DialogComponent: React.FC<Props> = props => {
  const [open, setOpen] = useState(false);
  // console.log("Props", props)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleClickOpen}>
       Product Detail
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Product Information - ${props.item.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <DialogTable item = {props.item}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogComponent;

interface Props {
  item: CartItemType;
}