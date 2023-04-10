import './Wallet.css'
import { Box, Typography } from '@mui/material';

function Wallet() {
    return (
        <Box className='wallet-wrap'>
            <Typography className="wallet-header">My wallet</Typography>
            <Box className="wallet-content">
                <Box className='wallet-item'>
                    <Typography className='detail' >Wallet name: </Typography>
                    <Typography className='detail'>Cát Tường</Typography>
                </Box>
                <Box className='wallet-item'>
                    <Typography className='detail'>Balance: </Typography>
                    <Typography className='detail'>100</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Wallet;