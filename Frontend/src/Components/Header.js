import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Header() {
    return (
        <Container>
            <Navbar bg="primary" data-bs-theme="light">
                <Navbar.Brand href="/">MaintainDeal</Navbar.Brand>
                <Nav className="me-auto" style={{ textDecorationColor: '100px' }}>
                    <Nav.Link href="/">Deals</Nav.Link>
                </Nav>
            </Navbar>
        </Container>
    );
}
