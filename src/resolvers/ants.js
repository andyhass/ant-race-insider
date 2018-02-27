import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const withAnts = graphql(
  gql`
    query fetchAnts {
      ants {
        name
        color
        length
        weight
      }
    }
  `,
  {
    props: ({ ownProps, data: { loading, ants, refetch } }) => ({
      loading,
      ants,
    }),
  }
);
