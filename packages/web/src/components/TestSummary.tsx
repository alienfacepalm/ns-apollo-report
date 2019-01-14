import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';

const styles = () => ({
  root: {
    marginBottom: 'none'
  },
  summary: {
    backgroundColor: '#eee'
  }
});

const TestSummary = (props: { classes: any, test: { title: string, description: string, category: string, severity: string, score: string, vulnerable: boolean } }) => {
  const { classes } = props;
  const { title, description, category, severity, score, vulnerable } = props.test;
  return (
    <ExpansionPanel defaultExpanded={vulnerable} className={classes.root}>
      <ExpansionPanelSummary className={classes.summary}>
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{description}</Typography>
        <Typography>{category}</Typography>
        <Typography>{severity}</Typography>
        <Typography>{score}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(TestSummary);
