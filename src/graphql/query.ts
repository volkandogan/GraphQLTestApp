import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
      loginWithEmail(email: $email, password: $password) {
      token
  }
  }
`;

export const USER_QUERY = gql`
    query User {
      user{
        email
        firstName
        lastName
        mobileNumber
      }
  }
`;

export const RESTAURANTS_QUERY = gql`
query Restaurants{
  restaurants(
    index: 0
    limit: 10
    lat: 51.466179
    lon: -0.143524
    delivery:true
  ) {
    name
    uid
}
}
`;