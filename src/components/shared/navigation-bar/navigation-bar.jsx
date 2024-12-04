import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut, searchBar, setSearchBar, handleSearchBarReset }) => {
    return (
        <Navbar bg="light" expand="lg" className='align-items-center custom-navbar'>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movie App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" onClick={handleSearchBarReset}>Home</Nav.Link>
                                <Nav.Link as={Link} to="/profile" onClick={handleSearchBarReset}>Profile</Nav.Link>
                                <Nav.Link onClick={() => {
                                    onLoggedOut();
                                    handleSearchBarReset();
                                }}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {/* Conditional rendering for the search form */}
                    {user && (
                        <Nav className="ms-auto">
                            <Form inline className="position-relative">
                                <Form.Control
                                    type="search"
                                    value={searchBar}
                                    onChange={(e) => setSearchBar(e.target.value)}
                                    placeholder="Search..."
                                    className="search-input"
                                />
                                {searchBar && (
                                    <Button variant="outline-secondary" className="search-clear-btn" onClick={handleSearchBarReset}>
                                        ×
                                    </Button>
                                )}
                            </Form>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
