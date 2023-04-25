import React from 'react';
import './App.css';
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

        <fieldset style={{ border: "1px black" }}>
          <legend style={{ textAlign: "center", marginBottom: "50px" }}>
            <h1>
              Register And Edit User
            </h1>
          </legend>

          <Container style={{ width: "70%" }}  >
            <h2 style={{ textAlign: "center" }}>
              1. Only Admin can Register a new User <br/>
              2. Only Admin can Edit other user Profile
            </h2>

          </Container>

          <hr />


        </fieldset>


        <div style={{ textAlign: "center" }}>

          <Button color='primary' tag={Link} to="/login" >Try the System</Button>
        </div>

        <br style={{ marginBottom: "10px" }} />


      </Container>
    </div>
  );
}

export default LandingPage;