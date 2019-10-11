import React from 'react';

import { NavBar } from '../NavBar/NavBar';

const Admin = () => {

    const navWidth = {
        maxWidth: {
            minWidth: '200px',
            maxWidth: '200px',
            width: '200px'
        },
        minWidth: {
            minWidth: '50px',
            maxWidth: '50px',
            width: '50px'
        }
    }
    
    return (
        <div className="d-flex container-full">
            <NavBar {...navWidth} />
            <div className="pages">

            </div>
        </div>
    )
}

export default Admin;