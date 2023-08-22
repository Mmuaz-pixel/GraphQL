import React from 'react'
import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../Queries/ProjectQueries'
import EachProject from './EachProject'

const Projects = () => {

    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />
    if (error) return <h3>Something went wrong...</h3>
    if (data.projects.length < 1) return <h4>No Projects to Show</h4>

    return (
        <div className="row m-2">
            {data.projects.map((project) => {
                return <EachProject key={project.id} project={project}></EachProject>
            })}
        </div>
    )
}

export default Projects