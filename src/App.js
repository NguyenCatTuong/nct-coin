import './App.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Wallet from './components/Wallet/Wallet';
import WalletList from './components/WalletList/WalletList';
import { useState } from 'react';
import Transaction from './components/Transaction/Transaction';
import { Button, Divider, Typography } from '@mui/material';
import BlockChain from './components/BlockChain/BlockChain';
import History from './components/History/History';
import { BLOCK, STATIC } from './constants/static';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { COLORS } from './constants/colors';
const SHA256 = require("crypto-js/sha256");


const difficulty = STATIC.DIFFICULTY;
const miningReward = STATIC.AWARD_COIN;

function App() {
  const [wallets, setWallets] = useState([
    { id: 0, name: STATIC.FIRST_WALLET, coin: STATIC.INIT_COIN, transfer: 0, received: STATIC.INIT_COIN, public_key: BLOCK.INIT_HASH }
  ])

  const [block, setBlock] = useState([
    { id: BLOCK.INIT_ID, data: BLOCK.INIT_MESSAGE, prevHash: BLOCK.INIT_PRE_HASH, hash: BLOCK.INIT_HASH, name: BLOCK.INIT_NAME }
  ]);

  const [currentWallet, setCurrentWallet] = useState(0);
  const [history, setHistory] = useState([]);

  // Create a new wallet
  const [walletName, setWalletName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handelCreateWalletChange(e) {
    // console.log(e.target.value);
    setWalletName(e.target.value);
  }

  function handelCreateWalletSubmit(e) {
    // console.log(e.target);
    e.preventDefault();
    if (walletName === "") {
      return;
    }
    const value = {
      name: walletName,
    };
    setWalletName("");
    createWallet(value);
    setOpen(false);
  }

  const calculateHash = (index, previousHash, difficulty) => {
    let nonce = 0;
    while (true) {
      const timestamp = Date.now();
      const hash = SHA256(index + timestamp + previousHash + nonce).toString();
      if (hash.substring(0, difficulty) === Array(difficulty + 1).join("0")) {
        return hash;
      }
      nonce++;
    }
  }

  // Find the miner for transaction if number of wallets bigger than 2
  const findMiner = (from, to, minWallets) => {
    if (minWallets <= 2) {
      return -1;
    }
    while (true) {
      const randomIndex = Math.floor(Math.random() * minWallets);
      if (randomIndex !== from && randomIndex !== to) {
        return randomIndex;
      }
    }
  }

  function getIdWallet(value) {
    setCurrentWallet(value.newId);
  }

  function createWallet(value) {
    const numberOfWallets = wallets.length;
    const nameValue = value.name;

    // const newId = block.length;
    const previousHash = wallets[numberOfWallets - 1].public_key;
    const hash = calculateHash(numberOfWallets, previousHash, difficulty);

    const newWallet = {
      id: numberOfWallets,
      name: nameValue,
      coin: STATIC.INIT_COIN,
      transfer: 0,
      received: STATIC.INIT_COIN,
      public_key: hash
    }
    let newListWallet = [...wallets];
    newListWallet.push(newWallet);
    setWallets(newListWallet);
    setCurrentWallet(numberOfWallets);
  }

  function clearDataInput(id) {
    document.getElementById(id).reset();
  }

  function sendCoin(value) {
    let newWallet = [...wallets];
    let myCoin = newWallet[currentWallet].coin;
    if (value.id === currentWallet || value.coin > myCoin || value.coin <= 0 || isNaN(value.coin)) {
      document.getElementsByClassName('valid')[0].classList.add('invalid');
      clearDataInput('transferId');
    }
    else {
      const newId = block.length;
      const previousHash = block[newId - 1].hash;
      let newListBlock = [...block];
      const newData = `'${newWallet[currentWallet].name}' sent to '${newWallet[value.id].name}' ${value.coin} Coin`;
      let newBlock = {
        id: newId,
        data: newData,
        prevHash: previousHash,
        hash: calculateHash(newId, previousHash, difficulty),
        name: "BLOCK NUMBER " + newId,
      }
      newListBlock.push(newBlock);
      setBlock(newListBlock);

      newWallet[currentWallet].coin = myCoin - value.coin;
      newWallet[currentWallet].transfer += value.coin;
      newWallet[value.id].coin = newWallet[value.id].coin + value.coin;
      newWallet[value.id].received += value.coin;

      const idMiner = findMiner(currentWallet, value.id, newWallet.length);
      let minerName = "Sending and receiving accounts cannot be a miner";
      if (idMiner !== -1) {
        minerName = newWallet[idMiner].name;
        newWallet[idMiner].coin += miningReward;
        newWallet[idMiner].received += miningReward;
      }

      // For history
      const newHistory = {
        id: Date.now(),
        to: newWallet[value.id].name,
        from: newWallet[currentWallet].name,
        coin: value.coin,
        miner: minerName
      }
      setWallets(newWallet);
      let newListHistory = [...history];
      newListHistory.push(newHistory);
      setHistory(newListHistory);
      clearDataInput('transferId');
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <span>NCT COIN</span>

        {/* Dialog Create a new wallet */}
        <div>
          <Button className='btn-create' sx={{ bgcolor: COLORS.HEADER_COLOR }} variant="contained" onClick={handleClickOpen}>
            Create a wallet
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant='h5'>Create a new Wallet</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: 'black' }}>
                Please, Enter your wallet name. It's is following you in our system!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter your wallet name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handelCreateWalletChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handelCreateWalletSubmit}>Create</Button>
            </DialogActions>
          </Dialog>
        </div>
      </header>

      <Grid className='wallet-container' container spacing={2}>
        <Grid xs={5} sx={{ pl: 0 }}>
          <Wallet
            myWallet={wallets[currentWallet]}
            createWallet={createWallet}
          />
        </Grid>
        <Grid xs={5} sx={{ pr: 0 }}>
          <WalletList
            wallets={wallets}
            currentWallet={currentWallet}
            getIdWallet={getIdWallet}
          />

          <Divider sx={{ mb: '20px' }} />

          <Transaction
            wallets={wallets}
            currentWallet={currentWallet}
            sendCoin={sendCoin}
          />
        </Grid>
      </Grid>

      <Grid sx={{ mb: '20px' }} container spacing={2} className='blockChain'>
        <Grid xs={10} sx={{ w: '100%', bgcolor: '#FDEEDC', p: 0, paddingBottom: '20px' }}>
          <BlockChain
            blocks={block}
          />
        </Grid>
      </Grid>


      <Grid container spacing={2} className='blockChain'>
        <Grid xs={10} sx={{ w: '100%', bgcolor: '#FDEEDC', p: 0 }}>
          <Typography variant="h5" component='div' className="history-header">History</Typography>
          {
            history.length === 0 ?
              <Typography sx={{ color: 'red', padding: '5px 0' }}>No history to show</Typography>
              :
              <History
                history={history}
              />
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
