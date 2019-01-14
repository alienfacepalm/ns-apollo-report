import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Chip,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';

import { red, orange, yellow, grey } from '@material-ui/core/colors';

const styles = () => ({
  summary: {
    backgroundColor: grey[200]
  },
  high: {
    color: grey[50],
    backgroundColor: red[800],
    alignSelf: 'center'
  },
  medium: {
    color: grey[50],
    backgroundColor: orange[800],
    alignSelf: 'center'
  },
  low: {
    color: grey[50],
    backgroundColor: yellow[800],
    alignSelf: 'center'
  },
  titleGroup: {
    display: 'flex'
  },
  title: {
    fontWeight: 400,
    fontSize: '1.25rem',
    marginLeft: '1rem',
    alignSelf: 'center'
  },
  vulnerable: {
    marginLeft: '1.5rem',
    alignSelf: 'center',
    color: red[400]
  },
  details: {
    'flex-direction': 'column'
  }
});

interface SummaryProps {
  classes: any;
  test: TestData;
}

interface TestData {
  title: string;
  description: string;
  category: string;
  severity: string;
  score: string;
  vulnerable: boolean;
  regulatory: Array<string>;
  fields: Array<any>;
  data: Array<any>;
}

const TestSummary = (props: SummaryProps ) => {
  const { classes } = props;
  const {
    title,
    description,
    category,
    severity,
    score,
    vulnerable,
    regulatory,
    fields,
    data
  } = props.test;

  return (
    <ExpansionPanel defaultExpanded={vulnerable}>
      <ExpansionPanelSummary className={classes.summary}>
        <div className={classes.titleGroup}>
          <Avatar className={classes[severity]}>{score}</Avatar>
          <Typography className={classes.title}>{title}</Typography>
          {vulnerable && <Chip label='vulnerable' className={classes.vulnerable}></Chip>}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Grid container spacing={16}>
          <Grid item xs>
            <Typography>{description}</Typography>
            <Typography>category: {category}</Typography>
            {regulatory.map(reg => <Typography key={reg}><a href={reg} target='_blank'>{reg}</a></Typography>)}
          </Grid>
          <Grid item xs>
            {data.map(itm => {
              let key = Object.getOwnPropertyNames(itm)[0];
              let name = fields.find(elm => elm.name === key);
              return (
                <Typography key={itm[key]}>
                  {name.title}: {itm[key]}
                </Typography>
              )
            })}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(TestSummary);
