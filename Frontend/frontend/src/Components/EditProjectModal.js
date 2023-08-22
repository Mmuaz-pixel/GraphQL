import React, { useState, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_PROJECT } from '../Mutations/ProjectMutations'
import { GET_PROJECT } from '../Queries/ProjectQueries'

const EditProjectModal = ({ project }) => {

    const id = project.id;
    const EditModalRef = useRef(null);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(() => {
        switch (project.status) {
            case "Not Started":
                return "Notstarted";
            case "In Progress":
                return "InProgress";
            case "Completed":
                return "Completed";
            default:
                throw new Error(`Unknown status: ${project.status}`);
        }
    });
    const [editProject] = useMutation(EDIT_PROJECT, {
        variables: {
            id, name, description, status
        },

        refetchQueries: [{ query: GET_PROJECT }]
    })


    const editProj = () => {
        editProject(id, name, description, status);
        EditModalRef.current.click();
    }


    return (
        <>
            <button className='btn btn-info my-2 btn-sm w-25 d-inline ms-auto' type="button" ref={EditModalRef} data-toggle="modal" data-target="#exampleModalEdit" >
                Edit
            </button>

            <div className="modal fade" id="exampleModalEdit" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editProj}>
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-info" onClick={editProj}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProjectModal