import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Header() {
    return (
        <Container>
            <Navbar bg="info" data-bs-theme="light">
                <Navbar.Brand href="/about">DealMapping</Navbar.Brand>
                <Nav className="me-auto" style={{ textDecorationColor: '100px' }}>
                    <Nav.Link href="/">Maintain Deals</Nav.Link>
                    <Nav.Link href="/checkDeals">Check Deals</Nav.Link>
                    <Nav.Link href="/about/contact">Contact</Nav.Link>
                </Nav>
            </Navbar>
        </Container>
    );
}
