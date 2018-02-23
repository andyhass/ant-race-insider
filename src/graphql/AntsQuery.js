import gql from 'graphql-tag';

export const AntsQuery = gql`
  query AntsQuery {
    ants {
      name
      color
      length
      weight
    }
  }
`;
