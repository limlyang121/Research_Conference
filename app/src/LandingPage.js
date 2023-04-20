import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './Navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';


const LandingPage = () => {

  return (
    <div>
      <Container fluid>
        <br />
        <h2 style={{ textAlign: "center" }}>Note</h2>
        <hr />

        <fieldset style={{ border: "1px black" }}>
          <legend style={{ textAlign: "center", marginBottom: "50px" }}>
            <h1>
              ID
            </h1>
          </legend>

          <Container style={{ width: "70%" }}  >

            <Table style={{ textAlign: "center", border: "3px solid black" }} bordered >
              <thead className='thead-dark' >
                <tr>
                  <th> Username </th>
                  <th> Password </th>
                  <th> Role </th>
                </tr>
              </thead>
              <tr>
                <td> admin </td>
                <td rowSpan={4}> test123 </td>
                <td> Admin </td>
              </tr>
              <tr>
                <td> author </td>
                <td> Author </td>
              </tr>
              <tr>
                <td> reviewer </td>
                <td> Reviewer </td>
              </tr>
              <tr>
                <td> conference </td>
                <td> Conference Chair </td>
              </tr>
            </Table>

          </Container>
          <h2 style={{ textAlign: "center" }}>
            Note:  <br />
            User above can't be modified (Update, Delete)
          </h2>

          <hr />


        </fieldset>

        <br style={{marginBottom:"10em"}} />


        <div style={{textAlign:"center"}}>

          <Button color='primary' tag={Link} to="/login" >Try the System</Button>
        </div>
        {/* <Button  color="link"><Link to="/login">Login</Link></Button> */}

      </Container>
    </div>
  );
}

export default LandingPage;