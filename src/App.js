import './App.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Wallet from './components/Wallet/Wallet';
import WalletList from './components/WalletList/WalletList';
import { useState } from 'react';
import Transaction from './components/Transaction/Transaction';
import { Divider, Typography } from '@mui/material';
import Block from './components/Block/Block';
import { Box } from '@mui/system';
import BlockChain from './components/BlockChain/BlockChain';
const SHA256 = require("crypto-js/sha256");


const difficulty = 2; // ENV
const miningReward = 1; // ENV

function App() {
  // ENVIRONMENT
  const [wallets, setWallets] = useState([
    { id: 0, name: 'Cát Tường', coin: 10, transfer: 0, received: 10 }
  ])

  const [block, setBlock] = useState([
    { id: 0, data: 'System-genesis Block', prevHash: '0', hash: '009cbead9607ed845f0594731850d79980bedb111225feb31b276ac222db6af5', name: 'GENESIS BLOCK' }
  ]);

  const [currentWallet, setCurrentWallet] = useState(0);

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
    const newWallet = {
      id: numberOfWallets,
      name: nameValue,
      coin: 0,
      transfer: 0,
      received: 0
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
      if (idMiner !== -1) {
        newWallet[idMiner].coin += miningReward;
        newWallet[idMiner].received += miningReward;
      }
      setWallets(newWallet);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        NCT COIN
      </header>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Wallet
            myWallet={wallets[currentWallet]}
            formCreate={createWallet}
          />
        </Grid>
        <Grid xs={6}>
          <WalletList
            wallets={wallets}
            currentWallet={currentWallet}
            getIdWallet={getIdWallet}
          />

          <Divider sx={{ mb: 2 }} />

          <Transaction
            wallets={wallets}
            currentWallet={currentWallet}
            sendCoin={sendCoin}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className='blockChain'>
        <Grid xs={10} sx={{ w: '100%', bgcolor: '#ccc', p: 0 }}>
          <BlockChain 
            blocks={block}
          />
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
