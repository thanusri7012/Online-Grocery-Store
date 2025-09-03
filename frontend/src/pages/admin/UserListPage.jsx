import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/axiosConfig';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await apiClient.get('/users', config);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    if (userInfo && userInfo.isAdmin) {
      fetchUsers();
    }
  }, [userInfo]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await apiClient.delete(`/users/${id}`, config);
        // Refetch users after deletion
        const { data } = await apiClient.get('/users', config);
        setUsers(data);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h1>Users</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: 'green' }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(user._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListPage;