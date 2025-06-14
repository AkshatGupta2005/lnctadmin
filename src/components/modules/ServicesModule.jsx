"use client"

import React, { useState, useEffect, useCallback } from 'react';
// Create and import a corresponding CSS file for this component
// For example: import "./ServicesModule.css"; 
// Make sure to create this file in the same directory.

// API base URL - replace with your actual server URL
const API_URL = "http://localhost:5000/api";

// --- Helper Components ---

const Modal = ({ children, onClose, size = 'medium' }) => (
    <div className="modal-overlay">
        <div className={`modal ${size}`}>
            <div className="modal-header">
                <h2 className="modal-title">{/* Title is now part of children */}</h2>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </div>
    </div>
);

const ConfirmationModal = ({ onConfirm, onCancel, message }) => (
    <Modal onClose={onCancel} size="small">
        <p>{message}</p>
        <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
    </Modal>
);

// --- Main Component ---

const ServicesModule = () => {
    // --- State Declarations ---
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal and Form State
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    
    const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);
    const [managingService, setManagingService] = useState(null); // The service whose institutions we are managing
    const [institutions, setInstitutions] = useState([]);
    const [loadingInstitutions, setLoadingInstitutions] = useState(false);
    const [editingInstitution, setEditingInstitution] = useState(null);

    const [deleteTarget, setDeleteTarget] = useState(null);

    // --- Data Fetching ---

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/services`);
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setServices(result.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const fetchInstitutions = useCallback(async (service) => {
        if (!service || !service.link) return;
        setLoadingInstitutions(true);
        try {
            const response = await fetch(`${API_URL}/${service.link}`);
            const result = await response.json();
            setInstitutions(result.data || []);
        } catch (err) {
            console.error("Failed to fetch institutions:", err);
            setInstitutions([]);
        } finally {
            setLoadingInstitutions(false);
        }
    }, []);

    // --- Event Handlers & CRUD Functions ---

    const handleFileChange = (e, setData) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Get base64 string and remove the data URL prefix
                const base64String = reader.result.replace(/^data:.+;base64,/, '');
                setData(prev => ({ ...prev, image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    // -- Service CRUD --
    const openServiceModal = (service = null) => {
        setEditingService(service ? {...service} : { title: '', description: '', alt: '', link: '', image: null });
        setIsServiceModalOpen(true);
    };

    const handleSaveService = async (e) => {
        e.preventDefault();
        const method = editingService.id ? 'PUT' : 'POST';
        const url = editingService.id ? `${API_URL}/services/${editingService.id}` : `${API_URL}/services`;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingService)
            });
            if (!response.ok) throw new Error('Failed to save service');
            
            setIsServiceModalOpen(false);
            fetchServices(); // Refetch all services to update the list
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        const { type, data } = deleteTarget;
        
        const url = type === 'service' 
            ? `${API_URL}/services/${data.id}` 
            : `${API_URL}/${managingService.link}/${data.id}`;

        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Failed to delete ${type}`);
            
            if (type === 'service') {
                fetchServices();
            } else {
                fetchInstitutions(managingService);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setDeleteTarget(null);
        }
    };

    // -- Institution CRUD --
    const openInstitutionManager = (service) => {
        setManagingService(service);
        fetchInstitutions(service);
        setIsInstitutionModalOpen(true);
    };

    const openInstitutionModal = (institution = null) => {
        setEditingInstitution(institution ? {...institution} : { name: '', description: '', alt: '', courses: [], established: '', website: '', image: null });
    };
    
    const handleSaveInstitution = async (e) => {
        e.preventDefault();
        const method = editingInstitution.id ? 'PUT' : 'POST';
        const url = editingInstitution.id 
            ? `${API_URL}/${managingService.link}/${editingInstitution.id}` 
            : `${API_URL}/${managingService.link}`;
        
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editingInstitution,
                    // Convert comma-separated string back to array for the server
                    courses: Array.isArray(editingInstitution.courses) ? editingInstitution.courses : editingInstitution.courses.split(',').map(s => s.trim())
                })
            });
            if (!response.ok) throw new Error('Failed to save institution');
            
            setEditingInstitution(null); // Close form
            fetchInstitutions(managingService); // Refetch list
        } catch (err) {
            console.error(err);
        }
    };


    // --- Render Logic ---
    if (loading) return <p>Loading services...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="services-module-container">
            <div className="module-header">
                <h1>Services Dashboard</h1>
                <button className="btn btn-primary" onClick={() => openServiceModal()}>+ Add New Service</button>
            </div>

            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <img src={`${API_URL}/services/image/${service.id}`} alt={service.alt} className="service-card-image" onError={(e) => e.target.src='https://placehold.co/600x400/EEE/31343C?text=No+Image'} />
                        <div className="service-card-body">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-card-actions">
                                <button className="btn btn-secondary" onClick={() => openInstitutionManager(service)}>Manage</button>
                                <button className="btn-icon" onClick={() => openServiceModal(service)}>✏️</button>
                                <button className="btn-icon" onClick={() => setDeleteTarget({ type: 'service', data: service })}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Modals --- */}

            {isServiceModalOpen && (
                <Modal onClose={() => setIsServiceModalOpen(false)} size="medium">
                    <h2>{editingService.id ? 'Edit' : 'Add'} Service</h2>
                    <form onSubmit={handleSaveService} className="modal-form">
                        <input type="text" placeholder="Service Title" value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})} required />
                        <textarea placeholder="Description" value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})} required />
                        <input type="text" placeholder="Image Alt Text" value={editingService.alt} onChange={e => setEditingService({...editingService, alt: e.target.value})} />
                        <input type="text" placeholder="API Link (e.g., colleges)" value={editingService.link} onChange={e => setEditingService({...editingService, link: e.target.value})} required />
                        <label>Image</label>
                        <input type="file" accept="image/*" onChange={e => handleFileChange(e, setEditingService)} />
                        <div className="modal-actions">
                             <button type="button" className="btn btn-secondary" onClick={() => setIsServiceModalOpen(false)}>Cancel</button>
                             <button type="submit" className="btn btn-primary">Save Service</button>
                        </div>
                    </form>
                </Modal>
            )}

            {isInstitutionModalOpen && managingService && (
                <Modal onClose={() => setIsInstitutionModalOpen(false)} size="large">
                    <h2>Managing: {managingService.title}</h2>
                    <button className="btn btn-primary" onClick={() => openInstitutionModal()}>+ Add Institution</button>
                    <hr/>

                    {editingInstitution && (
                        <div className="sub-modal-form">
                            <h3>{editingInstitution.id ? 'Edit' : 'Add'} Institution</h3>
                             <form onSubmit={handleSaveInstitution}>
                                <input type="text" placeholder="Institution Name" value={editingInstitution.name} onChange={e => setEditingInstitution({...editingInstitution, name: e.target.value})} required />
                                <textarea placeholder="Description" value={editingInstitution.description} onChange={e => setEditingInstitution({...editingInstitution, description: e.target.value})} />
                                <input type="text" placeholder="Website URL" value={editingInstitution.website} onChange={e => setEditingInstitution({...editingInstitution, website: e.target.value})} />
                                <input type="text" placeholder="Year Established" value={editingInstitution.established} onChange={e => setEditingInstitution({...editingInstitution, established: e.target.value})} />
                                <input type="text" placeholder="Courses (comma-separated)" value={Array.isArray(editingInstitution.courses) ? editingInstitution.courses.join(', ') : ''} onChange={e => setEditingInstitution({...editingInstitution, courses: e.target.value})} />
                                <label>Image</label>
                                <input type="file" accept="image/*" onChange={e => handleFileChange(e, setEditingInstitution)} />
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditingInstitution(null)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Institution</button>
                                </div>
                            </form>
                            <hr/>
                        </div>
                    )}

                    {loadingInstitutions ? <p>Loading...</p> : (
                        <div className="institutions-list">
                            {institutions.map(inst => (
                                <div key={inst.id} className="institution-item">
                                    <span>{inst.name} ({inst.established})</span>
                                    <div className="institution-actions">
                                        <button className="btn-icon" onClick={() => openInstitutionModal(inst)}>✏️</button>
                                        <button className="btn-icon" onClick={() => setDeleteTarget({ type: 'institution', data: inst })}>🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal>
            )}

            {deleteTarget && (
                <ConfirmationModal 
                    message={`Are you sure you want to delete this ${deleteTarget.type}?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
};

export default ServicesModule;
