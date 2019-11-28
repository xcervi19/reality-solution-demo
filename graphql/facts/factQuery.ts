import gql from 'graphql-tag';

interface Fact {
  id: number;
  text: string;
}

export const factQuery = gql`
query fact {
  fact {
    id
    text
  }
}
`
export type TFactData = {
  fact: Fact,
}