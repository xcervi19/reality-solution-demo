import gql from 'graphql-tag';

export const factMutation = gql`
mutation addFact(
    $fact: FactInput!
  ) {
    addFact(
      fact: $fact
    ) {
      id
      text
    }
  }
`