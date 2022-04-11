import React, {useState, useEffect} from 'react';
import { Wrapper } from './HistoryItem.styles';
import Button from '@material-ui/core/Button';
import { HistoryPurchaseType } from '../../App';
import ListItem from '@material-ui/core/ListItem';
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
import HistoryDialog from './HistoryDialog';
import {CartItemType} from '../../App';
//Props
type Props = {
    historyItems: HistoryPurchaseType[];
  };  
const HistoryItem: React.FC<Props> = (props) => {
    const [data,setData] = useState<any[]>([]);
    // const data = props.historyItems;
    useEffect(() => {
        setData(props.historyItems)
    }, [props.historyItems])
    console.log("History Items", data)
    return(
        <Wrapper>
            <h2>Your Shopping History</h2>
            {data.length == 0 ? <p>No Records are found</p> : null}
            {data?.map(item => (
            <ListItem key={item.id}>
                <HistoryDialog item = {item} />
            </ListItem>
            ))}
        </Wrapper>
    );
}

export default HistoryItem;

