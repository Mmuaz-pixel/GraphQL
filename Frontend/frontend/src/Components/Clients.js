import React from 'react'
import { gql, useQuery } from '@apollo/client'; 
import ClientRow from './ClientRow.js'
import Spinner from './Spinner.js';

import { GET_CLIENTS } from '../Queries/ClientQueries.js';

const Clients = () => {
  const {loading, error, data} = useQuery(GET_CLIENTS); 


  if(loading)
  {
    return (
      <Spinner></Spinner>
    )
  }
  if(error)
  {
    return (
      <p>Something went wrong...</p>
    )
  }

  return (
    <div>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map(client => 
              (
                <ClientRow name={client.name} email={client.email} phone={client.phone}key={client.id} id={client.id}></ClientRow>
              )
              )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Clients