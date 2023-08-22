import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from 'react-icons/fa';
import { GET_CLIENTS } from "../Queries/ClientQueries";
import { ADD_PROJECT } from "../Mutations/ProjectMutations";
import { GET_PROJECTS } from "../Queries/ProjectQueries";
import Spinner from "./Spinner";

const AddProjectModal = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('Notstarted')

    const [addProject] = useMutation(ADD_PROJECT, 
        {
            variables: {
                name, description, clientId, status
            }, 

            refetchQueries: [{query: GET_PROJECTS}]
    })

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />
    if (error) return <h3>Something went wrong...</h3>

    const FuncaddProject = (e) => {
        e.preventDefault();
        // if (name === '' || description === '' || status === '') {
        //     return alert("Fill in all fields")
        // }

        addProject(name, description, status, clientId); 
        setName('')
        setDescription('')
        setStatus('Notstarted')
        setClientId('')
    }


    return (
        <>

            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addProject">
                <div className="d-flex align-items-center">

                    <FaList className='icon' style={{ marginLeft: '3px' }} />Add Project
                </div>
            </button>

            <div className="modal fade" id="addProject" role="dialog" aria-labelledby="addProjectLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProjectLabel">Add Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={FuncaddProject}>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='h5 form-label '>Name: </label>
                                    <input type="text" className="form-control mx-2" id='name' placeholder='Enter Name of Project' value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='h5 form-label '>Description: </label>
                                    <textarea type="text" className="form-control mx-2" id='description' style={{ height: '80px' }} placeholder='Enter Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='h5 form-label '>Status: </label>
                                    <select name="" id="status" className="form-select mx-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="Notstarted">Not Started</option>
                                        <option value="InProgress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                <div className="mb-3 d-flex align-items-center">
                                    <label htmlFor="" className='h5 form-label '>Client: </label>
                                    <select name="" id="client" className="form-select mx-2" onChange={(e) => setClientId(e.target.value)}>
                                        <option value="">Select</option>
                                        {data.clients.map((client) => {
                                            return <option value={client.id} key={client.id}>{client.name}</option>
                                        })}
                                    </select>
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

export default AddProjectModal