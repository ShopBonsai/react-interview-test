import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';
import User from './User';

class NavBarApp extends Component {
    render() {
        return(
            <div className='bar'>
                <Navbar color='faded' light>
                    <NavbarBrand href="/" className="mr-auto">BonsaiShop</NavbarBrand>
                    <User/>
                </Navbar>
            </div>
        )
    }
}
export default NavBarApp;
