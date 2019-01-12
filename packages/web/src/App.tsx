import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import NSReport from './components/NSReport';

const App = () => (
  <Grid container spacing={16}>
    <Grid item xs={12}>
      <Typography>NowSecure Demo App</Typography>
    </Grid>
    <Grid item xs={12}>
      <NSReport />
    </Grid>
  </Grid>
);

export default App;
