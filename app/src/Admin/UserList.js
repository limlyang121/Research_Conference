import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { getAllUsers, removeUser } from './adminAxios';
import jwt_decode from "jwt-decode"

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
        let response = await getAllUsers();
        setUsers(response)

    }

    setLoading(false)
    fecthData();

    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString)

    // const base64Url  = (token.jwt).split(".")[1]
    
    // const base64 = base64Url.replace('-', '+').replace('_', '/');
    // alert( JSON.parse(window.atob(base64)).Role );
    const decode = jwt_decode(token.jwt)
    const roles = decode.role.map((r) => r.role)

  }, []);

  const remove = async (id) => {
    if (window.confirm("Delete? ")) {
      await removeUser(id)
        .then(() => {
          let updatedGroups = [...users].filter(i => i.id !== id);
          setUsers(updatedGroups);
        });
    }
  }



  const groupList = users.map(user => {
    return (
      <tr key={user.id}>
        {/* Current no session yet, Hard code for now */}
        {user.id === 1 ? (
          <></>
        ) : (
          <>
          <td style={{ whiteSpace: 'nowrap' }}>{user.userdetails.firstName}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{user.userdetails.lastName}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{user.userName}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="info" tag={Link} to={"/users/read/" + user.id}>Read</Button>
              <Button size="sm" color="primary" tag={Link} to={"/users/form/" + user.id}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => remove(user.id)}>Delete</Button>
            </ButtonGroup>
          </td>
          </>
        )}
      </tr>
    )
  });

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/users/form/new">Add User</Button>
        </div>
        <h3>My Users</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="20%">First Name</th>
              <th width="20%">Last  Name</th>
              <th width="20%">UserName</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserList;