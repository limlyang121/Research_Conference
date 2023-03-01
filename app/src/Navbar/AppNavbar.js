import React, { useEffect, useState } from 'react';
import { Collapse, FormGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Form, Button, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../General/Axios';
import { useNavigate, BrowserRouter } from 'react-router-dom';
import UserList from '../Admin/UserList';

const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState()
  const [myRole, setRoles] = useState([])


  const navigate = useNavigate();


  useEffect(() => {
    const fetchMyData = async () => {
      let username = sessionStorage.getItem("username")
      let roleName = sessionStorage.getItem("myRole")
      setUser(username)
      setRoles(roleName)

    }

    fetchMyData()
  }, [])


  const logoutButton = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure want to log out ")) {
      logout();
      navigate("/")
    }
  }

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/home"><h2>Home,</h2></NavbarBrand>
      <NavbarBrand >{myRole}</NavbarBrand>

      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
      <Collapse isOpen={isOpen} navbar>

        <Nav className="justify-content-end" style={{ width: "100%" }} navbar>
          <NavItem>
            <Button>
              <Link to={"/users"} style={{textDecoration:"none"}}>
                <NavbarText>My Profile</NavbarText>
              </Link>
            </Button>
          </NavItem>

          <NavItem>
            <Form onSubmit={logoutButton} method="post">
              <FormGroup>
                <Button type='submit'>
                  <NavbarText>Log out</NavbarText>
                </Button>
              </FormGroup>
            </Form>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>

  );
};

export default AppNavbar;