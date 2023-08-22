import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../Mutations/ClientMutations'

import { GET_CLIENTS } from '../Queries/ClientQueries'

const AddClientModel = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name, email, phone
        },

        refetchQueries: [{ query: GET_CLIENTS }]
    })

    const FuncAddClient = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || phone === '') {
            return alert("Fill in all fields")
        }

        addClient(name, email, phone);
        setName('')
        setEmail('')
        setPhone('')

        
    }


    return (
        <>

            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addClient">
                <div className="d-flex align-items-center">

                    Add Client <FaUser className='icon' style={{ marginLeft: '3px' }} />
                </div>
            </button>

            <div className="modal fade" id="addClient" role="dialog" aria-labelledby="addClientLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addClientLabel">Add Client</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={FuncAddClient}>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='form-label '>Name: </label>
                                    <input type="text" className="form-control mx-2" id='name' placeholder='Enter Full Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='form-label '>Email: </label>
                                    <input type="email" className="form-control mx-2" id='email' placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='form-label '>Phone: </label>
                                    <input type="text" className="form-control mx-2" id='phone' placeholder='Enter Phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClientModel