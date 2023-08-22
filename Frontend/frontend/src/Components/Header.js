import React from 'react'
import favicon from '../assets/favicon.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className='navbar bg-light mb-4 p-0'>
            <div className="container">
                <Link to="/" className="navbar-brand">
                     <div className="d-flex">
                        <img src={favicon} alt="" className='mr-3' />
                        <div>Project Management</div>
                     </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header