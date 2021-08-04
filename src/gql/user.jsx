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
