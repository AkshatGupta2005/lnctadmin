"use client"

import { useEffect, useState } from "react"
import "../../styles/modules/events.css"

const EventsModule = () => {
  const [events, setEvents] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
  })
  const [files, setFiles] = useState([])

  // Load events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEvents(data.data)
      })
      .catch((err) => console.error("Failed to fetch events:", err))
  }, [])

  // Submit event to backend
  const handleAddEvent = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", newEvent.title)
    formData.append("description", newEvent.description)
    if (files.length > 0) formData.append("image", files[0]) // single image

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setEvents([...events, data.data])
        setShowAddForm(false)
        setNewEvent({ title: "", description: "" })
        setFiles([])
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      console.error("Error submitting event:", error)
      alert("Error submitting event")
    }
  }

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file))
    setFiles(selectedFiles)
    setNewEvent({ ...newEvent, images: imageUrls }) // store preview URLs
  }

  const removeImage = () => {
    setFiles([])
    setNewEvent({ ...newEvent, images: [] })
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

      {/* Add Event Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Event Report</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                ×
              </button>
            </div>
            <form
              onSubmit={handleAddEvent}
              className="event-form"
              encType="multipart/form-data"
            >
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
                <label>Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Event Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {newEvent.images && newEvent.images.length > 0 && (
                  <div className="image-preview-grid">
                    {newEvent.images.map((img, index) => (
                      <div key={index} className="image-preview">
                        <img src={img} alt={`Preview ${index}`} />
                        <button type="button" onClick={removeImage}>
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
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Cards */}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <img
              src={`http://localhost:5000/api/event/image/${event.id}`}
              alt={event.title}
              style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsModule
