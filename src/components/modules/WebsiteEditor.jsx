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
    { id: "hero", name: "Hero Section", icon: <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 800" width="22px" fill="#1E124A"><path d="M264-216h96v-240h240v240h96v-348L480-726 264-564v348Zm-72 72v-456l288-216 288 216v456H528v-240h-96v240H192Zm288-327Z"/></svg> },
    { id: "whatWeOffer", name: "What We Offer", icon: <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 800" width="20px" fill="#1E124A"><path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-72q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-72q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm-.21-96Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Z"/></svg> },
    { id: "events", name: "Events", icon: <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 800" width="20px" fill="#1E124A"><path d="M216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Zm264.21 216q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm-156 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm312 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm-156 144q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm-156 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm312 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Z"/></svg> },
    { id: "visionary", name: "Visionary", icon: <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 800" width="20px" fill="#1E124A"><path d="m391-415 34-110-89-70h109l35-108 35 108h109l-89 70 34 110-89-68-89 68ZM263-48v-280q-43-37-69-99t-26-125q0-130 91-221t221-91q130 0 221 91t91 221q0 64-24 125.5T696-327v279L480-96 263-48Zm217-264q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM335-138l145-32 144 32v-138q-33 18-69.5 27t-74.5 9q-38 0-75-8.5T335-276v138Zm145-70Z"/></svg> },
    { id: "timeline", name: "Timeline", icon: <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 800" width="20px" fill="#1E124A"><path d="M240-288h192v-72H240v72Zm144-156h192v-72H384v72Zm144-156h192v-72H528v72ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z"/></svg> },
    { id: "location", name: "Location", icon: <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 800" width="20px" fill="#1E124A"><path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.03-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg> },
    { id: "contact", name: "Contact", icon: <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 800" width="20px" fill="#1E124A"><path d="M763-145q-121-9-229.5-59.5T339-341q-86-86-135.5-194T144-764q-2-21 12.29-36.5Q170.57-816 192-816h136q17 0 29.5 10.5T374-779l24 106q2 13-1.5 25T385-628l-97 98q20 38 46 73t57.97 65.98Q422-361 456-335.5q34 25.5 72 45.5l99-96q8-8 20-11.5t25-1.5l107 23q17 5 27 17.5t10 29.5v136q0 21.43-16 35.71Q784-143 763-145ZM255-600l70-70-17.16-74H218q5 38 14 73.5t23 70.5Zm344 344q35.1 14.24 71.55 22.62Q707-225 744-220v-90l-75-16-70 70ZM255-600Zm344 344Z"/></svg> },
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
          <button className="preview-btn"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 1090 530" width="20px" fill="#000000"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg>Preview</button>
          <button className="save-btn"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 600" width="20px" fill="#F3F3F3"><path d="M816-672v456q0 29.7-21.15 50.85Q773.7-144 744-144H216q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h456l144 144Zm-72 30L642-744H216v528h528v-426ZM480-252q45 0 76.5-31.5T588-360q0-45-31.5-76.5T480-468q-45 0-76.5 31.5T372-360q0 45 31.5 76.5T480-252ZM264-552h336v-144H264v144Zm-48-77v413-528 115Z"/></svg> Save Changes</button>
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
