import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import { AuthContext } from '../../../context/AuthContext.js'
import { useContext } from 'react';

const NavBar = () => {
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/')
    }
    return (
        <div className="main-Header">
            <Navbar bg="transparent" expand="lg">
                <Container>
                    <Navbar.Brand href="#" style={{ "color": "#fff", "fontWeight": "800" }} onClick={() => { navigate('/') }}>User  Controller</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link style={{ "color": "#fff" }} onClick={() => { navigate('/') }}>Home</Nav.Link>

                        </Nav>
                        {
                            user ? <Nav className="d-flex justify-content-between" style={{ "minWidth": "283px" }}>
                                <Nav.Link style={{ "color": "#fff" }}>{user.name}</Nav.Link>

                                <Nav className="d-flex justify-content-between" style={{ "minWidth": "283px" }}>
                                    <Button variant="outline-light" className='loginBtn' onClick={handleLogout}>logout</Button>

                                </Nav>

                            </Nav> :
                                <Nav className="d-flex justify-content-between" style={{ "minWidth": "283px" }}>
                                    <Button variant="outline-light" className='loginBtn' onClick={() => { navigate('/login') }}>login</Button>
                                    <Button variant="outline-light" className='submitBtn' onClick={() => { navigate('/signup') }}>Signup</Button>
                                </Nav>

                        }


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
