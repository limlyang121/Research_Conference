import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { deactivationAccount, getAllNonActiveUsers, getAllUsers, activateAccountAPI } from './adminAxios';
import AdminSecurity from './AdminSecurity';
import { NoDataToDisplay } from '../General/GeneralDisplay';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("active");
  const myID = sessionStorage.getItem("id")
  const [loading, setLoading] = useState(true);

  const changeList = useCallback((stat) => {
    setStatus(stat)
  }, [setStatus])

  useEffect(() => {
    const fecthDataActive = async () => {
      let response = await getAllUsers();
      setUsers(response)
    }

    const fecthDataNonActive = async () => {
      let response = await getAllNonActiveUsers()
      setUsers(response)
    }

    if (status === "active") {
      fecthDataActive()
    } else {
      fecthDataNonActive()
    }

    setLoading(false)


  }, [status, changeList]);


  const deactiveAccount = async (id) => {
    if (window.confirm("Are you sure? ")) {
      try {
        const responseData = await deactivationAccount(id);
        alert(responseData);
        let updatedGroups = [...users].filter(i => i.id !== id);
        setUsers(updatedGroups);
      } catch (error) {
        alert(JSON.stringify(error.response.data.message))
      }
    }
  }

  const activateAccount = async (id) => {
    if (window.confirm("Are you sure? ")) {
      await activateAccountAPI(id)
        .then((responseData) => {
          alert(responseData)
          let updatedGroups = [...users].filter(i => i.id !== id);
          setUsers(updatedGroups)
        })
    }
  }

  const activeAction = (user) => {
    return (
      <ButtonGroup>
        <Button size="sm" color="info" tag={Link} to={"/admin/users/read/" + user.id}>Read</Button>
        <Button size="sm" color="primary" tag={Link} to={"/admin/users/form/" + user.id}>Edit</Button>
        <Button size="sm" color="warning" onClick={async () => deactiveAccount(user.id)}>Deactive</Button>
      </ButtonGroup>
    )
  }

  const deactiveAction = (user) => {
    return (
      <ButtonGroup>
        <Button size="sm" color="primary" onClick={async () => activateAccount(user.id)}>Activation</Button>
      </ButtonGroup>
    )
  }

  const groupList = users.map(user => {
    return (
      <tr key={user.id}>
        {user.id === parseInt(myID)  ? (
          <></>
        ) : (
          <>
            <td style={{ whiteSpace: 'nowrap' }}>{user.userdetails.firstName}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.userdetails.lastName}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.userName}</td>
            <td>
              {status === "active" && activeAction(user)}

              {status === "nonactive" && deactiveAction(user)}

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
      <AdminSecurity />
      <AppNavbar />

      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/admin/users/form/new">Add User</Button>
        </div>
        <h3>My Users</h3>

        <ButtonGroup style={{ gap: "10px" }}>
          <Button color='primary' onClick={() => changeList("active")} >Show Active</Button>
          <Button color='danger' onClick={() => changeList("nonactive")}>Show Deactive</Button>
        </ButtonGroup>

        {groupList.length === 0 ? (
          <NoDataToDisplay />
        ) : (

          <Table striped bordered hover className="mt-4">
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
        )}


      </Container>
    </div>
  );
};

export default UserList;