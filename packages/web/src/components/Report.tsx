import { gql } from 'apollo-boost';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TestSummary from './TestSummary';

const GET_REPORT = gql`
  query getReport {
    getReport {
      id
      name
      platform
      createdDate
      tests {
        title
        description
        category
        severity
        score
        regulatory
        vulnerable
        key
        fields {
          name
          title
        }
        data {
          ... on Path {
            path
          }
          ... on SearchedData {
            searched_data
          }
          ... on File {
            type
            filename
          }
          ... on Method {
            class
            method
          }
          ... on Host {
            host
          }
        }
      }
    }
  }
`;

const Report = () => (
  <Query query={GET_REPORT}>
    {({ loading, error, data }) => {
      if (loading) return <CircularProgress></CircularProgress>;
      if (error) return <Typography>{`Doh!\n${error.message}`}</Typography>;

      return (
        <Grid item container xs={12} sm={10}>
          <Grid item xs={12}>
            <Typography variant="h6">{data.getReport.id}</Typography>
            <Typography variant='subtitle2'>{data.getReport.name} ({data.getReport.platform})</Typography>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              {data.getReport.tests.map(test => <TestSummary test={test} key={test.title} />)}
            </Paper>
          </Grid>
        </Grid>
      );
    }}
  </Query>
);

export default Report;
