"use client"

import { useEffect, useState } from "react"
import "../../styles/modules/events.css"

const EventsModule = () => {
  const [events, setEvents] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editEventId, setEditEventId] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
  })
  const [files, setFiles] = useState([])
  useEffect(() => {
    fetch("https://lnctworld.onrender.com/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEvents(data.data)
      })
      .catch((err) => console.error("Failed to fetch events:", err))
  }, [])

  // Submit event to backend
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("description", newEvent.description);
    if (files.length > 0) formData.append("image", files[0]);
  
    const isEdit = editEventId !== null;
  
    try {
      const response = await fetch(
        `https://lnctworld.onrender.com/api/events${isEdit ? `/${editEventId}` : ""}`,
        {
          method: isEdit ? "PUT" : "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      if (data.success) {
        if (isEdit) {
          setEvents(events.map(ev => ev.id === editEventId ? { ...ev, ...newEvent } : ev));
        } else {
          setEvents([...events, data.data]);
        }
        setShowAddForm(false);
        setNewEvent({ title: "", description: "" });
        setFiles([]);
        setEditEventId(null);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Error submitting event");
    }
  };  
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
  
    try {
      const res = await fetch(`https://lnctworld.onrender.com/api/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEvents(events.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete event");
    }
  };  
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
              <h2>{editEventId ? "Edit Event Report" : "Add Event Report"}</h2>
              <button className="close-btn" onClick={() => {
                setShowAddForm(false);
                setEditEventId(null);
                setNewEvent({ title: "", description: "" });
                setFiles([]);
              }}>
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
            
                <div
                  className="drag-drop-area"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFiles = Array.from(e.dataTransfer.files);
                    const imageUrls = droppedFiles.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setFiles(droppedFiles);
                    setNewEvent({ ...newEvent, images: imageUrls });
                  }}
                  onClick={() => document.getElementById("image-upload").click()}
                >
                  <p>📂 Drag & drop or click to select an image</p>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
                
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
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditEventId(null);
                    setNewEvent({ title: "", description: "" });
                    setFiles([]);
                  }}
                >
                  Cancel
                </button>
                <button type="submit">{editEventId ? "Update" : "Submit"}</button>
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
            src={`https://lnctworld.onrender.com/api/event/image/${event.id}`}
            alt={event.title}
            style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
          <div className="card-actions">
            <button  className="edit-btn" onClick={() => {
              setEditEventId(event.id)
              setNewEvent({ title: event.title, description: event.description })
              setShowAddForm(true)
            }}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        </div>        
        ))}
      </div>
    </div>
  )
}

export default EventsModule
