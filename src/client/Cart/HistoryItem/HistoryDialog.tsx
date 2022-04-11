import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { HistoryPurchaseType } from '../../App';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import DialogContentText from '@material-ui/core/DialogContentText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Wrapper } from './HistoryItem.styles';

type Props = {
    item: HistoryPurchaseType[]
}

const HistoryDialog: React.FC<Props> = props => {
    // const [data,setData] = useState<any>([]);
    // useEffect(() => {
    //     setData(props.item)
    // }, [props.item])
    const data:any = props.item;
    console.log("Dialog", data)
    //Dialog setting
    const [open, setOpen] = useState(false);
    // const [fullScreen, setFullScreen] = useState(true);
    interface DialogTitleProps {
        id: string;
        children?: React.ReactNode;
        onClose: () => void;
    }
      const BootstrapDialogTitle = (props: DialogTitleProps) => {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
              >
              </IconButton>
            ) : null}
          </DialogTitle>
        );
      };

    // const handleFullScreenClose = () => {
    //     setFullScreen(false)
    // }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //Dialog Setting ends

    return(
        <Wrapper>
            <Button variant="outlined" onClick={handleClickOpen}>
                    Order {data.date}
                </Button>
                <Dialog
                    fullWidth = {true}
                    // fullScreen = {false}
                    maxWidth = "xl"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Order ${data.date}`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="left">Unit Price</TableCell>
                            <TableCell align="left">Purchase Amount</TableCell>
                            <TableCell align="left">Image</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.cartItem.map((row:any) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell size="small">{row.description}</TableCell>
                                    <TableCell>${row.price}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell><Button href= {row.image} target="_blank">Click To Check</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h2>Total Price: ${data.total}</h2>
                    <Button onClick={handleClose}>Back To List</Button>
                    <DialogActions >
                        
                    </DialogActions>
                    
                    </DialogContentText>
                    </DialogContent>
                    
                </Dialog>
        </Wrapper>
    );
}

export default HistoryDialog;

