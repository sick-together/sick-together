import React from 'react'
import './Header.css'

function Header(props) {
    return (
        <header className='header'>
            <div className='menu-icon'>
                <i className="fas fa-bars" onClick={props.leftNavClickHandler} />
            </div>
            <div className='nav-header'>
                <h3>Sick Together</h3>
            </div>
            <div className='menu-icon'>
                <i className="fas fa-comment-medical" />
            </div>
        </header>
    )
}

export default Header
