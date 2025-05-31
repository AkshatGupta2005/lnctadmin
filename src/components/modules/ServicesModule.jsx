"use client"

import { useState } from "react"
import "../../styles/modules/services.css"

const ServicesModule = ({ user }) => {
  const [services, setServices] = useState({
    "colleges-universities": {
      name: "Colleges & Universities",
      icon: "🎓",
      description: "Educational institutions and higher learning centers",
      institutions: [
        {
          id: 1,
          name: "LNCT Bhopal",
          type: "Engineering College",
          location: "Bhopal, MP",
          clients: 15,
          projects: 8,
          status: "active",
          departments: [
            { id: 1, name: "Computer Science", students: 500, faculty: 25, projects: 3 },
            { id: 2, name: "Mechanical Engineering", students: 400, faculty: 20, projects: 2 },
            { id: 3, name: "Civil Engineering", students: 350, faculty: 18, projects: 2 },
            { id: 4, name: "Electronics & Communication", students: 450, faculty: 22, projects: 1 },
          ],
        },
        {
          id: 2,
          name: "JNCT Jabalpur",
          type: "Engineering College",
          location: "Jabalpur, MP",
          clients: 12,
          projects: 6,
          status: "active",
          departments: [
            { id: 1, name: "Information Technology", students: 300, faculty: 15, projects: 2 },
            { id: 2, name: "Electrical Engineering", students: 250, faculty: 12, projects: 2 },
            { id: 3, name: "Chemical Engineering", students: 200, faculty: 10, projects: 1 },
            { id: 4, name: "Biotechnology", students: 150, faculty: 8, projects: 1 },
          ],
        },
        {
          id: 3,
          name: "LNCTU University",
          type: "University",
          location: "Bhopal, MP",
          clients: 8,
          projects: 4,
          status: "active",
          departments: [
            { id: 1, name: "School of Engineering", students: 800, faculty: 40, projects: 2 },
            { id: 2, name: "School of Management", students: 300, faculty: 15, projects: 1 },
            { id: 3, name: "School of Pharmacy", students: 200, faculty: 12, projects: 1 },
          ],
        },
      ],
    },
    schools: {
      name: "Schools",
      icon: "🏫",
      description: "Primary and secondary educational institutions",
      institutions: [
        {
          id: 1,
          name: "DPS Bhopal",
          type: "CBSE School",
          location: "Bhopal, MP",
          clients: 20,
          projects: 12,
          status: "active",
          departments: [
            { id: 1, name: "Primary Section", students: 400, faculty: 20, projects: 3 },
            { id: 2, name: "Middle Section", students: 350, faculty: 18, projects: 3 },
            { id: 3, name: "Senior Section", students: 300, faculty: 15, projects: 3 },
            { id: 4, name: "Administration", students: 0, faculty: 10, projects: 3 },
          ],
        },
        {
          id: 2,
          name: "Kendriya Vidyalaya No. 1",
          type: "Central Government School",
          location: "Bhopal, MP",
          clients: 18,
          projects: 10,
          status: "active",
          departments: [
            { id: 1, name: "Primary Wing", students: 300, faculty: 15, projects: 3 },
            { id: 2, name: "Secondary Wing", students: 250, faculty: 12, projects: 3 },
            { id: 3, name: "Senior Secondary", students: 200, faculty: 10, projects: 2 },
            { id: 4, name: "Sports & Activities", students: 0, faculty: 5, projects: 2 },
          ],
        },
      ],
    },
  })

  const [selectedService, setSelectedService] = useState(null)
  const [selectedInstitution, setSelectedInstitution] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [showAddInstitution, setShowAddInstitution] = useState(false)
  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [newInstitution, setNewInstitution] = useState({
    name: "",
    type: "",
    location: "",
    clients: 0,
    projects: 0,
  })
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    students: 0,
    faculty: 0,
    projects: 0,
  })
  const [showAddSubcategory, setShowAddSubcategory] = useState(false)
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    clients: 0,
    projects: 0,
  })

  const handleAddSubcategory = (e) => {
    e.preventDefault()
    if (!selectedService) return

    const subcategory = {
      id: Date.now(),
      ...newSubcategory,
      status: "active",
    }

    setServices((prev) => ({
      ...prev,
      [selectedService]: {
        ...prev[selectedService],
        subcategories: [...prev[selectedService].subcategories, subcategory],
      },
    }))

    setNewSubcategory({ name: "", clients: 0, projects: 0 })
    setShowAddSubcategory(false)
  }

  const deleteSubcategory = (serviceKey, subcategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      setServices((prev) => ({
        ...prev,
        [serviceKey]: {
          ...prev[serviceKey],
          subcategories: prev[serviceKey].subcategories.filter((sub) => sub.id !== subcategoryId),
        },
      }))
    }
  }

  return (
    <div className="services-module">
      <div className="module-header">
        <h1>Services Management</h1>
        <p>Manage service categories and client relationships</p>
      </div>

      <div className="services-grid">
        {Object.entries(services).map(([key, service]) => (
          <div key={key} className="service-card">
            <div className="service-header">
              <div className="service-icon">{service.icon}</div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </div>
            <div className="service-stats">
              <div className="stat-item">
                <span className="stat-value">
                  {service.institutions?.reduce((sum, inst) => sum + inst.clients, 0) || 0}
                </span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {service.institutions?.reduce((sum, inst) => sum + inst.projects, 0) || 0}
                </span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{service.institutions?.length || 0}</span>
                <span className="stat-label">Institutions</span>
              </div>
            </div>
            <button className="manage-btn" onClick={() => setSelectedService(key)}>
              Manage Institutions
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>{services[selectedService].name} - Institutions</h2>
              <button className="close-btn" onClick={() => setSelectedService(null)}>
                ×
              </button>
            </div>
            <div className="institutions-content">
              <div className="institutions-header">
                <p>{services[selectedService].description}</p>
                <button className="add-institution-btn" onClick={() => setShowAddInstitution(true)}>
                  + Add Institution
                </button>
              </div>
              <div className="institutions-grid">
                {services[selectedService].institutions?.map((institution) => (
                  <div key={institution.id} className="institution-card">
                    <div className="institution-header">
                      <h3>{institution.name}</h3>
                      <span className={`status-badge ${institution.status}`}>{institution.status}</span>
                    </div>
                    <div className="institution-details">
                      <p>
                        <strong>Type:</strong> {institution.type}
                      </p>
                      <p>
                        <strong>Location:</strong> {institution.location}
                      </p>
                      <div className="institution-stats">
                        <span>{institution.clients} Clients</span>
                        <span>{institution.projects} Projects</span>
                        <span>{institution.departments?.length || 0} Departments</span>
                      </div>
                    </div>
                    <button className="manage-departments-btn" onClick={() => setSelectedInstitution(institution)}>
                      Manage Departments
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedInstitution && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>{selectedInstitution.name} - Departments</h2>
              <button className="close-btn" onClick={() => setSelectedInstitution(null)}>
                ×
              </button>
            </div>
            <div className="departments-content">
              <div className="departments-header">
                <div className="institution-info">
                  <h3>{selectedInstitution.name}</h3>
                  <p>
                    {selectedInstitution.type} • {selectedInstitution.location}
                  </p>
                </div>
                <button className="add-department-btn" onClick={() => setShowAddDepartment(true)}>
                  + Add Department
                </button>
              </div>
              <div className="departments-table-container">
                <table className="departments-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Students</th>
                      <th>Faculty</th>
                      <th>Projects</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInstitution.departments?.map((department) => (
                      <tr key={department.id}>
                        <td>
                          <div className="department-name">{department.name}</div>
                        </td>
                        <td>
                          <span className="student-count">{department.students}</span>
                        </td>
                        <td>
                          <span className="faculty-count">{department.faculty}</span>
                        </td>
                        <td>
                          <span className="project-count">{department.projects}</span>
                        </td>
                        <td>
                          <div className="department-actions">
                            <button className="action-btn edit">✏️</button>
                            <button className="action-btn delete">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddSubcategory && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Subcategory</h2>
              <button className="close-btn" onClick={() => setShowAddSubcategory(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddSubcategory} className="subcategory-form">
              <div className="form-group">
                <label>Subcategory Name</label>
                <input
                  type="text"
                  value={newSubcategory.name}
                  onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Number of Clients</label>
                  <input
                    type="number"
                    value={newSubcategory.clients}
                    onChange={(e) =>
                      setNewSubcategory({ ...newSubcategory, clients: Number.parseInt(e.target.value) || 0 })
                    }
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Projects</label>
                  <input
                    type="number"
                    value={newSubcategory.projects}
                    onChange={(e) =>
                      setNewSubcategory({ ...newSubcategory, projects: Number.parseInt(e.target.value) || 0 })
                    }
                    min="0"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddSubcategory(false)}>
                  Cancel
                </button>
                <button type="submit">Add Subcategory</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesModule
