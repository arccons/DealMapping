import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function Header() {

    return (
        <>
            <MDBNavbar expand='lg' light bgColor='light' className='top'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>DealMapping</MDBNavbarBrand>
                    <MDBCollapse navbar>
                        <MDBNavbarNav>
                            <MDBNavbarItem>
                                <MDBNavbarLink active href='/'>Deals</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <br></br>
        </>
    );
}
