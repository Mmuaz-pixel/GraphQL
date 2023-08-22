import React from 'react'

const EachProject = ({ project }) => {

    let status = ''; 
    if(project.status === 'NotStarted')
    status = 'Not Started'
    else if(project.status === 'InProgress')
    status = 'In Progress'
    else 
        status = project.status; 

    return (
        <div className="card col-md-4 my-2 mx-5" style={{border: '1px solid black'}}>
            <div className="card-body">
                <h5 className="card-title"><strong>{project.name}</strong></h5>
                <h6 className="card-subtitle mb-2 text-muted"><strong>Status:</strong> {status}</h6>

                <a className='btn btn-secondary' href={`/projects/${project.id}`}>Details</a>
            </div>
        </div>
    )
}

export default EachProject; 