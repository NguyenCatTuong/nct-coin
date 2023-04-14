import './Wallet.css'
import { Box, Typography } from '@mui/material';

function Wallet(props) {
    const {
        myWallet
    } = props;

    return (
        <Box className='wallet-wrap'>
            <Typography className="wallet-header">My wallet</Typography>
            <Box className="wallet-content">
                <Box className='wallet-item'>
                    <Typography className='detail' >Wallet name: </Typography>
                    <Typography className='detail'>{myWallet.name}</Typography>
                </Box>
                <Box className='wallet-item'>
                    <Typography className='detail'>Balance: </Typography>
                    <Typography className='detail'>{myWallet.coin}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Wallet;