"use client"

import { useState } from "react"
import "../../styles/modules/events.css"

const EventsModule = ({ user }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-01-15",
      location: "LNCT Bhopal",
      attendees: 250,
      status: "completed",
      description: "Annual technology conference with industry experts",
      images: [],
    },
    {
      id: 2,
      title: "Workshop on AI",
      date: "2024-01-20",
      location: "JNCT Campus",
      attendees: 150,
      status: "completed",
      description: "Hands-on workshop on artificial intelligence",
      images: [],
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    attendees: "",
    description: "",
    images: [],
  })

  const [editingEvent, setEditingEvent] = useState(null)

  const handleAddEvent = (e) => {
    e.preventDefault()
    const event = {
      id: Date.now(),
      ...newEvent,
      status: "completed",
      attendees: Number.parseInt(newEvent.attendees),
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      location: "",
      attendees: "",
      description: "",
      images: [],
    })
    setShowAddForm(false)
  }

  const handleEditEvent = (e) => {
    e.preventDefault()
    const updatedEvents = events.map((event) => (event.id === editingEvent.id ? { ...editingEvent } : event))
    setEvents(updatedEvents)
    setEditingEvent(null)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setNewEvent({
      ...newEvent,
      images: [...newEvent.images, ...imageUrls],
    })
  }

  const removeImage = (index) => {
    const updatedImages = newEvent.images.filter((_, i) => i !== index)
    setNewEvent({ ...newEvent, images: updatedImages })
  }

  return (
    <div className="events-module">
      <div className="module-header">
        <h1>Events Management</h1>
        <p>Manage completed events and upload reports</p>
        <button className="add-event-btn" onClick={() => setShowAddForm(true)}>
          + Add Event Report
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Event Report</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Attendees</label>
                  <input
                    type="number"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Event Images</label>
                <div className="image-upload-area">
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} id="image-upload" />
                  <label htmlFor="image-upload" className="upload-label">
                    📷 Click to upload images or drag and drop
                  </label>
                </div>

                {newEvent.images.length > 0 && (
                  <div className="image-preview-grid">
                    {newEvent.images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image || "/placeholder.svg"} alt={`Preview ${index + 1}`} />
                        <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Event</h2>
              <button className="close-btn" onClick={() => setEditingEvent(null)}>
                ×
              </button>
            </div>
            <form onSubmit={handleEditEvent} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Attendees</label>
                  <input
                    type="number"
                    value={editingEvent.attendees}
                    onChange={(e) => setEditingEvent({ ...editingEvent, attendees: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setEditingEvent(null)}>
                  Cancel
                </button>
                <button type="submit">Update Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h3>{event.title}</h3>
              <span className="event-status completed">Completed</span>
            </div>
            <div className="event-details">
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>{event.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👥</span>
                <span>{event.attendees} attendees</span>
              </div>
            </div>
            <p className="event-description">{event.description}</p>
            {event.images.length > 0 && (
              <div className="event-images">
                <span className="images-count">📷 {event.images.length} images</span>
              </div>
            )}
            <div className="event-actions">
              <button onClick={() => setSelectedEvent(event)}>View Details</button>
              <button onClick={() => setEditingEvent(event)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="close-btn" onClick={() => setSelectedEvent(null)}>
                ×
              </button>
            </div>
            <div className="event-details-modal">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> {selectedEvent.location}
                </div>
                <div className="detail-item">
                  <strong>Attendees:</strong> {selectedEvent.attendees}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> {selectedEvent.status}
                </div>
              </div>
              <div className="description-section">
                <strong>Description:</strong>
                <p>{selectedEvent.description}</p>
              </div>
              {selectedEvent.images.length > 0 && (
                <div className="images-section">
                  <strong>Event Images:</strong>
                  <div className="image-gallery">
                    {selectedEvent.images.map((image, index) => (
                      <img key={index} src={image || "/placeholder.svg"} alt={`Event ${index + 1}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsModule
