import { gql } from "@apollo/client";

const DEL_CLIENT = gql`
mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
        id, 
        name, 
        email, 
        phone, 
    }
}
`

const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!){
        addClient(name: $name, email: $email, phone: $phone){
            id, name, phone, email
        }
    }
`

export { DEL_CLIENT, ADD_CLIENT }; 