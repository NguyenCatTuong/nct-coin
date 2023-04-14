import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import '../../../src/App.css'
import './Transaction.css';

function Transaction(props) {
    const {
        wallets,
        currentWallet,
        sendCoin
    } = props;

    const [sendCoinForm, setSendCoinForm] = useState(0);
    const [idReceiver, SetIdReceiver] = useState(0);

    function handleChangeSendCoin(e) {
        setSendCoinForm(e.target.value);
        // Remove invalid class
        document.getElementsByClassName('invalid')[0]?.classList.remove('invalid');
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
        sendCoin(formValue);
        setSendCoinForm(0);
        SetIdReceiver(0);
    }

    return (
        <Card sx={{ borderRadius: 0, bgcolor: '#FDEEDC', minHeight: '140px' }}>
            <CardActionArea>
                <CardContent sx={{ w: '100%', padding: '5px', bgcolor: '#F1A661', display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography sx={{ mb: 0, pl: '5px' }} gutterBottom variant="h5" component="div">
                        Send coin
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="transaction-action">
                <p className={wallets.length <= 2 ? "transNotify" : "disappear"}>
                    You need at least two wallets to process the transaction and 3 wallets to find a miner
                </p>
                <form
                    className={wallets.length <= 2 ? "disappear" : "send-coin"}
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
                <label className="valid">Input invalid</label>
            </CardActions>
        </Card>
    )
}

export default Transaction;