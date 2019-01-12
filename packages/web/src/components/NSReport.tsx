import { gql } from 'apollo-boost';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const GET_REPORT = gql`
  query getReport {
    getReport {
      id
      name
      platform
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

const NSReport = () => (
  <Query query={GET_REPORT}>
    {({ loading, error, data }) => {
      if (loading) return <CircularProgress></CircularProgress>;
      if (error) return <Typography>{`Doh!\n${error.message}`}</Typography>;

      return (
        <pre>
          <code>
            {JSON.stringify(data.getReport, null, 2)}
          </code>
        </pre>
      );
    }}
  </Query>
);

export default NSReport;
