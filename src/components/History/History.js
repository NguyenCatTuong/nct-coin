import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import moment from 'moment';
import './History.css'
import { STATIC } from "../../constants/static";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FDEEDC',
        color: theme.palette.common.black,
        fontWeight: theme.palette.common.bold,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function showHistory(history) {
    var items = [];
    for (let i = history.length - 1; i >= 0; i--) {
        items.push(
            <StyledTableRow key={history[i].id + 'system'}>
                <StyledTableCell component="th" scope="row">
                    {'System'}
                </StyledTableCell>
                <StyledTableCell align="right">{history[i].miner}</StyledTableCell>
                <StyledTableCell align="right">{STATIC.AWARD_COIN}</StyledTableCell>
                <StyledTableCell align="right">Award for miner</StyledTableCell>
                <StyledTableCell align="right">{moment(history[i].id).format('LLLL')}</StyledTableCell>
            </StyledTableRow>
        );
        items.push(
            <StyledTableRow key={history[i].id}>
                <StyledTableCell component="th" scope="row">
                    {history[i].from}
                </StyledTableCell>
                <StyledTableCell align="right">{history[i].to}</StyledTableCell>
                <StyledTableCell align="right">{history[i].coin}</StyledTableCell>
                <StyledTableCell align="right">Transfer</StyledTableCell>
                <StyledTableCell align="right">{moment(history[i].id).format('LLLL')}</StyledTableCell>
            </StyledTableRow>
        );
    }
    return items;
}

function History(props) {
    const { history } = props;

    return (
        <>
            <Typography variant="h5" component='div' className="history-header">History</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>From</StyledTableCell>
                            <StyledTableCell align="right">To</StyledTableCell>
                            <StyledTableCell align="right">Amount</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showHistory(history)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}

export default History;