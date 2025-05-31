"use client"

import { useState } from "react"
import "../../styles/modules/website-editor.css"

const WebsiteEditor = ({ user }) => {
  const [activeSection, setActiveSection] = useState("hero")
  const [sections, setSections] = useState({
    hero: {
      title: "Welcome to AkshatGupta.space",
      subtitle: "Innovative Solutions for Educational Excellence",
      description: "Transforming education through technology and innovation",
      buttonText: "Get Started",
      backgroundImage: "",
    },
    whatWeOffer: {
      title: "What We Offer",
      subtitle: "Comprehensive Educational Solutions",
      services: [
        { title: "Digital Learning Platforms", description: "Modern e-learning solutions" },
        { title: "Campus Management", description: "Complete campus automation" },
        { title: "Student Information Systems", description: "Streamlined student management" },
      ],
    },
    events: {
      title: "Our Events",
      subtitle: "Connecting Communities Through Innovation",
      description: "Join us for workshops, conferences, and networking events",
    },
    visionary: {
      title: "Our Vision",
      subtitle: "Shaping the Future of Education",
      description: "We envision a world where technology enhances learning experiences",
      quote: "Education is the most powerful weapon which you can use to change the world.",
    },
    timeline: {
      title: "Our Journey",
      subtitle: "Milestones and Achievements",
      description: "Track our progress and growth over the years",
    },
    location: {
      title: "Our Location",
      subtitle: "Find Us Here",
      address: "LNCT Campus, Bhopal, Madhya Pradesh",
      phone: "+91 12345 67890",
      email: "contact@akshatgupta.space",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in Touch",
      description: "Ready to transform your educational experience? Contact us today.",
      formFields: ["name", "email", "phone", "message"],
    },
  })

  const sectionTabs = [
    { id: "hero", name: "Hero Section", icon: "🏠" },
    { id: "whatWeOffer", name: "What We Offer", icon: "🎯" },
    { id: "events", name: "Events", icon: "📅" },
    { id: "visionary", name: "Visionary", icon: "🔮" },
    { id: "timeline", name: "Timeline", icon: "⏰" },
    { id: "location", name: "Location", icon: "📍" },
    { id: "contact", name: "Contact", icon: "📞" },
  ]

  const updateSection = (sectionId, field, value) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value,
      },
    }))
  }

  const renderSectionEditor = () => {
    const section = sections[activeSection]

    switch (activeSection) {
      case "hero":
        return (
          <div className="section-editor">
            <h3>Hero Section Editor</h3>
            <div className="form-group">
              <label>Main Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection("hero", "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={section.subtitle}
                onChange={(e) => updateSection("hero", "subtitle", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={section.description}
                onChange={(e) => updateSection("hero", "description", e.target.value)}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                value={section.buttonText}
                onChange={(e) => updateSection("hero", "buttonText", e.target.value)}
              />
            </div>
          </div>
        )

      case "whatWeOffer":
        return (
          <div className="section-editor">
            <h3>What We Offer Editor</h3>
            <div className="form-group">
              <label>Section Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection("whatWeOffer", "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={section.subtitle}
                onChange={(e) => updateSection("whatWeOffer", "subtitle", e.target.value)}
              />
            </div>
            <div className="services-editor">
              <h4>Services</h4>
              {section.services.map((service, index) => (
                <div key={index} className="service-item">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...section.services]
                        newServices[index].title = e.target.value
                        updateSection("whatWeOffer", "services", newServices)
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...section.services]
                        newServices[index].description = e.target.value
                        updateSection("whatWeOffer", "services", newServices)
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                className="add-service-btn"
                onClick={() => {
                  const newServices = [...section.services, { title: "", description: "" }]
                  updateSection("whatWeOffer", "services", newServices)
                }}
              >
                + Add Service
              </button>
            </div>
          </div>
        )

      case "visionary":
        return (
          <div className="section-editor">
            <h3>Visionary Section Editor</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection("visionary", "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={section.subtitle}
                onChange={(e) => updateSection("visionary", "subtitle", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={section.description}
                onChange={(e) => updateSection("visionary", "description", e.target.value)}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Inspirational Quote</label>
              <textarea
                value={section.quote}
                onChange={(e) => updateSection("visionary", "quote", e.target.value)}
                rows="2"
              />
            </div>
          </div>
        )

      case "location":
        return (
          <div className="section-editor">
            <h3>Location Section Editor</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection("location", "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                value={section.address}
                onChange={(e) => updateSection("location", "address", e.target.value)}
                rows="2"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={section.phone}
                onChange={(e) => updateSection("location", "phone", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={section.email}
                onChange={(e) => updateSection("location", "email", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="section-editor">
            <h3>{sectionTabs.find((tab) => tab.id === activeSection)?.name} Editor</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(activeSection, "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={section.subtitle}
                onChange={(e) => updateSection(activeSection, "subtitle", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={section.description}
                onChange={(e) => updateSection(activeSection, "description", e.target.value)}
                rows="4"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="website-editor">
      <div className="module-header">
        <h1>Website Editor</h1>
        <p>Edit and manage website content sections</p>
        <div className="editor-actions">
          <button className="preview-btn">👁️ Preview</button>
          <button className="save-btn">💾 Save Changes</button>
        </div>
      </div>

      <div className="editor-container">
        <div className="section-tabs">
          {sectionTabs.map((tab) => (
            <button
              key={tab.id}
              className={`section-tab ${activeSection === tab.id ? "active" : ""}`}
              onClick={() => setActiveSection(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="editor-content">
          <div className="editor-panel">{renderSectionEditor()}</div>

          <div className="preview-panel">
            <h3>Live Preview</h3>
            <div className="preview-content">
              <div className="preview-section">
                <h2>{sections[activeSection].title}</h2>
                {sections[activeSection].subtitle && <h3>{sections[activeSection].subtitle}</h3>}
                {sections[activeSection].description && <p>{sections[activeSection].description}</p>}
                {activeSection === "hero" && sections[activeSection].buttonText && (
                  <button className="preview-button">{sections[activeSection].buttonText}</button>
                )}
                {activeSection === "whatWeOffer" && (
                  <div className="services-preview">
                    {sections[activeSection].services.map((service, index) => (
                      <div key={index} className="service-preview">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeSection === "visionary" && sections[activeSection].quote && (
                  <blockquote className="quote-preview">"{sections[activeSection].quote}"</blockquote>
                )}
                {activeSection === "location" && (
                  <div className="location-preview">
                    <p>
                      <strong>Address:</strong> {sections[activeSection].address}
                    </p>
                    <p>
                      <strong>Phone:</strong> {sections[activeSection].phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {sections[activeSection].email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsiteEditor
