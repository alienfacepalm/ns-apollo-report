import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Report from '././components/Report'

const App = () => (
  <Grid container spacing={16} justify='center'>
    <Grid item xs={12}>
      <Typography variant="h5">NowSecure Apollo Report</Typography>
    </Grid>
    <Report />
  </Grid>
);

export default App;
