import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
   mutation registerUser($input: UserInput) {
      registerUser(input: $input) {
         id
         name
         username
         email
      }
   }
`;

export const LOGIN_USER = gql`
   mutation loginUser($input: LoginInput) {
      loginUser(input: $input) {
         token
      }
   }
`;

export const GET_USER = gql`
   query getUser($id: ID, $username: String) {
      getUser(id: $id, username: $username) {
         id
         name
         username
         email
         siteWeb
         bio
         avatar
      }
   }
`;
