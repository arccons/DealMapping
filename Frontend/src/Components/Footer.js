import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <><br></br>
            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <center><h6>BRC Technologies, LLC</h6></center>
                    <MDBRow className='mt-3'>
                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                            <p><a href='#!' className='text-reset'>Full Stack Development</a></p>
                            <p><a href='#!' className='text-reset'>Django</a></p>
                            <p><a href='#!' className='text-reset'>React</a></p>
                            <p><a href='#!' className='text-reset'>Node.js</a></p>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p><a href='#!' className='text-reset'>Sales</a></p>
                            <p><a href='#!' className='text-reset'>Support</a></p>
                        </MDBCol>
                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p><MDBIcon icon="home" className="me-2" />New Jersey, NJ 08854, US</p>
                            <p><MDBIcon icon="envelope" className="me-3" />EMAIL ADDRESS</p>
                            <p><MDBIcon icon="phone" className="me-3" /> +1 234 567 88</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    Copyright @{new Date().getFullYear()}: BRC Technologies, LLC
                </div>
            </MDBFooter>
        </>
    );
}