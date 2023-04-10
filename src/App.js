import './App.css';
// import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Wallet from './components/Wallet/Wallet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        NCT COIN
      </header>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Wallet/>
        </Grid>
        <Grid xs={6}>
          b
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
