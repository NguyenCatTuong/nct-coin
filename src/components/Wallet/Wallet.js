import './Wallet.css'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { useState } from 'react';

function Wallet() {

    const [walletName, setWalletName] = useState("");

    function handelCreateWalletChange(e) {
        console.log(e.target.value);
        setWalletName(e.target.value);
    }

    function handelCreateWalletSubmit(e) {
        // console.log(e.target);
        e.preventDefault();
        if (walletName === "") {
            return;
        }
        const formValue = {
            name: walletName,
        };
        setWalletName("");
    }

    return (
        <Box>
            <Card sx={{ borderRadius: 0, bgcolor: '#ccc'}}>
                <CardActionArea >
                    <CardContent sx={{w: '100%', padding: 0}}>
                        <Typography sx={{d: 'flex', justifyContent:'flex-start', w: '100%', bgcolor: '#8bb2ff' }} gutterBottom variant="h5" component="div">
                            Create a new wallet
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <form className='create-wallet-content' onSubmit={handelCreateWalletSubmit}>
                        <Box sx={{ flex: 1, mr: 2 }}>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                placeholder="Enter a wallet name..."
                                onChange={handelCreateWalletChange}
                            />
                        </Box>
                        <button className="btn btn-success btnCreateWallet">
                            Create
                        </button>
                    </form>
                </CardActions>
            </Card>

            <Divider sx={{mb: 2}} />

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
        </Box>

    )
}

export default Wallet;