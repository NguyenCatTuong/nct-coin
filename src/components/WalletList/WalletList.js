import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

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
        <Card sx={{ borderRadius: 0, bgcolor: '#ccc', minHeight: '100px' }}>
            <CardActionArea>
                <CardContent sx={{ w: '100%', padding: 0 }}>
                    <Typography sx={{ d: 'flex', justifyContent: 'flex-start', w: '100%', bgcolor: '#8bb2ff' }} gutterBottom variant="h5" component="div">
                        List of Wallet in System
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {wallets.map((wallet) => (
                    <div
                        key={wallet.id}
                        className={
                            currentWallet === wallet.id
                                ? "wallet-item active mb-2"
                                : "wallet-item mb-2"
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