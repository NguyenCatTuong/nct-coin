import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import './WalletList.css'

function WalletList(props) {

    const {
        wallets,
        currentWallet,
        getIdWallet
    } = props;


    function handleClickChangeWallet(id) {
        const value = {
            newId: id,
        };
        getIdWallet(value);
    }


    return (
        <Card sx={{ borderRadius: 0, bgcolor: '#FDEEDC', height: '100px' }}>
            <CardActionArea sx={{ mb: 0}}>
                <CardContent sx={{ w: '100%', padding: '5px', bgcolor: '#F1A661', display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography gutterBottom variant="h5" sx={{ mb: 0, pl: '5px' }}>
                        List of Wallet in System
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {wallets.map((wallet) => (
                    <div
                        key={wallet.id}
                        className={
                            currentWallet === wallet.id
                                ? "item-wallet active mb-2"
                                : "item-wallet mb-2"
                        }
                        onClick={() => handleClickChangeWallet(wallet.id)}
                    >
                        <span>{wallet.name}</span>
                    </div>
                ))}
            </CardActions>
        </Card>
    )
}

export default WalletList;