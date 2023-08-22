import React, { useRef} from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECT, GET_PROJECTS } from '../Queries/ProjectQueries'
import ClientInfo from '../Components/ClientInfo'
import { DELETE_PROJECT } from '../Mutations/ProjectMutations'
import { useMutation } from '@apollo/client'
import EditProjectModal from '../Components/EditProjectModal'

const SingleProject = () => {

    const delModalRef = useRef(null);

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: {
            id: id
        }
    });


    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {
            id
        },
        refetchQueries: [{ query: GET_PROJECTS }]
    })

    if (loading ) return <Spinner />
    if (error ) return <h2>Something went wrong</h2>

    let status = '';
    if (data.project.status === 'NotStarted')
        status = 'Not Started'
    else if (data.project.status === 'InProgress')
        status = 'In Progress'
    else
        status = data.project.status;

    const showDelModal = () => {
        delModalRef.current.click();
    }

    const deleteProj = () => {
        deleteProject(id)
        delModalRef.current.click();
    }

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" ref={delModalRef} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" >

                    </button>

                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Delete Project</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure to delete the project <strong>{data.project.name}</strong>?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <Link to='/' type="button" className="btn btn-danger" onClick={deleteProj}>Delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-75 card p-5 d-flex">
                        <div className="d-flex">
                        <Link to='/' className='btn btn-light my-2 btn-sm w-25 d-inline ms-auto'>Back</Link>
                        <Link className='btn btn-danger my-2 btn-sm w-25 d-inline ms-auto' onClick={showDelModal}>Delete</Link>
                        <EditProjectModal project={data.project}/>
                        </div>
                        <h1>{data.project.name}</h1>
                        <p>{data.project.description}</p>
                        <h5 className="mt-3">Status: {status}</h5>
                        <ClientInfo client={data.project.client}></ClientInfo>
                    </div>
                </>
            )}
        </>
    )
}

export default SingleProject