// @flow strict

import * as React from 'react';
import { getAllRoles } from '../Admin/adminAxios'
import AppNavbar from '../Navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';


function ProfileList() {
    const [role, setRoles] = React.useState([]);
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchRole = async () => {
            let response = await getAllRoles();
            setRoles(response)
        }

        setLoading(false)
        fetchRole()
    }, [])

    const remove = async (id) => {
        // if (window.confirm("Delete? ")) {
        //   await removeUser(id)
        //     .then(() => {
        //       let updatedGroups = [...users].filter(i => i.id !== id);
        //       setUsers(updatedGroups);
        //     });
        // }
      }

    const roleList = role.map(role => {
        return (
            <tr key={role.role}>
                <td style={{ whiteSpace: 'nowrap' }}>{role.role}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{role.desc}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="info" tag={Link} to={"#"}>Read</Button>
                        <Button size="sm" color="primary" tag={Link} to={"#"}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => remove(3)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>

        )
    })

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/users/form/new">Add Profile</Button>
                </div>
                <h3>My Profile</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%" className='col-sm 4'>Role Name</th>
                            <th width="60%">Role Descritpion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleList}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};

export default ProfileList;
