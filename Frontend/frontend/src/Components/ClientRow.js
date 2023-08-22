import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { DEL_CLIENT } from '../Mutations/ClientMutations'
import { useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../Queries/ClientQueries'

const ClientRow = (props) => {

    const [deleteClient] = useMutation(DEL_CLIENT, {variables: {id: props.id}, 
        // one way to update the page 
        // refetchQueries: [{query: GET_CLIENTS}] 

        
        // 2nd way
        update(cache, { data: { deleteClient } }) {
            const {clients } = cache.readQuery({
                query: GET_CLIENTS
            })
            cache.writeQuery({
                query: GET_CLIENTS, 
                data: {clients: clients.filter(client => client.id !== deleteClient.id)}
            })
        }
    }); 


    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}><FaTrash /></button>
            </td>
        </tr>
    )
}

export default ClientRow