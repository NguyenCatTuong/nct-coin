import './App.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Wallet from './components/Wallet/Wallet';
import WalletList from './components/WalletList/WalletList';
import { useState } from 'react';
import Transaction from './components/Transaction/Transaction';
import { Divider } from '@mui/material';

function App() {
  // ENVIRONMENT
  const [wallets, setWallets] = useState([
    { id: 0, name: 'Cát Tường', coin: 10, transfer: 0, received: 10 }
  ])

  const [currentWallet, setCurrentWallet] = useState(0);

  function getIdWallet(value) {
    setCurrentWallet(value.newId);
  }


  return (
    <div className="App">
      <header className="App-header">
        NCT COIN
      </header>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Wallet />
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
          />
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
