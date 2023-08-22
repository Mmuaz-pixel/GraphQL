import React from 'react'
import Clients from '../Components/Clients'
import Projects from '../Components/Projects'
import AddClientModel from '../Components/AddClientModel'
import AddProjectModal from '../Components/AddProjectModal'


const Home = () => {
    return (
        <>
            <h2 className='headings'>Clients</h2>
            <div className='d-flex gap-3 mb-4 '>
                <AddClientModel />
            </div>
            <Clients />
            <hr />
            <h2 className='headings'>Projects</h2>
            <div className='d-flex gap-3 mb-4 '>
                <AddProjectModal />
            </div>
            <Projects />
        </>
    )
}

export default Home