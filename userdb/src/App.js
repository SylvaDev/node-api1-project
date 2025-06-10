import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', bio: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value
      });
    }
  };

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        setNewUser({ name: '', bio: '' });
        fetchUsers();
      }
    } catch (err) {
      setError('Failed to add user');
    }
  };

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingUser.name,
          bio: editingUser.bio
        }),
      });
      if (response.ok) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err) {
      setError('Failed to update user');
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="App">
      <h1>User Database</h1>
      
      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="user-form">
        <h2>Add New User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={newUser.bio}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Edit User Form */}
      {editingUser && (
        <form onSubmit={handleEditSubmit} className="user-form edit-form">
          <h2>Edit User</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={editingUser.bio}
            onChange={handleChange}
            required
          />
          <div className="button-group">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Users List */}
      <div className="users-list">
        <h2>Users</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.bio}</td>
                  <td>
                    <button 
                      onClick={() => handleEditClick(user)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
