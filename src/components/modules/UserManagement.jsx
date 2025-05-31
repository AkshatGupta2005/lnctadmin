"use client"

import { useState } from "react"
import "../../styles/modules/user-management.css"

const UserManagement = ({ user }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      name: "Admin User",
      role: "admin",
      email: "admin@akshatgupta.space",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      username: "head1",
      name: "Head User",
      role: "head",
      email: "head@akshatgupta.space",
      status: "active",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      username: "manager1",
      name: "Manager User",
      role: "manager",
      email: "manager@akshatgupta.space",
      status: "active",
      lastLogin: "2024-01-13",
    },
    {
      id: 4,
      username: "editor1",
      name: "Editor User",
      role: "editor",
      email: "editor@akshatgupta.space",
      status: "active",
      lastLogin: "2024-01-12",
    },
    {
      id: 5,
      username: "coord1",
      name: "Coordinator User",
      role: "coordinator",
      email: "coord@akshatgupta.space",
      status: "inactive",
      lastLogin: "2024-01-10",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    email: "",
    role: "coordinator",
    password: "",
  })

  const roles = [
    {
      id: "admin",
      name: "Administrator",
      description: "Full system access with all permissions",
      permissions: ["All Modules", "User Management", "System Settings"],
      color: "#ff6b6b",
    },
    {
      id: "head",
      name: "Department Head",
      description: "Limited administrative access to assigned modules",
      permissions: ["Events", "Timeline", "Assigned Services"],
      color: "#4ecdc4",
    },
    {
      id: "manager",
      name: "Manager",
      description: "Operational management of specific areas",
      permissions: ["Events", "Services", "Timeline"],
      color: "#45b7d1",
    },
    {
      id: "editor",
      name: "Content Editor",
      description: "Content creation and editing capabilities",
      permissions: ["Website Editor", "Events"],
      color: "#96ceb4",
    },
    {
      id: "coordinator",
      name: "Event Coordinator",
      description: "Event management and coordination",
      permissions: ["Events Only"],
      color: "#feca57",
    },
  ]

  const handleAddUser = (e) => {
    e.preventDefault()
    const userToAdd = {
      id: Date.now(),
      ...newUser,
      status: "active",
      lastLogin: "Never",
    }
    setUsers([...users, userToAdd])
    setNewUser({
      username: "",
      name: "",
      email: "",
      role: "coordinator",
      password: "",
    })
    setShowAddForm(false)
  }

  const toggleUserStatus = (userId) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
  }

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  const getRoleInfo = (roleId) => {
    return roles.find((r) => r.id === roleId) || roles[4]
  }

  return (
    <div className="user-management">
      <div className="module-header">
        <h1>User Management</h1>
        <p>Manage users, roles, and permissions</p>
        {user.role === "admin" && (
          <button className="add-user-btn" onClick={() => setShowAddForm(true)}>
            + Add New User
          </button>
        )}
      </div>

      <div className="roles-overview">
        <h2>Role Definitions</h2>
        <div className="roles-grid">
          {roles.map((role) => (
            <div key={role.id} className="role-card">
              <div className="role-header">
                <div className="role-badge" style={{ backgroundColor: role.color }}>
                  {role.name}
                </div>
              </div>
              <p className="role-description">{role.description}</p>
              <div className="role-permissions">
                <strong>Permissions:</strong>
                <ul>
                  {role.permissions.map((permission, index) => (
                    <li key={index}>{permission}</li>
                  ))}
                </ul>
              </div>
              <div className="role-stats">{users.filter((u) => u.role === role.id).length} users</div>
            </div>
          ))}
        </div>
      </div>

      <div className="users-section">
        <h2>User List</h2>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem) => {
                const roleInfo = getRoleInfo(userItem.role)
                return (
                  <tr key={userItem.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">{userItem.name.charAt(0).toUpperCase()}</div>
                        <div className="user-details">
                          <div className="user-name">{userItem.name}</div>
                          <div className="user-email">{userItem.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-badge small" style={{ backgroundColor: roleInfo.color }}>
                        {roleInfo.name}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${userItem.status}`}>{userItem.status}</span>
                    </td>
                    <td>{userItem.lastLogin}</td>
                    <td>
                      <div className="user-actions">
                        <button className="action-btn view" onClick={() => setSelectedUser(userItem)}>
                          👁️
                        </button>
                        {user.role === "admin" && (
                          <>
                            <button className="action-btn edit" onClick={() => toggleUserStatus(userItem.id)}>
                              {userItem.status === "active" ? "⏸️" : "▶️"}
                            </button>
                            <button className="action-btn delete" onClick={() => deleteUser(userItem.id)}>
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddUser} className="user-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  required
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit">Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>
                ×
              </button>
            </div>
            <div className="user-details-modal">
              <div className="user-profile">
                <div className="user-avatar large">{selectedUser.name.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                  <h3>{selectedUser.name}</h3>
                  <p>{selectedUser.email}</p>
                  <div className="role-badge" style={{ backgroundColor: getRoleInfo(selectedUser.role).color }}>
                    {getRoleInfo(selectedUser.role).name}
                  </div>
                </div>
              </div>

              <div className="user-stats">
                <div className="stat-item">
                  <strong>Username:</strong> {selectedUser.username}
                </div>
                <div className="stat-item">
                  <strong>Status:</strong>
                  <span className={`status-badge ${selectedUser.status}`}>{selectedUser.status}</span>
                </div>
                <div className="stat-item">
                  <strong>Last Login:</strong> {selectedUser.lastLogin}
                </div>
              </div>

              <div className="permissions-section">
                <h4>Role Permissions</h4>
                <ul className="permissions-list">
                  {getRoleInfo(selectedUser.role).permissions.map((permission, index) => (
                    <li key={index}>✓ {permission}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
