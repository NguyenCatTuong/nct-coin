import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import '../../../src/App.css'
import './Transaction.css';

function Transaction(props) {
    const {
        wallets,
        currentWallet,
    } = props;

    const [sendCoinForm, setSendCoinForm] = useState(0);
    const [idReceiver, SetIdReceiver] = useState(0);

    function handleChangeSendCoin(e) {
        setSendCoinForm(e.target.value);
    }

    function handleChangeIdReceiver(e) {
        SetIdReceiver(e.target.value);
    }


    function handleTransferSubmit(e) {
        e.preventDefault();
        const formValue = {
            id: Math.floor(idReceiver),
            coin: Math.floor(sendCoinForm),
        };
        // sendCoin(formValue);
        setSendCoinForm(0);
        SetIdReceiver(0);
    }

    return (
        <Card sx={{ borderRadius: 0, bgcolor: '#ccc', minHeight: '140px' }}>
            <CardActionArea>
                <CardContent sx={{ w: '100%', padding: 0 }}>
                    <Typography sx={{ d: 'flex', justifyContent: 'flex-start', w: '100%', bgcolor: '#8bb2ff' }} gutterBottom variant="h5" component="div">
                        Send coin
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="transaction-action">
                <p className={wallets.length === 1 ? "txtNotify" : "disappear"}>
                    Add more wallet to transfer
                </p>
                <form
                    // className={wallets.length === 1 ? "disappear" : "send-coin"}
                    className="disappear"
                    onSubmit={handleTransferSubmit}
                    id="transferId"
                >
                    <div className="form-group">
                        <label htmlFor="send-coin">Amount: </label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            id="send-coin"
                            onChange={handleChangeSendCoin}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wallet">To: </label>
                        <select
                            className="form-control form-control-sm"
                            id="wallet"
                            onChange={handleChangeIdReceiver}
                        >
                            {wallets.map((wallet) => (
                                <option
                                    key={wallet.id}
                                    value={wallet.id}
                                    className={wallet.id === currentWallet ? "disappear" : ""}
                                >
                                    {wallet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-block btn-success">Send</button>
                </form>
                <label className="invalid">Input invalid</label>
            </CardActions>
        </Card>
    )
}

export default Transaction;