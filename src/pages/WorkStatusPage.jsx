import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProjectCard from '../components/ProjectCard';
import EditModePopup from '../components/EditModePopup';
import './StatusPage.css';

function WorkStatusPage() {
    const [isEditing, setIsEditing] = useState(false);

    // ข้อมูลทั้งหมดของโปรเจ็กต์ (ปกติจะมาจาก API)
    const projects = [
        { title: "Project A", description: "AI system for KMUTT.", tags: ["AI", "2023"], status: "pending" },
        { title: "Project B", description: "Web dashboard for health data.", tags: ["React", "2024"], status: "success" },
        { title: "Project C", description: "Hospital record system.", tags: ["Database", "Node.js"], status: "fail" },
        { title: "Project D", description: "Monitoring system for IoT devices.", tags: ["IoT", "Cloud"], status: "draft" }
    ];

    const [profileData, setProfileData] = useState({
        name: "Rainbow Pinky",
        university: "KMUTT",
        contact: "rainbowpink@kmutt.ac.th"
    });

    const handleInlineSaveAndClose = () => {
        console.log("Saving profile data from inline mode and closing edit mode.");
        setIsEditing(false);
    };

    // 🧠 ฟังก์ชันกรองโปรเจ็กต์
    const filteredProjects = isEditing
        ? projects.filter(p => p.status === "draft" || p.status === "fail")
        : projects;

    return (
        <div className="profile-container">
            <ProfileHeader
                name={profileData.name}
                university={profileData.university}
                contact={profileData.contact}
                showEdit={isEditing}
                onClickEdit={() => setIsEditing(true)}
                onClickSave={handleInlineSaveAndClose}
            />

            <main className="status-projects-grid">
                {filteredProjects.map((p, i) => (
                    <ProjectCard
                        key={i}
                        title={p.title}
                        description={p.description}
                        tags={p.tags}
                        status={p.status}
                        editMode={isEditing}
                    />
                ))}
            </main>

            <div className="home-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="#ff99cc" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            </div>
        </div>
    );
}

export default WorkStatusPage;