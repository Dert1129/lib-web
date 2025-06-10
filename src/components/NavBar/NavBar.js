import { Component } from 'react';

import {
  Navbar,
  NavbarBrand,
  Container,
  NavLink,
} from 'reactstrap';

class LibraryNavBar extends Component {

  render() {
    return (
        <div>
            <Container>
                <Navbar id="navbar" className="fixed-top px-1 py-1 mb-3 container-fluid" expand="md" light>
                    <NavbarBrand href="/" className="ms-2 text-dark d-flex align-items-center">
                        <img src="/img/logo.png" alt="The Library" className="logo" />
                        <span id="title-text" className="ms-2">The Library</span>
                    </NavbarBrand>
                    <NavLink href='/library'>
                        Library
                    </NavLink>'
                    <NavLink href='/upload'>
                        Upload
                    </NavLink>
                </Navbar>
            </Container>
        </div>
    );
  }
}

export default LibraryNavBar;