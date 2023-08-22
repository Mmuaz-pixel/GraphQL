import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $clientId: ID!, $status: ProjStatus!)
    {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId)
        {
            id
            name 
            description
            status 
            client {
                name, email, phone, id
            }
        }
    }
`
const EDIT_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String!, $description: String!, $clientId: ID!, $status: UpdateStatus!){
        updateProject(id: $id, description: $description, status: $status, name: $name, clientId: $clientId)
            {
                name, id, description, status
            }
    }
`

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!)
    {
        deleteProject(id: $id)
        {
            id, name, description, status, client {
                name, email, phone, id
            }
        }
    }
`

export { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT }; 