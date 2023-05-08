import React, { useEffect, useState } from 'react';
import { Collapse, FormGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Form, Button, NavbarText, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../General/Axios';
import { useNavigate } from 'react-router-dom';
import SessionCheck from '../Security/SessionCheck';


const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [myRole, setRoles] = useState([])


  const navigate = useNavigate();


  useEffect(() => {
    const fetchMyData = async () => {
      let roleName = sessionStorage.getItem("myRole")
      setRoles(roleName)

    }

    fetchMyData()
  }, [])


  const logoutButton = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure want to log out ")) {
      await logout();
      navigate("/")
    }
  }

  return (
    <>
      <SessionCheck />

      <Navbar color="dark" dark expand="md">
        <Container fluid>

          <NavbarBrand tag={Link} to="/home" ><h2>Home</h2></NavbarBrand>

          <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
          <Collapse isOpen={isOpen} navbar>
            {myRole.includes("ADMIN") && (

              <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                <NavItem>
                  <Button>
                    <Link to={"/admin/users"} style={{ textDecoration: "none", color: "white" }}>
                      User Accounts
                    </Link>
                  </Button>
                </NavItem>

                <NavItem>
                  <Button>
                    <Link to={"/admin/roles"} style={{ textDecoration: "none", color: "white" }}>
                      User Profile
                    </Link>
                  </Button>
                </NavItem>
              </Nav>
            )}

            {myRole.includes("AUTHOR") && (

              <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                <NavItem>
                  <Button>
                    <Link tag={Link} to={"/author/papers"} style={{ textDecoration: "none", color: "white" }}>
                      My Papers
                    </Link>
                  </Button>
                </NavItem>


                <NavItem>
                  <Button>
                    <Link tag={Link} to={"/author/papers/publish"} style={{ textDecoration: "none", color: "white" }}>
                      Publication
                    </Link>
                  </Button>
                </NavItem>

              </Nav>
            )}

            {myRole.includes("REVIEWER") && (

              <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                <NavItem>
                  <Button>
                    <Link to={"/reviewer/reviews"} style={{ textDecoration: "none", color: "white" }}>
                      Review Papers
                    </Link>
                  </Button>
                </NavItem>

                <NavItem>
                  <Button>
                    <Link to={"/reviewer/mybids"} style={{ textDecoration: "none", color: "white" }}>
                      Bid Status
                    </Link>
                  </Button>
                </NavItem>

                <NavItem>
                  <Button>
                    <Link to={"/reviewer/bid"} style={{ textDecoration: "none", color: "white" }}>
                      Bid Paper
                    </Link>
                  </Button>
                </NavItem>
              </Nav>
            )}

            {myRole.includes("CONFERENCE") && (

              <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                <NavItem>
                  <Button>
                    <Link to={"/conference/bids"} style={{ textDecoration: "none", color: "white" }}>
                      Reviewer Bid
                    </Link>
                  </Button>
                </NavItem>

                <NavItem>
                  <Button>
                    <Link to={"/conference/papers/ready"} style={{ textDecoration: "none", color: "white" }}>
                      Publication
                    </Link>
                  </Button>
                </NavItem>

              </Nav>
            )}




            <Nav className="justify-content-end" style={{ width: "100%", gap: "10px" }} navbar>
              {/* <NavItem>
                <Button>
                  <Link to={"/users"} style={{ textDecoration: "none" }}>
                    <NavbarText>My Profile</NavbarText>
                  </Link>
                </Button>
              </NavItem> */}

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
        </Container>

      </Navbar>



    </>


  );
};

export default AppNavbar;